// Clipless — Tesseract Worker Bootstrap
//
// This file is loaded as a dedicated Web Worker by ocr-worker.js.
// It receives the pre-fetched WASM binary via postMessage, sets
// Module.wasmBinary to skip the data: URL decode path (which may
// violate CSP in some Worker contexts), then loads Tesseract's
// worker.min.js via importScripts.
//
// This ensures WebAssembly.instantiate() uses the pre-fetched binary
// rather than trying to decode the embedded base64 data: URL.

var Module = {};

self.onmessage = function (e) {
  if (e.data.type === 'init') {
    // Set Module.wasmBinary so the core module uses the pre-fetched
    // binary instead of decoding the embedded base64 data: URL.
    Module.wasmBinary = new Uint8Array(e.data.wasmBinary);

    // Load Tesseract's worker script, which will importScripts the core
    // module and compile WASM using our pre-provided binary.
    importScripts(e.data.workerPath);
  }
};