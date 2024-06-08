import Application from '../src/app/Application';

declare const MAIN_WINDOW_WEBPACK_ENTRY: string;
declare const MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

if (!MAIN_WINDOW_WEBPACK_ENTRY || !MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY) {
  throw new Error('Webpack entries are not defined.');
}

new Application('Paint App', {
  icon: '../public/icon.png',
  loadUrl: MAIN_WINDOW_WEBPACK_ENTRY,
  webPreferences: {
    preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    contextIsolation: true,
    nodeIntegration: false
  }
});