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

const IMG_DIR = '/assets/img/icon/png/';
const ASSET_DIR = '/assets/html/';

const debuggingMode = store.get('launcherOptionDebuggingMode');

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

  win.once('ready-to-show', () => {
    // path user
    appdataPathUser = app.getPath('appData');
    store.set('appdataPathUser', appdataPathUser);

    // show window
    win.show();

    // debugging mode
    if (debuggingMode === true) {
      store.set('launcherOptionDebuggingModeLauncherClose', true);
    } else {
      store.set('launcherOptionDebuggingModeLauncherClose', false);
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

    // storeSet download link (default package choice)
    store.set(
      'launcherModpackLink',
      'https://www.dropbox.com/s/vujx37w0fwglky7/clientPackage.zip?dl=1'
    );
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
  // check update app
  autoUpdater.checkForUpdatesAndNotify();

  // debugging mode
  if (debuggingMode === undefined) {
    store.set('launcherOptionDebuggingMode', false);
  }

  // store default values : minRam,maxRam
  const defaultMaxRam = 3584;
  const defaultMinRam = 2048;
  if (store.get('minecraftOptionMinRam') == undefined) {
    store.set('minecraftOptionMinRam', defaultMinRam);
  }
  if (store.get('minecraftOptionMaxRam') == undefined) {
    store.set('minecraftOptionMaxRam', defaultMaxRam);
  }

  // store default values : jvm
  const defaultJvm = [];
  if (store.get('minecraftOptionJvm') == undefined) {
    store.set('minecraftOptionJvm', defaultJvm);
  }

  // store default values : heightRes,widthRes,fullscreenRes
  const defaultHeightRes = 1080;
  const defaultWidthRes = 1920;
  const defaultFullscreenRes = true;
  if (store.get('minecraftOptionHeightRes') == undefined) {
    store.set('minecraftOptionHeightRes', defaultHeightRes);
  }
  if (store.get('minecraftOptionWidthRes') == undefined) {
    store.set('minecraftOptionWidthRes', defaultWidthRes);
  }
  if (store.get('minecraftOptionFullscreenRes') == undefined) {
    store.set('minecraftOptionFullscreenRes', defaultFullscreenRes);
  }

  // create window
  setTimeout(() => {
    createWindow();
  }, 750);

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
        clientPackage: `${store.get('launcherModpackLink')}`,
        removePackage: true,
        authorization: e,
        root: `${appdataPathUser}/.MMLauncher/`,
        customArgs: JVMUser,
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
          max: `${maxRamUser}M`,
          min: `${minRamUser}M`,
        },
        timeout: 3500
      };

      launcher
        .launch(opts)
        .then(() => {
          win.webContents.send('game-launched');

          if (store.get('launcherOptionDebuggingModeLauncherClose') !== true) {
            setTimeout(() => {
              app.quit();
            }, 7500);
          }

          store.set('launcherOptionDebuggingModeLauncherClose', false);
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
