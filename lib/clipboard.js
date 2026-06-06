// Clipless — Clipboard utility
// Exposes window.Clipless.clipboard with writeImage() and writeText()
(function () {
  'use strict';

  if (!window.Clipless) {
    window.Clipless = {};
  }

  /**
   * Write a PNG Blob to the clipboard.
   * Requires a secure context (HTTPS or chrome-extension://) and focus.
   * @param {Blob} pngBlob - A Blob with type 'image/png'
   * @returns {Promise<void>}
   */
  async function writeImage(pngBlob) {
    if (typeof ClipboardItem === 'undefined' || !navigator.clipboard || typeof navigator.clipboard.write !== 'function') {
      throw new Error('Clipless: Clipboard API unavailable — requires a secure context (HTTPS)');
    }

    const item = new ClipboardItem({ 'image/png': pngBlob });
    await navigator.clipboard.write([item]);
  }

  /**
   * Write plain text to the clipboard.
   * Falls back to execCommand('copy') on HTTP pages where navigator.clipboard is unavailable.
   * @param {string} text - The text to write
   * @returns {Promise<void>}
   */
  async function writeText(text) {
    // Try modern Clipboard API first
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
      try {
        await navigator.clipboard.writeText(text);
        return;
      } catch (err) {
        // Fall through to execCommand fallback
        console.warn('Clipless: clipboard.writeText() failed, trying execCommand fallback', err);
      }
    }

    // Fallback: use textarea + execCommand('copy')
    return fallbackCopyText(text);
  }

  /**
   * Fallback for writing text when navigator.clipboard is unavailable.
   * @param {string} text
   * @returns {Promise<void>}
   */
  function fallbackCopyText(text) {
    return new Promise(function (resolve, reject) {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      // Position off-screen to avoid visual flash
      textarea.style.position = 'fixed';
      textarea.style.left = '-9999px';
      textarea.style.top = '-9999px';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      try {
        const success = document.execCommand('copy');
        if (!success) {
          reject(new Error('Clipless: execCommand("copy") returned false'));
        } else {
          resolve();
        }
      } catch (err) {
        reject(err);
      } finally {
        document.body.removeChild(textarea);
      }
    });
  }

  window.Clipless.clipboard = { writeImage, writeText };
})();