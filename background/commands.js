// Clipless — Background commands module
// Routes command events to the appropriate handler
import { captureScreenshot } from './capture.js';

const COMMANDS = {
  'capture-screenshot': handleScreenshot,
};

// Content script files in load order (must match manifest.json content_scripts.js)
const CONTENT_SCRIPT_FILES = [
  'lib/clipboard.js',
  'content/overlay.js',
  'content/selection.js',
  'content/crop.js',
  'content/index.js',
];

/**
 * Programmatically inject the content script bundle into a tab.
 * Content scripts declared in manifest.json only inject at navigation time;
 * newly loaded extensions or freshly opened tabs may not have them yet.
 * @param {number} tabId
 * @returns {Promise<void>}
 */
async function ensureContentScript(tabId) {
  await chrome.scripting.executeScript({
    target: { tabId },
    files: CONTENT_SCRIPT_FILES,
  });
}

async function handleScreenshot(tab) {
  // First check if the content script is already loaded and in selection mode
  try {
    const response = await chrome.tabs.sendMessage(tab.id, { type: 'ping' });
    if (response && response.isSelecting) {
      // Content script is already selecting — send confirm message
      await chrome.tabs.sendMessage(tab.id, { type: 'confirm-screenshot' });
    } else {
      // Content script is loaded but not selecting — start fresh capture
      await captureScreenshot(tab);
    }
  } catch (_) {
    // Content script not available (not yet injected or a restricted page).
    // Try injecting it first, then capture.
    try {
      await ensureContentScript(tab.id);
    } catch (_) {
      // Injection failed (e.g., chrome:// or other restricted page).
      // captureScreenshot will also fail in this case — nothing more to do.
      return;
    }
    await captureScreenshot(tab);
  }
}

export function routeCommand(command, tab) {
  const handler = COMMANDS[command];
  if (!handler) return;
  handler(tab).catch(function (err) {
    console.warn('Clipless: command handler failed', err);
  });
}