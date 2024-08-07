const { app, BrowserWindow, dialog } = require("electron/main");
const { autoUpdater, AppUpdater } = require("electron-updater");

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "electron Demo",
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.loadFile("index.html");

  autoUpdater.checkForUpdates();
};

app.whenReady().then(() => {
  createWindow();
  // app.on("activate", () => {
  //   if (BrowserWindow.getAllWindows().length === 0) {
  //     createWindow();
  //   }
  // });
});

// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     app.quit();
//   }
// });

/*New Update Available*/

autoUpdater.on("update-available", (info) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "Update Available",
    detail:
      "A new version download started. The app will be restarted to install the update.",
  };
  dialog.showMessageBox(dialogOpts);

  updateInterval = null;
});

autoUpdater.on("update-not-available", (info) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "Update  Not Available",
    detail: `No update available. Current version ${app.getVersion()}`,
  };
  dialog.showMessage(dialogOpts);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
  const dialogOpts = {
    type: "info",
    buttons: ["Ok"],
    title: "Update  Not Available",
    detail: `Update downloaded. Current version ${app.getVersion()}`,
  };
  dialog.showMessage(dialogOpts);
});

autoUpdater.on("error", (info) => {
  dialog.showMessage(info);
});
