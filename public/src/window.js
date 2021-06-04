const { BrowserWindow } = require('electron');
const path = require('path');

// ==============================================================
const { isDev } = require('./consts');
const { logError, logInfo } = require('./logger');

// ==============================================================
let mainWindow;

// ==============================================================
async function createWindow() {
  try {
    if (mainWindow == null) {
      mainWindow = new BrowserWindow({
        width: isDev ? 1600 : 850,
        height: isDev ? 1000 : 850,
        minHeight: 850,
        minWidth: 850,
        webPreferences: {
          nodeIntegration: false,
          preload: __dirname + '/preload.js'
        }
      });

      if (isDev) {
        mainWindow.webContents.openDevTools();
      }

      await mainWindow.loadURL(
        isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../index.html')}`
      );

      mainWindow.on('closed', () => (mainWindow = null));
      logInfo('Main Window Creation was successful.');
    }
  } catch (error) {
    logError(error);
  }
}

// ==============================================================
module.exports = {
  createWindow
};
