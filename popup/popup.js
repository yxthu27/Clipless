// Clipless — Popup script
// Dynamically displays registered shortcuts and links to shortcut settings

(function () {
  'use strict';

  function formatShortcut(command) {
    if (!command.shortcut) return '未设置';
    return command.shortcut
      .replace(/Command/i, '⌘')
      .replace(/Shift/i, '⇧')
      .replace(/Ctrl/i, '⌃')
      .replace(/Alt/i, '⌥');
  }

  function init() {
    chrome.commands.getAll(function (commands) {
      const screenshotCmd = commands.find(function (cmd) {
        return cmd.name === 'capture-screenshot';
      });

      if (screenshotCmd) {
        const display = formatShortcut(screenshotCmd);
        document.getElementById('shortcut-key-1').textContent = display;
        document.getElementById('shortcut-key-2').textContent = display;
        document.getElementById('shortcut-value').textContent = display;
      } else {
        // Command not found — show fallback text
        document.getElementById('shortcut-key-1').textContent = '未设置';
        document.getElementById('shortcut-key-2').textContent = '未设置';
        document.getElementById('shortcut-value').textContent = '未设置';
      }
    });

    document.getElementById('shortcut-link').addEventListener('click', function (e) {
      e.preventDefault();
      chrome.tabs.create({ url: 'chrome://extensions/shortcuts' });
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();