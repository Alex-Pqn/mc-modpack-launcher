const { ipcRenderer, remote, shell, app } = require('electron');

const Store = require('electron-store');
const store = new Store();

const appdataUserFolder = store.get('appdataPathUser');

openFolder = (path) => {
  shell.openPath(path);
};

// Modpack downloader - authenticator.js
window.launch = (data) => {
  ipcRenderer.send('launch', data);
};
ipcRenderer.on('log', (event, data) => {
  debugLogs(data);
});
ipcRenderer.on('progress', (event, data) => {
  downloadProgress(data);
});
ipcRenderer.on('game-launched', (event, data) => {
  downloadFinished();
});

// Authenticator - authenticator.js
const ipc = require('electron').ipcRenderer;

authSend = (u, p) => {
  ipc.send('login', { u, p });
};

ipc.on('err', (data) => {
  authError(data);
});
ipc.on('done', () => {
  authDone();
});

// Cryptr - authenticator.js
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

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

storeSet = (key, value) => {
  const Store = require('electron-store');
  const store = new Store();
  store.set(key, value);
};

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

// Launcher Options - options.js
window.addEventListener('DOMContentLoaded', () => {
  if (window.launcherOptions !== undefined) {
    launcherOptions(appdataUserFolder)
  }
  if (window.openAppdataCacheFolder !== undefined) {
    openAppdataCacheFolder = () => {
      shell.openPath(path);
    }
  }
  if (window.setStoreDebuggingMode !== undefined) {
    setStoreDebuggingMode = () => {
      store.set('launcherOptionDebuggingMode', true)
    }
  }
});

// Path & Open Folders - openPrFolders.js
window.addEventListener('DOMContentLoaded', () => {
  if (window.openAppdataFolders !== undefined) {
    openAppdataFolders(appdataUserFolder);
  }
});

// ModsList - modsList.js
const fs = require('fs');

window.addEventListener('DOMContentLoaded', () => {
  if (window.modsListError !== undefined) {
    modsListError();
  }
  const modsFolder = fs.readdirSync(`${appdataUserFolder}\\.MMLauncher\\mods`);
  if (window.getModsList !== undefined) {
    getModsList(modsFolder);
  }
});


// Electron-updater

checkUpdate = () => {
  ipcRenderer.send('check-update');
}

ipcRenderer.on('updater_update_available', () => {
  ipcRenderer.removeAllListeners('updater_update_available');
  if (window.updateAvailable !== undefined) {
    updateAvailable()
  }
  console.log('Electron Updater : Update for the launcher detected.')
  document.getElementById('updater-restart').style.display = 'none'
  document.getElementById('updater').style.display = 'flex'
  document.getElementById('updater-available').style.display = 'flex'
});

ipcRenderer.on('updater_update_not_available', () => {
  if (window.NoUpdateAvailable !== undefined) {
    NoUpdateAvailable()
  }
  console.log('Electron Updater : No update detected for the launcher.')
});

ipcRenderer.on('updater_update_downloaded', () => {
  ipcRenderer.removeAllListeners('updater_update_downloaded');
  console.log('Electron Updater : Update finished, attempting to restart the launcher.')
  document.getElementById('updater-available').style.display = 'none'
  document.getElementById('updater-restart').style.display = 'flex'
  document.getElementById('button-updater-restart').addEventListener('click', () => {
  ipcRenderer.send('restart_app');
  })
});

ipcRenderer.on('updater_error', (err) => {
  if (window.updateError !== undefined) {
    updateError(err)
  }
  console.log('Electron Updater Error :' + err)
})