
const { ipcRenderer, remote } = require('electron');

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
let shell = require('electron').shell
document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
    event.preventDefault()
    shell.openExternal(event.target.href)
  }
})

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
const Store = require('electron-store');
const store = new Store();

const getMinRam = store.get('minecraftOptionMinRam')
const getMaxRam = store.get('minecraftOptionMaxRam')

const getJvm = store.get('minecraftOptionJvm')

storeSet = (key, value) => {
    const Store = require('electron-store');
    const store = new Store();
    store.set(key, value)
}

window.addEventListener('DOMContentLoaded', () => {
    storeRam(getMinRam, getMaxRam)
    storeJvm(getJvm)
})

//Cryptr
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');
 
let uEncrypted;

uEncrypt = (u) => {
    uEncrypted = cryptr.encrypt(u);
    uStore(uEncrypted)
}

uDecrypt = (u) => {
    const uDecrypted = cryptr.decrypt(u)
    displayAuthInformations(uDecrypted)
}