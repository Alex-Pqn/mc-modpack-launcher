const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const url = require('url');
const Store = require('electron-store');
const store = new Store();
const { autoUpdater } = require('electron-updater');
const { setTimeout } = require('timers');
const { defaultMinecraftOpt } = require('./globalValues');

let win;
let appdataPathUser;
const IMG_DIR = '/public/assets/img/icon/png/';
const ASSET_DIR = '/public/html/';

// DEV TOOLS
// require('electron-reload')(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`),
// });
// Object.defineProperty(app, 'isPackaged', {
//   get() {
//     return true;
//   },
// });

const debuggingMode = store.get('launcherOptionDebuggingMode');

// window creation
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
      preload: path.join(__dirname, 'preload.js'),
      devTools: debuggingMode,
    },
  });

  win.loadURL(
    url.format({
      pathname: path.join(__dirname, ASSET_DIR, 'index.html'),
      protocol: 'file:',
      slashes: true,
    })
  );

  // READY TO SHOW //
  win.once('ready-to-show', () => {
    // store path user
    appdataPathUser = app.getPath('appData');
    store.set('appdataPathUser', appdataPathUser);

    // check launcher update
    autoUpdater.checkForUpdatesAndNotify();
    
    // show window
    win.show();

    // debugging mode
    if (debuggingMode === true) {
      store.set('launcherClose', true);
    } else {
      store.set('launcherClose', false);
    }
    store.set('launcherOptionDebuggingMode', false);

    // authKey & OSname
    if (store.get('authKey') === undefined) {
      const chars =
        '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
      const string_length = 256;
      let randomstring = '';
      for (let i = 0; i < string_length; i++) {
        const rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
      }
      store.set('authKey', randomstring);

      const OSname = require('os').userInfo().username;
      store.set('OSname', OSname);
    }
  });
};

// ELECTRON UPDATER //
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

// APP READY //
app.whenReady().then(() => {
  // debugging mode
  if (debuggingMode === undefined) {
    store.set('launcherOptionDebuggingMode', false);
  }

  // store default values : minRam,maxRam
  if (store.get('minecraftOptionMinRam') == undefined) {
    store.set('minecraftOptionMinRam', defaultMinecraftOpt.defaultMinRam);
  }
  if (store.get('minecraftOptionMaxRam') == undefined) {
    store.set('minecraftOptionMaxRam', defaultMinecraftOpt.defaultMaxRam);
  }

  // store default values : jvm

  if (store.get('minecraftOptionJvm') == undefined) {
    store.set('minecraftOptionJvm', defaultMinecraftOpt.defaultJvm);
  }

  // store default values : heightRes,widthRes,fullscreenRes

  if (store.get('minecraftOptionHeightRes') == undefined) {
    store.set('minecraftOptionHeightRes', defaultMinecraftOpt.defaultHeightRes);
  }
  if (store.get('minecraftOptionWidthRes') == undefined) {
    store.set('minecraftOptionWidthRes', defaultMinecraftOpt.defaultWidthRes);
  }
  if (store.get('minecraftOptionFullscreenRes') == undefined) {
    store.set('minecraftOptionFullscreenRes', defaultMinecraftOpt.defaultFullscreenRes);
  }

  // create window
  createWindow();

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

// LAUNCH MINECRAFT WITH OPTS //
ipcMain.on('login', (event, data) => {
  const { Client, Authenticator } = require('minecraft-launcher-core');
  const launcher = new Client();

  const maxRam = store.get('minecraftOptionMaxRam');
  const minRam = store.get('minecraftOptionMinRam');
  const heightRes = store.get('minecraftOptionHeightRes');
  const widthRes = store.get('minecraftOptionWidthRes');
  const fullscreenRes = store.get('minecraftOptionFullscreenRes');
  const JVM = store.get('minecraftOptionJvm');

  Authenticator.getAuth(data.u, data.p)
    .then((e) => {
      event.sender.send('done');

      const opts = {
        clientPackage: `${store.get('launcherModpackLink')}`,
        removePackage: true,
        authorization: e,
        root: `${appdataPathUser}/.MMLauncher/`,
        customArgs: JVM,
        version: {
          number: '1.16.5',
          type: 'release'
        },
        window: {
          width: widthRes,
          height: heightRes,
          fullscreen: fullscreenRes,
        },
        forge: `${appdataPathUser}/.MMLauncher/forge.jar`,
        memory: {
          max: `${maxRam}G`,
          min: `${minRam}G`,
        },
        timeout: 3500
      };

      launcher
        .launch(opts)
        .then(() => {
          win.webContents.send('game-launched');

          if (store.get('launcherClose') !== true) {
            setTimeout(() => {
              app.quit();
            }, 8000);
          }

          store.set('launcherClose', false);
        })
        .catch((err) => {
          win.webContents.send('game-launched-error', err);
        });

      launcher.on('debug', (e) => {
        win.webContents.send('log', e);
      });
      launcher.on('data', (e) => {
        win.webContents.send('log', e);
      });
      launcher.on('progress', (e) => {
        win.webContents.send('progress', e);
      });
    })
    .catch((err) => {
      event.sender.send('err', { er: err });
    });
});
