// Clipless — Content Script entry point
// Receives messages from background, orchestrates selection → crop → clipboard flow
(function () {
  'use strict';

  const OVERLAY_ID = 'clipless-overlay';

  let activeDataUrl = null;  // The screenshot data URL for the current flow
  let isSelecting = false;   // Whether we're in an active selection flow
  let flowId = 0;            // Incremented on each new screenshot flow to prevent stale async callbacks

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
    // Clean up listeners BEFORE removing overlay DOM to avoid event listener leaks
    cleanupListeners();
    window.Clipless.selection.reset();
    window.Clipless.overlay.hide();
    activeDataUrl = null;
    isSelecting = false;
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
   * Auto-removes after 3 seconds.
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
    }, 3000);
  }

  /**
   * Start the screenshot selection flow.
   * @param {string} dataUrl - Full-page screenshot data URL from background
   */
  function startScreenshotFlow(dataUrl) {
    if (!dataUrl) return;

    // If already in a selection flow, cancel the previous one first
    if (isSelecting) {
      cancelSelection();
    }

    // Assign a new flow ID so stale async callbacks know to skip
    const currentFlowId = ++flowId;
    activeDataUrl = dataUrl;
    isSelecting = true;

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

      // Snapshot the dataUrl for this flow before clearing state
      const dataUrlForCrop = activeDataUrl;

      // Hide overlay and reset selection
      window.Clipless.overlay.hide();
      window.Clipless.selection.reset();
      activeDataUrl = null;
      isSelecting = false;

      // Crop the selected area — check flowId to avoid stale writes
      window.Clipless.crop.crop(dataUrlForCrop, rect).then(function (blob) {
        // Only write to clipboard if this is still the current flow
        if (currentFlowId !== flowId) return;

        if (blob) {
          window.Clipless.clipboard.writeImage(blob).catch(function (err) {
            console.error('Clipless: failed to write image to clipboard', err);
          });
        }
      });
    });
  }

  /**
   * Confirm the current selection when the user presses the shortcut again.
   * Called by the background script's "confirm-screenshot" message.
   */
  function confirmCurrentSelection() {
    if (!isSelecting) return false;
    return window.Clipless.selection.confirmSelection();
  }

  // Listen for messages from background
  chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type === 'ping') {
      // Background is checking our state — respond with selection status
      sendResponse({ isSelecting: isSelecting });
      return;
    }

    if (message.type === 'confirm-screenshot') {
      // Background says: user pressed shortcut again while selecting — confirm
      confirmCurrentSelection();
      return;
    }

    if (message.type === 'capture-error') {
      // Screenshot capture failed — show brief error to the user
      showError(message.error || 'Screenshot capture failed');
      return;
    }

    if (message.type === 'capture-screenshot' && message.dataUrl) {
      startScreenshotFlow(message.dataUrl);
    }
  });
})();