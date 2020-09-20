
//declarations & imports

require('electron-reload')(__dirname, {
  electron: require(`${__dirname}/node_modules/electron`)
});

const { app, BrowserWindow, ipcMain, TouchBarSegmentedControl } = require("electron");
const path = require('path');
const url = require('url');

const Store = require('electron-store');
const store = new Store();

const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

let OSname = require("os").userInfo().username;

let win;
let IMG_DIR = '/assets/img/icon/png/'
let ASSET_DIR = '/assets/html/'


//main window launcher creation

createWindow = () => {
  win = new BrowserWindow({
    width: 900,
    height: 650,
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
  
  // win.loadURL('https://url.com')
  win.loadURL(url.format({
    pathname: path.join(__dirname, ASSET_DIR, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
}

app.on("ready", createWindow);

app.whenReady().then(() => {
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})


//app compatibility

app.on('window-all-closed', () => {
  if(process.plateform !== 'darwin'){
    app.quit();
  }
})

app.on('close', function (event) {
  app.hide();
  event.preventDefault();
})

//login, auth, launch & opts minecraft launcher

ipcMain.on('login', (event, data) => {

  let maxRamUser = store.get('minecraftOptionMaxRam');
  let minRamUser = store.get('minecraftOptionMinRam');
  
  let JVMUser = store.get('minecraftOptionJvm');

  Authenticator.getAuth(data.u, data.p).then(() => {
    event.sender.send('done')

    let opts = {
      clientPackage: 'C:/Users/'+OSname+'/Desktop/Dev Web/clientPackage/clientPackage.zip',
      authorization: Authenticator.getAuth('', ''),
      root: app.getPath('appData') + '/.MMLauncher/',
      customArgs: JVMUser,
      version: {
          number: "1.8.9",
          type: "release"
      },
      forge: app.getPath('appData') + '/.MMLauncher/forge.jar',
      memory: {
          max: maxRamUser+'M',
          min: minRamUser+'M'
      },
      timeout: 3500
  }
   
  launcher.launch(opts).then(() => {
    win.webContents.send('game-launched')
    // setTimeout(() => {
    //   app.quit();
    // }, 15000);
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