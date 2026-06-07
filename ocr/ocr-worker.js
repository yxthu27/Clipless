// Clipless — OCR Worker (runs inside offscreen document)
//
// Tesseract.js v5.1.1 in Chrome MV3 offscreen document.
//
// Uses absolute chrome.runtime.getURL() paths with workerBlobURL: false
// so the Web Worker created by Tesseract inherits the extension's CSP
// (including 'wasm-unsafe-eval' for WebAssembly compilation).
//
// The previously complex bootstrap fallback path (initWorkerBootstrap) has
// been removed — it had fatal bugs (missing 'initialize' message, field-name
// mismatch jobId vs id, ignored corePath) that made it 100% non-functional.
// The standard path works correctly with the manifest CSP:
//   "script-src 'self' 'wasm-unsafe-eval'; worker-src 'self'"

(function () {
  'use strict';

  var worker = null;
  var initializing = null;

  // Absolute extension paths for Tesseract.js
  var WORKER_PATH = chrome.runtime.getURL('ocr/worker.min.js');
  var CORE_PATH = chrome.runtime.getURL('ocr/tesseract-core-simd.wasm.js');

  /**
   * Initialize the Tesseract worker with Chinese + English language support.
   * Uses standard Tesseract.createWorker() path with extension URLs.
   */
  async function initWorker() {
    if (worker) return worker;
    if (initializing) return initializing;

    initializing = (async function () {
      worker = await Tesseract.createWorker('chi_sim+eng', 1, {
        workerPath: WORKER_PATH,
        corePath: CORE_PATH,
        workerBlobURL: false,
        logger: function (info) {
          if (info.status === 'recognizing text') {
            chrome.runtime.sendMessage({
              type: 'ocr-progress',
              status: info.status,
              progress: info.progress,
            }).catch(function () {});
          }
        },
      });
      return worker;
    })();

    try {
      return await initializing;
    } catch (err) {
      worker = null;
      initializing = null;
      throw err;
    }
  }

  /**
   * Perform OCR recognition on the given data URL (image).
   * @param {string} dataUrl - The image as a data: URL
   * @returns {Promise<string>} - The recognized text
   */
  async function handleOcrRecognize(dataUrl) {
    var w = await initWorker();

    var result = await Promise.race([
      w.recognize(dataUrl),
      new Promise(function (_, reject) {
        setTimeout(function () { reject(new Error('OCR 识别超时')); }, 55000);
      }),
    ]);

    var text = (result.data && result.data.text || '').trim();
    if (!text) {
      throw new Error('未识别到文字');
    }
    return text;
  }

  /**
   * Terminate the Tesseract worker and release resources.
   */
  async function terminateWorker() {
    if (worker) {
      try { await worker.terminate(); } catch (_) {}
      worker = null;
      initializing = null;
    }
  }

  // --- Message listener ---

  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'offscreen-ping') {
      sendResponse({ ready: true });
      return false;
    }

    if (message.type === 'ocr-recognize') {
      handleOcrRecognize(message.dataUrl)
        .then(function (text) {
          sendResponse({ success: true, text: text });
        })
        .catch(function (err) {
          sendResponse({ success: false, error: err.message || String(err) });
        });
      return true; // keep channel open for async sendResponse
    }

    if (message.type === 'ocr-terminate') {
      terminateWorker()
        .then(function () { sendResponse({ success: true }); })
        .catch(function () { sendResponse({ success: true }); });
      return true;
    }
  });
})();
