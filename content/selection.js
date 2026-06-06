// Clipless — Selection module
// Exposes window.Clipless.selection with start(), getRect(), hasSelection(), reset()
(function () {
  'use strict';

  if (!window.Clipless) {
    window.Clipless = {};
  }

  let startX = 0;
  let startY = 0;
  let endX = 0;
  let endY = 0;
  let selecting = false;
  let confirmCallback = null;
  let rafId = null;
  let _dragCompleted = false; // Tracks whether the mouseup event ends a drag with a valid selection

  function handleMouseDown(e) {
    e.preventDefault();
    selecting = true;
    startX = e.clientX;
    startY = e.clientY;
    endX = startX;
    endY = startY;

    // Bind mousemove and mouseup to document so they fire even if
    // the pointer leaves the overlay (e.g. moves outside the browser window)
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }

  function handleMouseMove(e) {
    if (!selecting) return;
    endX = e.clientX;
    endY = e.clientY;

    if (rafId) return; // Previous frame hasn't rendered yet — skip
    rafId = requestAnimationFrame(() => {
      rafId = null;
      const rect = getRect();
      window.Clipless.overlay.updateSelection(rect.x, rect.y, rect.width, rect.height);
    });
  }

  function handleMouseUp(e) {
    if (!selecting) return;
    endX = e.clientX;
    endY = e.clientY;
    selecting = false;

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);

    // Don't auto-confirm on mouseup — wait for the second shortcut press (R3).
    // Track whether a drag completed so the overlay click handler can ignore
    // the click event that immediately follows the mouseup.
    _dragCompleted = hasSelection();
  }

  /**
   * Start selection mode — bind mouse events on the overlay.
   * @param {Function} [onConfirm] - Called with {x, y, width, height} when user completes a selection.
   */
  function start(onConfirm) {
    reset();
    _dragCompleted = false;
    if (typeof onConfirm === 'function') {
      confirmCallback = onConfirm;
    }

    const overlay = document.getElementById('clipless-overlay');
    if (overlay) {
      overlay.addEventListener('mousedown', handleMouseDown);
    }
  }

  /**
   * Get the normalized selection rectangle.
   * Handles reverse dragging (right-to-left, bottom-to-top).
   * @returns {{ x: number, y: number, width: number, height: number }}
   */
  function getRect() {
    const x = Math.min(startX, endX);
    const y = Math.min(startY, endY);
    const width = Math.abs(endX - startX);
    const height = Math.abs(endY - startY);
    return { x, y, width, height };
  }

  /**
   * Check whether the user has made a meaningful selection (non-zero area).
   * @returns {boolean}
   */
  function hasSelection() {
    const rect = getRect();
    return rect.width > 0 && rect.height > 0;
  }

  /**
   * Returns and resets the drag-completed flag.
   * Used by the overlay click handler to ignore the click that follows mouseup after a drag.
   * @returns {boolean}
   */
  function consumeDragCompleted() {
    const val = _dragCompleted;
    _dragCompleted = false;
    return val;
  }

  /**
   * Reset all selection state and unbind events.
   */
  function reset() {
    selecting = false;
    startX = 0;
    startY = 0;
    endX = 0;
    endY = 0;
    confirmCallback = null;
    _dragCompleted = false;

    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }

    const overlay = document.getElementById('clipless-overlay');
    if (overlay) {
      overlay.removeEventListener('mousedown', handleMouseDown);
    }
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }

  /**
   * Manually confirm the current selection (e.g., via keyboard shortcut).
   * If a valid selection exists and a callback is registered, fires it immediately.
   * Does NOT fire mid-drag (selecting === true) — user must finish dragging first.
   * @returns {boolean} Whether the confirmation was performed (true = had selection)
   */
  function confirmSelection() {
    if (selecting) return false; // Don't confirm mid-drag
    if (confirmCallback && hasSelection()) {
      confirmCallback(getRect());
      return true;
    }
    return false;
  }

  window.Clipless.selection = { start, getRect, hasSelection, reset, confirmSelection, consumeDragCompleted };
})();