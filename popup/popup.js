// Clipless — Popup script
// Dynamically displays registered shortcuts and links to shortcut settings

(function () {
  'use strict';

  function formatShortcut(command) {
    if (!command.shortcut) return '未设置';
    return command.shortcut
      .replace(/Command/i, '⌘')
      .replace(/Shift/i, '⇧')
      .replace(/Ctrl/i, '⃞')
      .replace(/Alt/i, '⌥');
  }

  function init() {
    chrome.commands.getAll(function (commands) {
      var screenshotCmd = commands.find(function (cmd) {
        return cmd.name === 'capture-screenshot';
      });
      var ocrCmd = commands.find(function (cmd) {
        return cmd.name === 'capture-ocr';
      });

      // Screenshot shortcut
      var ssDisplay = screenshotCmd ? formatShortcut(screenshotCmd) : '未设置';
      document.getElementById('shortcut-key-1').textContent = ssDisplay;
      document.getElementById('shortcut-key-2').textContent = ssDisplay;
      document.getElementById('shortcut-value').textContent = ssDisplay;

      // OCR shortcut
      var ocrDisplay = ocrCmd ? formatShortcut(ocrCmd) : '未设置';
      document.getElementById('shortcut-key-ocr-1').textContent = ocrDisplay;
      document.getElementById('shortcut-value-ocr').textContent = ocrDisplay;
    });

    var shortcutsUrl = 'chrome://extensions/shortcuts';
    document.getElementById('shortcut-link').addEventListener('click', function (e) {
      e.preventDefault();
      chrome.tabs.create({ url: shortcutsUrl });
    });
    document.getElementById('shortcut-link-ocr').addEventListener('click', function (e) {
      e.preventDefault();
      chrome.tabs.create({ url: shortcutsUrl });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();