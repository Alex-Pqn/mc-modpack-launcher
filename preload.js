const { ipcRenderer, remote } = require('electron');

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
const notification = document.getElementById('notification');
const message = document.getElementById('message');
const restartButton = document.getElementById('restart-button');

ipcRenderer.on('update_available', () => {
  ipcRenderer.removeAllListeners('update_available');
  message.innerText = 'A new update is available. Downloading now...';
  notification.classList.remove('hidden');
});

ipcRenderer.on('update_downloaded', () => {
  ipcRenderer.removeAllListeners('update_downloaded');
  message.innerText = 'Update Downloaded. It will be installed on restart. Restart now?';
  restartButton.classList.remove('hidden');
  notification.classList.remove('hidden');
});

closeNotification = () => {
  notification.classList.add('hidden');
}
restartApp = () => {
  ipcRenderer.send('restart_app');
}