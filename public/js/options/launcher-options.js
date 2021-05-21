// Launcher-options config

const containerStatusLauncherOptions = document.getElementById(
  'container-status-launcher-options'
);
const paragraphStatusLauncherOptions = document.getElementById(
  'status-launcher-options'
);
const closeTextStatusLauncherOptions = document.getElementById(
  'close-status-launcher-options'
);

// check update
function updateCheck () {
  document
  .getElementById('button-update-launcherOptions')
  .addEventListener('click', () => {
    checkUpdate();
  });
}
updateCheck()

// open cache folder
function openCacheFolder (cacheFolderPath) {
  document
    .getElementById('button-cache-launcherOptions')
    .addEventListener('click', () => {
      openFolder(`${cacheFolderPath}\\mmlauncher`);
    });
}

// turn on debugging mode
function turnDebuggingMode () {
  document.getElementById('button-debugging-launcherOptions').addEventListener('click', () => {
    let opts = [
      {
        storeKey: "launcherOptionDebuggingMode",
        storeValue: true
      }
    ]
    pushElectronStore(opts);
    
    displayStatus(
      'Le mode de débogage a été activé. Il prendra seulement effet lors du prochain redémarrage.',
      succedColor,
      textColor,
      containerStatusLauncherOptions,
      paragraphStatusLauncherOptions,
      closeTextStatusLauncherOptions
    );
  });
}
turnDebuggingMode()