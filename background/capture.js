// Clipless — Capture visible tab module
// Captures a screenshot of the current visible tab and sends it to the content script

export async function captureScreenshot(tab) {
  if (!tab || !tab.id) return;

  let dataUrl;
  try {
    // Use tab.windowId instead of null to avoid capturing the wrong tab
    // if the user switches windows during the async gap
    dataUrl = await chrome.tabs.captureVisibleTab(tab.windowId, {
      format: 'png',
    });
  } catch (err) {
    console.warn('Clipless: captureVisibleTab failed', err.message);
    return;
  }

  try {
    await chrome.tabs.sendMessage(tab.id, {
      type: 'capture-screenshot',
      dataUrl: dataUrl,
    });
  } catch (err) {
    // Content script may have been removed (navigation, restricted page).
    // The capture itself succeeded but the result can't reach the content script.
    console.warn('Clipless: content script unavailable', err.message);
  }
}