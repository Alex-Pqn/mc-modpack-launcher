// update available
function launcherUpdateAvailable () {
  console.log('Electron Updater : Update for the launcher detected.');
  
  document.getElementById('updater-restart').style.display = 'none';
  document.getElementById('updater').style.display = 'flex';
  
  displayStatus(
    'Une mise à jour a été détectée. Lancement du processus de téléchargement en cours.',
    succedColor,
    textColor,
    containerStatusLauncherOptions,
    paragraphStatusLauncherOptions,
    closeTextStatusLauncherOptions
  );
};

// update not available
function launcherUpdateNotAvailable () {
  console.log('Electron Updater : No update detected for the launcher.');
  
  displayStatus(
    "Après vérification, aucune nouvelle mise à jour n'est disponible.",
    warningColor,
    textColor,
    containerStatusLauncherOptions,
    paragraphStatusLauncherOptions,
    closeTextStatusLauncherOptions
  );
};

// update downloaded
function launcherUpdateDownloaded () {
  console.log(
    'Electron Updater : Update finished, waiting to restart the launcher.'
  );

  document.getElementById('updater').style.display = 'none';
  document.getElementById('updater-restart').style.display = 'flex';
  document
    .getElementById('button-updater-restart')
    .addEventListener('click', () => {
      ipcRenderer.send('restart_app');
    });
}

// update error
function launcherUpdateError (err) {
  console.error("Electron Updater Error");
  console.error(err)
  
  displayStatus(
    `Erreur lors de la vérification des mises à jour.`,
    errorColor,
    textColor,
    containerStatusLauncherOptions,
    paragraphStatusLauncherOptions,
    closeTextStatusLauncherOptions
  );
};