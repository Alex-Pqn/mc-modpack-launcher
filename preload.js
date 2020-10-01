
const { ipcRenderer, remote } = require('electron');

const Store = require('electron-store');
const store = new Store();

//Window
let win = remote.getCurrentWindow();
winMinimize = () => {
    win.minimize();
}
winMaximize = () => {
    if(win.isMaximized()){
        win.unmaximize();
    }else{
        win.maximize();
    }
}
winClose = () => {
    win.close();
}

//Modpack downloader
window.launch = (data) => {
    ipcRenderer.send('launch', data);
}
ipcRenderer.on('log', (event, data) => {
    debugLogs(data);
});
ipcRenderer.on('progress', (event, data) => {
    downloadProgress(data);
});
ipcRenderer.on('game-launched', (event, data) => {
    downloadFinished();
});

//Externals links
openExternalLink = (link) => {
    require("electron").shell.openExternal(link);
}

//Authenticator
const ipc = require('electron').ipcRenderer
authSend = (u, p) => {
    ipc.send('login', { u: u, p: p })
}
ipc.on('err', (data) => {
    authError(data);
  })
  
ipc.on('done', () => {
    authDone();
})

//Store
const getMinRam = store.get('minecraftOptionMinRam')
const getMaxRam = store.get('minecraftOptionMaxRam')

const getHeightRes = store.get('minecraftOptionHeightRes')
const getWidthRes = store.get('minecraftOptionWidthRes')
const getFullscreenRes = store.get('minecraftOptionFullscreenRes')

const getJvm = store.get('minecraftOptionJvm')

storeSet = (key, value) => {
    const Store = require('electron-store');
    const store = new Store();
    store.set(key, value)
}

window.addEventListener('DOMContentLoaded', () => {
    storeRam(getMinRam, getMaxRam)
    storeJvm(getJvm)
    storeRes(getHeightRes, getWidthRes, getFullscreenRes)
})

//Cryptr
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

authEncrypt = (u, p) => {
    const uEncrypted = cryptr.encrypt(u);
    const pEncrypted = cryptr.encrypt(p);
    authStore(uEncrypted, pEncrypted)
}

authDecrypt = (u, p) => {
    const uDecrypted = cryptr.decrypt(u)
    const pDecrypted = cryptr.decrypt(p)
    displayAuthInformations(uDecrypted, pDecrypted)
}

authSetStore = (auth) => {
    store.set('auth', JSON.stringify(auth))
}

window.addEventListener('DOMContentLoaded', () => {
    const auth = store.get('auth')
    getAuthStore(auth)
})

authInformationsDelete = () => {
    store.delete('auth')
}

//Path
const appdataUserFolder = store.get('minecraftOptionAppdata');

window.addEventListener('DOMContentLoaded', () => {
    displayAppdataFolders(appdataUserFolder)
})