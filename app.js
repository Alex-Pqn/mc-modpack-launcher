
require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

const { app, BrowserWindow, ipcMain, autoUpdater } = require("electron");
const path = require('path');
const url = require('url');

const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

const fs = require('fs');
let OSname = require("os").userInfo().username;

let win;
let IMG_DIR = '/assets/img/icon/png/'
let ASSET_DIR = '/assets/html/'

async function createWindow(){
  win = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, IMG_DIR, 'icon.png'),
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
  }
  });

  win.openDevTools();

  win.loadURL(url.format({
    pathname: path.join(__dirname, ASSET_DIR, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

app.whenReady().then(() => {
  createWindow()
  
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if(process.plateform !== 'darwin'){
    app.quit();
  }
})

ipcMain.on('login', (event, data) => {
  Authenticator.getAuth(data.u, data.p).then(() => {
    event.sender.send('done')
    let opts = {
      clientPackage: 'C:/Users/'+OSname+'/Desktop/Dev Web/clientPackage/clientPackage.zip',
      authorization: Authenticator.getAuth(data.u, data.p),
      root: 'C:/Users/'+OSname+'/AppData/Roaming/.MarieMadeleineLauncher',
      version: {
          number: "1.8.9",
          type: "release"
      },
      forge: 'C:/Users/'+OSname+'/AppData/Roaming/.MarieMadeleineLauncher/forge.jar',
      memory: {
          max: "8G",
          min: "4G"
      },
  }
   
  launcher.launch(opts);
   
  launcher.on('debug', (e) => console.log(e));
  launcher.on('data', (e) => console.log(e));
  launcher.on('progress', (e) => console.log(e));
  }).catch((err) => {
    event.sender.send('err', { er: err })
    event.sender.send("progression :", e)
  })
})