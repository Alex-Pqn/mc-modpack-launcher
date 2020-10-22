const { ipcRenderer, remote, shell, app } = require('electron');

const Store = require('electron-store');
const store = new Store();

const fs = require('fs');

const appdataUserFolder = store.get('appdataPathUser');

openFolder = (path) => {
  shell.openPath(path);
};

// Modpack downloader - authenticator.js
window.launch = (data) => {
  ipcRenderer.send('launch', data);
};
ipcRenderer.on('progress', (event, data) => {
  downloadProgress(data);
});
ipcRenderer.on('game-launched', (event, data) => {
  downloadFinished();
});
ipcRenderer.on('game-launched-error', (event, data) => {
  gameLaunchedError(data);
});
// call when debuggingMode activated
ipcRenderer.on('log', (event, data) => {
  debugLogs(data);
});

// Modpack downloader - package choice
packageChoiceDisplay = () => {
  // if .MMLauncher exist, skip package choice
  if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher`)) {
    skipPackageChoice();
  }
  // if .MMLauncher doesn't exist
  else {
    packageChoice();
  }
};
// storeSet download link (packs resources choice)
packageChoiceWithPrLink = () => {
  store.set(
    'launcherModpackLink',
    'https://www.dropbox.com/s/p71w8ocqyrne0ie/clientPackage.zip?dl=1'
  );
};

// Authenticator - authenticator.js
const ipc = require('electron').ipcRenderer;

authSend = (u, p) => {
  ipc.send('login', { u, p });
};

ipc.on('err', (err) => {
  authError(err);
});
ipc.on('done', () => {
  authDone();
});

// Cryptr - authenticator.js
const Cryptr = require('cryptr');
const cryptr = new Cryptr(store.get('authKey') + store.get('OSname'));

window.addEventListener('DOMContentLoaded', () => {
  const auth = store.get('auth');
  if (window.getAuthStore !== undefined) {
    getAuthStore(auth);
  }
});

authEncrypt = (u, p) => {
  const uEncrypted = cryptr.encrypt(u);
  const pEncrypted = cryptr.encrypt(p);
  authStore(uEncrypted, pEncrypted);
};
authDecrypt = (u, p) => {
  const uDecrypted = cryptr.decrypt(u);
  const pDecrypted = cryptr.decrypt(p);
  displayAuthInformations(uDecrypted, pDecrypted);
};
authSetStore = (auth) => {
  store.set('auth', JSON.stringify(auth));
};
authInformationsDelete = () => {
  store.delete('auth');
};

// Window - navBarButtons.js
const win = remote.getCurrentWindow();

winMinimize = () => {
  win.minimize();
};
winMaximize = () => {
  if (win.isMaximized()) {
    win.unmaximize();
  } else {
    win.maximize();
  }
};
winClose = () => {
  win.close();
};

// Externals links - openExternalLinks.js
openExternalLink = (link) => {
  require('electron').shell.openExternal(link);
};

// Minecraft Options - options.js
const getMinRam = store.get('minecraftOptionMinRam');
const getMaxRam = store.get('minecraftOptionMaxRam');
const getHeightRes = store.get('minecraftOptionHeightRes');
const getWidthRes = store.get('minecraftOptionWidthRes');
const getFullscreenRes = store.get('minecraftOptionFullscreenRes');
const getJvm = store.get('minecraftOptionJvm');

// storeSet minecraft options
storeSet = (minecraftOption, minecraftOptionValue) => {
  const Store = require('electron-store');
  const store = new Store();
  store.set(minecraftOption, minecraftOptionValue);
};

// display minecraft options values
window.addEventListener('DOMContentLoaded', () => {
  if (window.storeRam !== undefined) {
    storeRam(getMinRam, getMaxRam);
  }
  if (window.storeJvm !== undefined) {
    storeJvm(getJvm);
  }
  if (window.storeRes !== undefined) {
    storeRes(getHeightRes, getWidthRes, getFullscreenRes);
  }
});

// Minecraft Options - defaults minecraft options
window.addEventListener('DOMContentLoaded', () => {
  // minRam,maxRam
  const defaultMaxRam = 3584;
  const defaultMinRam = 2048;
  if (store.get('minecraftOptionMinRam') == undefined) {
    store.set('minecraftOptionMinRam', defaultMinRam);
  }
  if (store.get('minecraftOptionMaxRam') == undefined) {
    store.set('minecraftOptionMaxRam', defaultMaxRam);
  }

  // jvm
  const defaultJvm = [];
  if (store.get('minecraftOptionJvm') == undefined) {
    store.set('minecraftOptionJvm', defaultJvm);
  }

  // heightRes,widthRes,fullscreenRes
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
});

// Launcher Options - options.js
window.addEventListener('DOMContentLoaded', () => {
  if (window.launcherOptions !== undefined) {
    launcherOptions(appdataUserFolder);
  }
  openAppdataCacheFolder = () => {
    shell.openPath(path);
  };
  setStoreDebuggingMode = () => {
    store.set('launcherOptionDebuggingMode', true);
  };
});

// Electron-updater

// update check (call in options part)
checkUpdate = () => {
  ipcRenderer.send('check-update');
};

// update available
ipcRenderer.on('updater_update_available', () => {
  ipcRenderer.removeAllListeners('updater_update_available');
  console.log('Electron Updater : Update for the launcher detected.');

  if (window.updateAvailable !== undefined) {
    updateAvailable();
  }

  document.getElementById('updater-restart').style.display = 'none';
  document.getElementById('updater').style.display = 'flex';
  document.getElementById('updater-available').style.display = 'flex';

  // if exists, delete "mods" and "config" folders
  if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\mods`)) {
    fs.rmdirSync(`${appdataUserFolder}\\.MMLauncher\\mods`, {
      recursive: true,
    });
  }
  if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\config`)) {
    fs.rmdirSync(`${appdataUserFolder}\\.MMLauncher\\config`, {
      recursive: true,
    });
  }
});

// update not available
ipcRenderer.on('updater_update_not_available', () => {
  if (window.NoUpdateAvailable !== undefined) {
    NoUpdateAvailable();
  }
  console.log('Electron Updater : No update detected for the launcher.');
});

// update downloaded
ipcRenderer.on('updater_update_downloaded', () => {
  setTimeout(() => {
    ipcRenderer.removeAllListeners('updater_update_downloaded');
    console.log(
      'Electron Updater : Update finished, waiting to restart the launcher.'
    );

    document.getElementById('updater-available').style.display = 'none';
    document.getElementById('updater-restart').style.display = 'flex';
    document
      .getElementById('button-updater-restart')
      .addEventListener('click', () => {
        ipcRenderer.send('restart_app');
      });
  }, 3000);
});

// update error
ipcRenderer.on('updater_error', (err) => {
  console.error(`Electron Updater Error : ${err}`);
  if (window.updateError !== undefined) {
    updateError();
  }
});

// Path & Open Folders - openPrFolders.js
window.addEventListener('DOMContentLoaded', () => {
  if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher`)) {
    if (window.openAppdataFolders !== undefined) {
      openAppdataFolders();
    }
  } else if (window.openAppdataFoldersError !== undefined) {
    openAppdataFoldersError();
  }

  rpAppdataFolder = () => {
    if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\resourcepacks`)) {
      openRpAppdataFolder(appdataUserFolder);
    }
  };
  spAppdataFolder = () => {
    if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\shaderpacks`)) {
      openRpAppdataFolder(appdataUserFolder);
    }
  };
});

// ModsList - modsList.js
window.addEventListener('DOMContentLoaded', () => {
  if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\mods`)) {
    const modsFolderLength = fs.readdirSync(
      `${appdataUserFolder}\\.MMLauncher\\mods`
    );
    if (window.getModsList !== undefined) {
      getModsList(modsFolderLength);
    }
  } else if (window.modsListError !== undefined) {
    modsListError();
  }
});
