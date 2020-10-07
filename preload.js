const { ipcRenderer, remote, app } = require('electron');

const Store = require('electron-store');

const store = new Store();

const appdataUserFolder = store.get('minecraftOptionAppdata');

// Window
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

// Open folder
const { shell } = require('electron');

openFolder = (path) => {
  shell.openPath(path);
};

// Modpack downloader
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

// Externals links
openExternalLink = (link) => {
  require('electron').shell.openExternal(link);
};

// Authenticator
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

// Store
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

// Cryptr
const Cryptr = require('cryptr');

const cryptr = new Cryptr('myTotalySecretKey');

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

window.addEventListener('DOMContentLoaded', () => {
  const auth = store.get('auth');
  if (window.getAuthStore !== undefined) {
    getAuthStore(auth);
  }
});

authInformationsDelete = () => {
  store.delete('auth');
};

// Path
window.addEventListener('DOMContentLoaded', () => {
  if (window.openAppdataFolders !== undefined) {
    openAppdataFolders(appdataUserFolder);
  }
});

// Mods
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


//Auto-updater

ipcRenderer.on('updater_update_available', (event, data) => {
  ipcRenderer.removeAllListeners('updater_update_available');
  console.log('Electron Updater : Update for the launcher detected.')
  document.getElementById('updater-container-available').style.display = 'flex'
});

ipcRenderer.on('updater_update_not_available', (event, data) => {
  console.log('Electron Updater : No update detected for the launcher.')
});

ipcRenderer.on('updater_update_downloaded', (event, data) => {
  ipcRenderer.removeAllListeners('updater_update_downloaded');
  console.log('Electron Updater : Update finished, attempting to restart the launcher.')
  document.getElementById('updater-container-available').style.display = 'none'
  setTimeout(() => {
    document.getElementById('updater-container-restart').style.display = 'flex'
    document.getElementById('button-updater-restart').addEventListener('click', () => {
      ipcRenderer.send('restart_app');
    })
  }, 1500);
});

ipcRenderer.on('updater_error', (event, err) => {
  console.log('Updater error :' + err)
})

ipcRenderer.on('updater_download_progress', (progress) => {
  console.log("download progress 1")
  const updaterProgressStatus = document.getElementById('updater-available-status')
  updaterProgressStatus.textContent = progress
})

ipcRenderer.on('updater_download_progress', (event, data) => {
  console.log("download progress 2")
  const updaterProgressStatus = document.getElementById('updater-available-status')
  updaterProgressStatus.textContent = data
})

window.addEventListener('DOMContentLoaded', () => { 
})