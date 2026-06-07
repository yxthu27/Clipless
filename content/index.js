// Clipless — Content Script entry point
// Receives messages from background, orchestrates selection → crop → clipboard flow
(function () {
  'use strict';

  const OVERLAY_ID = 'clipless-overlay';

  let activeDataUrl = null;  // The screenshot data URL for the current flow
  let isSelecting = false;   // Whether we're in an active selection flow
  let flowId = 0;            // Incremented on each new screenshot flow to prevent stale async callbacks
  let currentMode = null;    // 'screenshot' or 'ocr'
  let ocrPendingFlowId = null;  // flowId of the outstanding OCR request, or null if none pending

  function handleEscape(e) {
    if (e.key === 'Escape') {
      cancelSelection();
    }
  }

  function handleOverlayClick(e) {
    // Click on the overlay itself (not on a child element like the selection box)
    if (e.target.id === OVERLAY_ID) {
      // If this click is the mouseup that ended a drag, ignore it.
      // The selection stays "locked" until the user presses the shortcut again or Esc.
      if (window.Clipless.selection.consumeDragCompleted()) {
        return;
      }
      cancelSelection();
    }
  }

  function cancelSelection() {
    // Notify background to cancel in-progress OCR if we have one pending
    if (ocrPendingFlowId !== null) {
      chrome.runtime.sendMessage({ type: 'cancel-ocr' }).catch(function () {});
    }
    // Clean up listeners BEFORE removing overlay DOM to avoid event listener leaks
    cleanupListeners();
    window.Clipless.selection.reset();
    window.Clipless.overlay.hide();
    resetState();
  }

  function resetState() {
    activeDataUrl = null;
    isSelecting = false;
    currentMode = null;
    ocrPendingFlowId = null;
  }

  function cleanupListeners() {
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      overlay.removeEventListener('click', handleOverlayClick);
    }
    document.removeEventListener('keydown', handleEscape);
  }

  /**
   * Show a brief error message to the user as a toast notification.
   * Auto-removes after 4 seconds.
   * @param {string} text - The error message to display
   */
  function showError(text) {
    // Remove any existing error toast
    const existing = document.getElementById('clipless-error');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'clipless-error';
    toast.textContent = 'Clipless: ' + text;
    toast.style.cssText = 'position:fixed;bottom:20px;left:50%;transform:translateX(-50%);' +
      'background:#d32f2f;color:#fff;padding:10px 20px;border-radius:6px;' +
      'font:14px/1.4 sans-serif;z-index:2147483647;box-shadow:0 2px 8px rgba(0,0,0,0.3)';
    document.body.appendChild(toast);
    setTimeout(function () {
      if (toast.parentNode) toast.remove();
    }, 4000);
  }

  /**
   * Start the screenshot selection flow.
   * @param {string} dataUrl - Full-page screenshot data URL from background
   * @param {string} mode - 'screenshot' or 'ocr'
   */
  function startFlow(dataUrl, mode) {
    if (!dataUrl) return;

    // If already in a selection flow, cancel the previous one first
    if (isSelecting) {
      cancelSelection();
    }

    // Assign a new flow ID so stale async callbacks know to skip
    var currentFlowId = ++flowId;
    activeDataUrl = dataUrl;
    isSelecting = true;
    currentMode = mode;

    // Show overlay
    window.Clipless.overlay.show();

    // Bind escape and overlay click for cancellation
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      overlay.addEventListener('click', handleOverlayClick);
    }
    document.addEventListener('keydown', handleEscape);

    // Start selection — on confirm, crop and write to clipboard
    window.Clipless.selection.start(function (rect) {
      // Clean up listeners BEFORE removing overlay DOM to avoid event listener leaks
      cleanupListeners();

      // Snapshot all state for this flow before resetting
      var dataUrlForCrop = activeDataUrl;
      var mode = currentMode;
      var capturedFlowId = currentFlowId;

      // Hide overlay and reset selection
      window.Clipless.overlay.hide();
      window.Clipless.selection.reset();

      // Reset selection state immediately so the next shortcut press
      // can start a fresh flow without needing to click the extension icon.
      // OCR mode: ocrPendingFlowId will be set below if we need to await the result,
      // but the selection flow itself is complete.
      resetState();

      // Crop the selected area
      window.Clipless.crop.crop(dataUrlForCrop, rect).then(function (blob) {
        // Only proceed if this is still the current flow
        if (capturedFlowId !== flowId) return;

        if (!blob) {
          showError('截图裁剪失败');
          return;
        }

        window.Clipless.clipboard.writeImage(blob).then(function () {
          // Guard: check flowId again — writeImage is async and a new flow
          // may have started while we were waiting
          if (capturedFlowId !== flowId) return;

          if (mode === 'ocr') {
            // After writing image to clipboard, request OCR from background.
            // Convert the cropped blob to a dataURL for OCR processing.
            ocrPendingFlowId = capturedFlowId;
            var reader = new FileReader();
            reader.onload = function () {
              // Guard: check if this OCR request is still the pending one
              if (capturedFlowId !== ocrPendingFlowId) return;

              chrome.runtime.sendMessage({
                type: 'perform-ocr',
                dataUrl: reader.result,
              }, function (response) {
                // Guard: only process response if this is still the active OCR request
                if (capturedFlowId !== ocrPendingFlowId) return;

                if (chrome.runtime.lastError) {
                  ocrPendingFlowId = null;
                  showError('OCR 请求发送失败: ' + chrome.runtime.lastError.message);
                } else if (!response || !response.success) {
                  ocrPendingFlowId = null;
                  if (response && response.error === 'OCR in progress') {
                    showError('请稍候，当前识别未完成');
                  } else if (response && response.error) {
                    showError(response.error);
                  } else {
                    console.warn('Clipless: perform-ocr returned empty/invalid response');
                  }
                }
                // If response.success === true, keep ocrPendingFlowId set —
                // we're waiting for the ocr-result message from background
              });
            };
            reader.onerror = function () {
              ocrPendingFlowId = null;
              showError('截图数据读取失败');
            };
            reader.readAsDataURL(blob);
          }
        }).catch(function (err) {
          // writeImage failed — user gets no clipboard content
          console.error('Clipless: failed to write image to clipboard', err);
          showError('截图已生成，但写入剪贴板失败');
        });
      }).catch(function (err) {
        console.error('Clipless: crop failed', err);
        showError('截图裁剪失败');
      });
    });
  }

  /**
   * Confirm the current selection when the user presses the shortcut again.
   * Called by the background script's "confirm-screenshot" or "confirm-ocr" message.
   * @param {string} mode - 'screenshot' or 'ocr'
   */
  function confirmCurrentSelection(mode) {
    if (!isSelecting) return false;
    // Update mode in case it was set differently
    if (mode) currentMode = mode;
    var result = window.Clipless.selection.confirmSelection();
    if (!result) {
      // User is mid-drag — selection hasn't completed yet
      showError('请先完成拖拽选择再确认');
    }
    return result;
  }

  // Listen for messages from background
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'ping') {
      // Background is checking our state — respond with selection status
      sendResponse({ isSelecting: isSelecting });
      return;
    }

    if (message.type === 'confirm-screenshot') {
      confirmCurrentSelection('screenshot');
      return;
    }

    if (message.type === 'confirm-ocr') {
      confirmCurrentSelection('ocr');
      return;
    }

    if (message.type === 'capture-error') {
      showError(message.error || 'Screenshot capture failed');
      return;
    }

    if (message.type === 'capture-screenshot' && message.dataUrl) {
      startFlow(message.dataUrl, 'screenshot');
    }

    if (message.type === 'capture-ocr' && message.dataUrl) {
      startFlow(message.dataUrl, 'ocr');
    }

    if (message.type === 'ocr-result' && message.text) {
      // OCR succeeded — overwrite clipboard with recognized text.
      // Only write if we're still expecting an OCR result (not cancelled
      // or superseded by a newer flow).
      if (ocrPendingFlowId !== null) {
        var resolvedFlowId = ocrPendingFlowId;
        ocrPendingFlowId = null;
        window.Clipless.clipboard.writeText(message.text).catch(function (err) {
          console.error('Clipless: failed to write OCR text to clipboard', err);
          showError('OCR 识别完成，但文字写入剪贴板失败');
        });
      }
    }

    if (message.type === 'ocr-progress') {
      // Progress updates from offscreen OCR worker — acknowledge synchronously
      // to prevent "Could not establish connection" errors.
      sendResponse({});
      return;
    }

    if (message.type === 'ocr-failed') {
      // OCR failed — screenshot is already in clipboard, clear pending state.
      // Only clear if there's a pending OCR request (guard against stale messages).
      if (ocrPendingFlowId !== null) {
        ocrPendingFlowId = null;
      }
      console.warn('Clipless: OCR failed', message.error);
    }

    // Ignore other message types (e.g., 'ocr-recognize' intended for offscreen document)
  });
})();
