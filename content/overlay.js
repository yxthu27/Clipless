// Clipless — Overlay module
// Exposes window.Clipless.overlay with show(), hide(), updateSelection()
(function () {
  'use strict';

  if (!window.Clipless) {
    window.Clipless = {};
  }

  const OVERLAY_ID = 'clipless-overlay';
  const SELECTION_ID = 'clipless-selection';

  let overlayEl = null;
  let selectionEl = null;

  /**
   * Show the overlay and attach it to the page if not present.
   */
  function show() {
    if (document.getElementById(OVERLAY_ID)) {
      // Already visible — reset selection display but keep overlay
      if (selectionEl) {
        selectionEl.style.left = '0';
        selectionEl.style.top = '0';
        selectionEl.style.width = '0';
        selectionEl.style.height = '0';
      }
      overlayEl.style.display = 'block';
      return;
    }

    overlayEl = document.createElement('div');
    overlayEl.id = OVERLAY_ID;

    selectionEl = document.createElement('div');
    selectionEl.id = SELECTION_ID;

    overlayEl.appendChild(selectionEl);
    document.body.appendChild(overlayEl);
  }

  /**
   * Hide and remove the overlay from the page.
   */
  function hide() {
    if (overlayEl) {
      overlayEl.remove();
      overlayEl = null;
      selectionEl = null;
    }
  }

  /**
   * Update the selection rectangle position and size.
   * @param {number} x - Left offset in px
   * @param {number} y - Top offset in px
   * @param {number} w - Width in px
   * @param {number} h - Height in px
   */
  function updateSelection(x, y, w, h) {
    if (!selectionEl) return;
    selectionEl.style.left = x + 'px';
    selectionEl.style.top = y + 'px';
    selectionEl.style.width = w + 'px';
    selectionEl.style.height = h + 'px';
  }

  window.Clipless.overlay = { show, hide, updateSelection };
})();