const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');

const Store = require('electron-store');

const store = new Store();

const { autoUpdater } = require('electron-updater');

// DEV TOOLS
// require('electron-reload')(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`),
// });

// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true;
//   },
// });

let win;
let appdataPathUser;

const clientPackageUrl = 'https://www.dropbox.com/s/ags77ebds3k749g/clientPackage.zip?dl=1';
const IMG_DIR = '/assets/img/icon/png/';
const ASSET_DIR = '/assets/html/';

// debugging mode
const debuggingMode = store.get('launcherOptionDebuggingMode');
if (debuggingMode === undefined) {
  store.set('launcherOptionDebuggingMode', false);
}

// main window launcher creation
createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 600,
    minWidth: 900,
    minHeight: 600,
    title: 'Marie Madeleine Launcher',
    icon: path.join(__dirname, IMG_DIR, 'icon.png'),
    frame: false,
    movable: true,
    resizable: true,
    fullscreen: false,
    fullscreenable: true,
    center: true,
    backgroundThrottling: false,
    show: false,
    webPreferences: {
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true,
      webSecurity: true,
      preload: path.join(__dirname, 'preload.js'),
      devTools: debuggingMode,
    },
  });

  // win.loadURL('https://url.com')
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, ASSET_DIR, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  win.once('ready-to-show', () => {
    // path user
    appdataPathUser = app.getPath('appData');

    // debugging mode
    store.set('appdataPathUser', appdataPathUser);
    if (debuggingMode === true) {
      store.set('launcherOptionDebuggingMode', false);
    }

    // show window
    win.show();
  });
};

// app updater
ipcMain.on('check-update', () => {
  autoUpdater.checkForUpdatesAndNotify();
});

autoUpdater.on('update-available', () => {
  win.webContents.send('updater_update_available');
});
autoUpdater.on('update-not-available', () => {
  win.webContents.send('updater_update_not_available');
});
autoUpdater.on('error', (err) => {
  const error = err;
  win.webContents.send('updater_error', error);
});
autoUpdater.on('update-downloaded', () => {
  win.webContents.send('updater_update_downloaded');
});
ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall();
});

// app ready
app.whenReady().then(() => {
  // check update
  autoUpdater.checkForUpdatesAndNotify();

  // create window
  setTimeout(() => {
    createWindow();
  }, 1000);

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// app compatibility
app.on('window-all-closed', () => {
  if (process.plateform !== 'darwin') {
    app.quit();
  }
});

app.on('close', function (event) {
  event.preventDefault();
  app.hide();
  return false;
});

// login, auth, launch & opts minecraft launcher
ipcMain.on('login', (event, data) => {
  const { Client, Authenticator } = require('minecraft-launcher-core');
  const launcher = new Client();

  const OSname = require('os').userInfo().username;

  const maxRamUser = store.get('minecraftOptionMaxRam');
  const minRamUser = store.get('minecraftOptionMinRam');

  const heightRes = store.get('minecraftOptionHeightRes');
  const widthRes = store.get('minecraftOptionWidthRes');
  const fullscreenRes = store.get('minecraftOptionFullscreenRes');

  const JVMUser = store.get('minecraftOptionJvm');

  Authenticator.getAuth(data.u, data.p)
    .then((e) => {
      event.sender.send('done');

      const opts = {
        clientPackage: clientPackageUrl,
        removePackage: true,
        authorization: e,
        root: `${appdataPathUser}/.MMLauncher/`,
        customArgs: JVMUser,
        version: {
          number: '1.8.9',
          type: 'release',
        },
        window: {
          width: widthRes,
          height: heightRes,
          fullscreen: fullscreenRes,
        },
        forge: `${appdataPathUser}/.MMLauncher/forge.jar`,
        memory: {
          max: `${maxRamUser}M`,
          min: `${minRamUser}M`,
        },
        timeout: 3500,
      };

      launcher
        .launch(opts)
        .then(() => {
          win.webContents.send('game-launched');
          if (debuggingMode !== true) {
            setTimeout(() => {
              app.quit();
            }, 7500);
          }
        })
        .catch((err) => {
          win.webContents.send('game-launched-error', err);
        });

      if (debuggingMode === true) {
        launcher.on('debug', (e) => {
          win.webContents.send('log', e);
        });

        launcher.on('data', (e) => {
          win.webContents.send('log', e);
        });
      }
      launcher.on('progress', (e) => {
        win.webContents.send('progress', e);
      });
    })
    .catch((err) => {
      event.sender.send('err', { er: err });
    });
});
