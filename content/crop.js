// Clipless — Crop module
// Exposes window.Clipless.crop with crop()
(function () {
  'use strict';

  if (!window.Clipless) {
    window.Clipless = {};
  }

  /**
   * Crop a region from a full-page screenshot data URL.
   * Handles devicePixelRatio scaling.
   * @param {string} dataUrl - The full-page screenshot as a data URL
   * @param {{ x: number, y: number, width: number, height: number }} rect
   *   Selection rectangle in CSS pixels
   * @returns {Promise<Blob|null>} - PNG Blob of the cropped region, or null for zero-size/error
   */
  async function crop(dataUrl, rect) {
    if (!rect || rect.width <= 0 || rect.height <= 0) {
      return null;
    }

    const dpr = window.devicePixelRatio || 1;

    return new Promise((resolve) => {
      const img = new Image();
      img.onload = function () {
        const canvas = document.createElement('canvas');
        const canvasW = rect.width * dpr;
        const canvasH = rect.height * dpr;
        canvas.width = canvasW;
        canvas.height = canvasH;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }

        ctx.drawImage(
          img,
          rect.x * dpr,       // source x
          rect.y * dpr,       // source y
          rect.width * dpr,    // source width
          rect.height * dpr,   // source height
          0,                   // dest x
          0,                   // dest y
          rect.width * dpr,    // dest width
          rect.height * dpr    // dest height
        );

        canvas.toBlob(function (blob) {
          resolve(blob);
        }, 'image/png');
      };
      img.onerror = function () {
        resolve(null);
      };
      img.src = dataUrl;
    });
  }

  window.Clipless.crop = { crop };
})();