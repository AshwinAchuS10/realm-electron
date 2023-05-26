const { app, BrowserWindow, dialog } = require('electron');

const { autoUpdater } = require('electron-updater');

const path = require('path');

// const app = electron.app;
// const BrowserWindow = electron.BrowserWindow;
// eslint-disable-next-line no-unused-vars
let updateInterval = null;

let mainWindow;

function createWindow() {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: { nodeIntegration: true, contextIsolation: false },
  });
  // and load the index.html of the app.
  console.log(__dirname);
  mainWindow.loadFile(path.join(__dirname, '../build/index.html'));
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();
  updateInterval = setInterval(() => autoUpdater.checkForUpdates(), 5000);
});

autoUpdater.on('update-available', (_event, releaseNotes, releaseName) => {
  console.log('update-available*************');
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Update Available',
    message: process.platform === 'win32' ? releaseNotes : releaseName,
    detail: 'A new version download started. The app will be restarted to install the update.',
  };
  dialog.showMessageBox(dialogOpts);

  updateInterval = null;
});
// win.loadURL("file:///" + __dirname + "/index.html");

autoUpdater.on('update-downloaded', (_event, releaseNotes, releaseName) => {
  console.log('update-downloaded*************');

   const dialogOpts = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message: process.platform === 'win32' ? releaseNotes : releaseName,
      detail: 'A new version has been downloaded. Restart the application to apply the updates.'
   };
   dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall()
   });
});