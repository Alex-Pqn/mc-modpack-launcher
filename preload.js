const { ipcRenderer, remote, shell } = require('electron');
const ipc = require('electron').ipcRenderer;
const fs = require('fs');
const Cryptr = require('cryptr');
const Store = require('electron-store');
const store = new Store();

const appdataUserFolder = store.get('appdataPathUser');

let { modpackLink, defaultMinecraftOpt, globalOpt, consoleWarning, audioPlayer, authValidator, dynamicBackground, externalLink, typedOpt, cryptOpt, modpackConsistentFiles } = require('./globalValues');

// return global values in globalValues.js
getData = () => {
  if(window.data !== undefined) {
    let globalValues = [
      modpackLink, 
      defaultMinecraftOpt, 
      globalOpt, 
      consoleWarning, 
      audioPlayer, 
      authValidator, 
      dynamicBackground, 
      externalLink, 
      typedOpt, 
      cryptOpt
    ]
    data(globalValues)
  } 
}

// open folder
openFolder = (path) => {
  shell.openPath(path);
};
// push in electron store
pushElectronStore = (storeOptions) => {
  storeOptions.forEach(opt => {
    store.set(opt.storeKey, opt.storeValue);
  })
};
// delete in electron store
deleteElectronStore = (storeKey) => {
  store.delete(storeKey);
}
// open external link (outside the app)
openExternalLink = (link) => {
  require('electron').shell.openExternal(link);
};

// MODPACK DOWNLOADER //
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
// on debugging-mode activated
ipcRenderer.on('log', (event, data) => {
  debugLogs(data);
});


// MODPACK PACKAGE CHOICE //
// if the "mods" folder in ".MMLauncher" exist, skip package choice
packageChoice = () => {
  if (store.get('launcherModpackLink')) {
    skipPackageChoice();
  }
  else {
    displayPackageChoice();
  }
};


// AUTHENTICATOR
authSend = (u, p) => {
  ipc.send('login', { u, p });
};
ipc.on('err', (err) => {
  authError(err);
});
ipc.on('done', () => {
  authDone();
});


// AUTHENTICATOR CRYPTR
const cryptr = new Cryptr(store.get('authKey') + store.get('OSname'));

window.addEventListener('DOMContentLoaded', () => {
  const getAuth = store.get('auth');
  
  // descrypt & send auth informations
  if (window.displayAuthInformations !== undefined) {
    function authDecrypt () {
      if(getAuth) {
        let authInformations = JSON.parse(getAuth)[0]
        
        let uDecrypted = cryptr.decrypt(authInformations.u);
        let pDecrypted = cryptr.decrypt(authInformations.p);
        displayAuthInformations(uDecrypted, pDecrypted);
      }
    }
    authDecrypt()
  }
});

authEncrypt = (u, p) => {
  let uEncrypted = cryptr.encrypt(u);
  let pEncrypted = cryptr.encrypt(p);
  storeAuthInformations(uEncrypted, pEncrypted);
};


// WINDOW HEADER
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


// OPTIONS
const getMinRam = store.get('minecraftOptionMinRam');
const getMaxRam = store.get('minecraftOptionMaxRam');
const getHeightRes = store.get('minecraftOptionHeightRes');
const getWidthRes = store.get('minecraftOptionWidthRes');
const getFullscreenRes = store.get('minecraftOptionFullscreenRes');
const getJvm = store.get('minecraftOptionJvm');

window.addEventListener('DOMContentLoaded', () => {
  // display values
  if (window.displayRam !== undefined) {
    displayRam(getMinRam, getMaxRam);
  }
  if (window.displayJvm !== undefined) {
    displayJvm(getJvm);
  }
  if (window.displayResolution !== undefined) {
    displayResolution(getHeightRes, getWidthRes, getFullscreenRes);
  }
  
  // open cache folder
  if (window.openCacheFolder !== undefined) {
    openCacheFolder(appdataUserFolder);
  }
});


// SHADERPACKS & RESOURCEPACKS FOLDERS
window.addEventListener('DOMContentLoaded', () => {
  resourcepacksAppdataFolder = () => {
    if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\resourcepacks`)) {
      openFolder(`${appdataUserFolder}\\.MMLauncher\\resourcepacks`);
    }else {
      resourcepacksFolderError()
    }
  };
  shaderpacksAppdataFolder = () => {
    if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\shaderpacks`)) {
      openFolder(`${appdataUserFolder}\\.MMLauncher\\shaderpacks`);
    }else {
      shaderpacksFolderError()
    }
  };
});


// MODS LIST
window.addEventListener('DOMContentLoaded', () => {
  if (fs.existsSync(`${appdataUserFolder}\\.MMLauncher\\mods`)) {
    const modsFolderLength = fs.readdirSync(
      `${appdataUserFolder}\\.MMLauncher\\mods`
    );
    if (window.displayModsList !== undefined) {
      displayModsList(modsFolderLength);
    }
  } else if (window.modsListError !== undefined) {
    modsListError();
  }
});


// RESET MODPACK //
resetModpackFolder = () => {
  // consistent files - that will not be deleted
  const consistentFiles = modpackConsistentFiles

  fs.readdirSync(`${appdataUserFolder}\\.MMLauncher\\`).forEach(file => {
    let deleteFile = true
    for(let i = 0; i < consistentFiles.length; i++) {
      if (consistentFiles[i] == file) {
        deleteFile = false
      }
      if(i === consistentFiles.length - 1 && deleteFile === true) {
        try {
          fs.rmdirSync(`${appdataUserFolder}\\.MMLauncher\\${file}`, {
            recursive: true,
          });
        } catch (err) {
          fs.unlinkSync(`${appdataUserFolder}\\.MMLauncher\\${file}`);
        }
      }
    }
  }); 
}


// ELECTRON UPDATER

// check update
checkUpdate = () => {
  ipcRenderer.send('check-update');
};

// update available
function updateAvailable () {
  ipcRenderer.on('updater_update_available', () => {
    ipcRenderer.removeAllListeners('updater_update_available');
  
    if (window.launcherUpdateAvailable !== undefined) {
      launcherUpdateAvailable();
    }
  
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
}
updateAvailable()

// update not available
function updateNotAvailable () {
  ipcRenderer.on('updater_update_not_available', () => {
    if (window.launcherUpdateNotAvailable !== undefined) {
      launcherUpdateNotAvailable();
    }
  });
}
updateNotAvailable()

// update downloaded
function updateDownloaded () {
  ipcRenderer.on('updater_update_downloaded', () => {
    setTimeout(() => {
      ipcRenderer.removeAllListeners('updater_update_downloaded');
      if (window.launcherUpdateDownloaded !== undefined) {
        launcherUpdateDownloaded()
      }
    }, 3000);
  });
}
updateDownloaded()

// update error
function updateError () {
  ipcRenderer.on('updater_error', (err) => {
    if (window.launcherUpdateError !== undefined) {
      launcherUpdateError(err);
    }
  });
} 
updateError()
