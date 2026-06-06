// Clipless — Background Service Worker entry point
import { routeCommand } from './commands.js';

chrome.commands.onCommand.addListener((command) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs.length > 0) {
      routeCommand(command, tabs[0]);
    }
  });
});