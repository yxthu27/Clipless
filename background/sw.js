// Clipless — Background Service Worker entry point
import { routeCommand } from './commands.js';

const OFFSCREEN_DOC_PATH = 'ocr/offscreen.html';
let ocrInProgress = false;   // guard against concurrent OCR invocations

// --- Offscreen document lifecycle ---

async function ensureOffscreenDocument() {
  const existingContexts = await chrome.runtime.getContexts({
    contextTypes: ['OFFSCREEN_DOCUMENT'],
    documentUrls: [chrome.runtime.getURL(OFFSCREEN_DOC_PATH)],
  });

  if (existingContexts.length > 0) return;

  try {
    await chrome.offscreen.createDocument({
      url: OFFSCREEN_DOC_PATH,
      reasons: ['WORKERS'],
      justification: 'OCR text recognition using Tesseract.js Web Worker',
    });
  } catch (e) {
    // Already exists from a concurrent call — that's fine.
    if (!e.message?.includes('Only a single offscreen')) {
      throw e;
    }
  }
}

/**
 * Wait for the offscreen document's message listener to be ready by sending
 * a ping and retrying until a response is received.
 * This avoids the race condition where createDocument() resolves before the
 * document's scripts have finished loading and registering their onMessage listener.
 *
 * Uses up to 30 attempts × 200ms = 6 seconds, which accommodates the first-load
 * download of tesseract.min.js (~67KB compressed).
 */
async function waitForOffscreenReady(maxAttempts = 30, intervalMs = 200) {
  for (let i = 0; i < maxAttempts; i++) {
    try {
      const response = await chrome.runtime.sendMessage({ type: 'offscreen-ping' });
      if (response && response.ready) return;
    } catch (_) {
      // No listener yet — offscreen document scripts haven't loaded
    }
    await new Promise(resolve => setTimeout(resolve, intervalMs));
  }
  throw new Error('Offscreen document not ready after retries');
}

/**
 * Ensure the offscreen document is created AND ready for OCR.
 * If creation succeeds but readiness check fails, close + recreate to
 * clear any zombie state (e.g., scripts failed to load, CSP blocked).
 */
async function ensureOffscreenReady() {
  await ensureOffscreenDocument();
  try {
    await waitForOffscreenReady();
  } catch (err) {
    // Offscreen document may be in a zombie state — close and recreate
    console.warn('Clipless: offscreen not ready, recreating...', err.message);
    await closeOffscreenDocument();
    await ensureOffscreenDocument();
    await waitForOffscreenReady(); // one more attempt — if this fails, let it throw
  }
}

async function closeOffscreenDocument() {
  try {
    await chrome.offscreen.closeDocument();
  } catch (_) {
    // Document may not exist or already closed
  }
}

// --- OCR orchestration ---

async function performOcr(dataUrl, tabId) {
  // Validate tabId before doing any work
  if (!tabId || typeof tabId !== 'number') {
    showNotification('clipless-ocr-err', '识别失败', '无法确定当前标签页');
    return { success: false, error: 'invalid tabId' };
  }

  if (ocrInProgress) {
    showNotification('clipless-ocr-err', '请稍候', '正在处理中，请等待当前识别完成');
    return { success: false, error: 'OCR in progress' };
  }

  ocrInProgress = true;
  showNotification('clipless-ocr', '正在识别...', 'Clipless 正在识别文字');

  try {
    await ensureOffscreenReady();

    // Send recognition request to offscreen document with timeout.
    // chrome.runtime.sendMessage broadcasts to all extension pages;
    // the offscreen document's listener handles 'ocr-recognize' and
    // returns { success, text } or { success, error }.
    const ocrResponse = await Promise.race([
      chrome.runtime.sendMessage({
        type: 'ocr-recognize',
        dataUrl: dataUrl,
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error('OCR 识别超时，请重试')), 58000)
      ),
    ]);

    if (!ocrResponse || !ocrResponse.success) {
      throw new Error(ocrResponse?.error || 'OCR 识别失败');
    }

    // Send recognized text to content script to overwrite clipboard
    let textDelivered = false;
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: 'ocr-result',
        text: ocrResponse.text,
      });
      textDelivered = true;
    } catch (_) {
      // Content script may be gone
    }

    if (textDelivered) {
      showNotification('clipless-ocr', '文字已复制到剪贴板', '识别完成，文字已写入剪贴板');
    } else {
      showNotification('clipless-ocr', '识别完成', '文字已识别，但无法写入当前页面剪贴板');
    }

    return { success: true };
  } catch (err) {
    console.warn('Clipless: OCR failed', err);

    // Notify content script that OCR failed (screenshot stays in clipboard)
    try {
      await chrome.tabs.sendMessage(tabId, {
        type: 'ocr-failed',
        error: err.message || String(err),
      });
    } catch (_) {
      // Content script may be gone
    }

    showNotification('clipless-ocr-err', '识别失败', 'OCR 识别失败，截图仍保留在剪贴板');
    return { success: false, error: err.message };
  } finally {
    ocrInProgress = false;
    // Clean up offscreen document after a delay to support subsequent OCR
    // requests without recreating, but don't keep it alive forever.
    setTimeout(() => {
      if (!ocrInProgress) {
        closeOffscreenDocument().catch(() => {});
      }
    }, 30000);
  }
}

// --- Notifications ---

function showNotification(id, title, message) {
  chrome.notifications.create(id, {
    type: 'basic',
    iconUrl: 'assets/icons/icon128.png',
    title: title,
    message: message,
  });
}

// --- Command listener ---

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      routeCommand(command, tabs[0]);
    }
  });
});

// --- Message listener ---

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'perform-ocr') {
    performOcr(message.dataUrl, sender.tab?.id)
      .then((result) => sendResponse(result || { success: true }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true; // keep message channel open for async sendResponse
  }

  if (message.type === 'cancel-ocr') {
    // Content script cancelled — release the OCR lock if held.
    // The in-flight offscreen document recognition will still complete
    // but its result will be discarded by the content script.
    ocrInProgress = false;
    return;
  }

  if (message.type === 'ocr-progress') {
    // Progress updates from the offscreen OCR worker — acknowledge
    // synchronously so Chrome doesn't log "Could not establish connection".
    sendResponse({});
    return;
  }

  // Do NOT return true for other message types — they are handled by
  // other contexts (e.g., 'ocr-recognize' by the offscreen document).
  // Returning true here would keep the channel open and could interfere
  // with the offscreen document's response.
});
