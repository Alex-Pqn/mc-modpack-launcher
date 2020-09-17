
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
      preload: path.join(app.getAppPath(), 'preload.js'),
      nodeIntegration: true,
      enableRemoteModule: true,
      worldSafeExecuteJavaScript: true
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

app.on('close', () => {
  popWindow = null;
});

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
          max: "8000M",
          min: "4000M"
      },
      window: {
        fullscreen: true
      }
  }
   
  launcher.launch(opts).then(() => {
    win.webContents.send('game-launched')
    setTimeout(() => {
      app.quit();
    }, 15000);
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
    event.sender.send('err', { er: err })
  })
})