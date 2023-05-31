const Realm = require('realm');
const { app, BrowserWindow } = require('electron');
const { autoUpdater, AppUpdater } = require("electron-updater");
const MainScreen = require("./screens/main/mainScreen");

let curWindow;

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;


function createWindow() {
  curWindow = new MainScreen();

}

app.whenReady().then(async () => {
  const realmApp = new Realm.App({ id: 'wawa-hbesp' }); // create a new instance of the Realm.App
  let user = await realmApp.logIn(Realm.Credentials.anonymous());
  const KioskSchema = {
    name: 'Kiosk',
    properties: {
      _id: 'objectId',
      products: 'Product[]',
      storeId: 'objectId',
    },
    primaryKey: '_id',
  };

  const ProductSchema = {
    name: 'Product',
    properties: {
      _id: 'objectId',
      name: 'string',
      numInStock: 'int',
      price: 'double',
      storeId: 'objectId',
    },
    primaryKey: '_id',
  };

  const StoreSchema = {
    name: 'Store',
    properties: {
      _id: 'objectId',
      kiosks: 'Kiosk[]',
    },
    primaryKey: '_id',
  };

  const config = {
    schema: [ProductSchema, KioskSchema, StoreSchema],
    user: user,
    sync: {
      flexible: true,
      user: realmApp.currentUser,
    },
  };
  let realm = null;
  realm = await Realm.open(config);
  const products = realm.objects('Product');
  console.log(`Main: Number of Product objects: ${products.length}`);  
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length == 0) createWindow();
  });

  autoUpdater.checkForUpdates();
  curWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});

/*New Update Available*/
autoUpdater.on("update-available", (info) => {
  curWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
  let pth = autoUpdater.downloadUpdate();
  curWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
  curWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  curWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
  curWindow.showMessage(info);
});




//Global exception handler
process.on("uncaughtException", function (err) {
  console.log(err);
});

app.on("window-all-closed", function () {
  if (process.platform != "darwin") app.quit();

});
