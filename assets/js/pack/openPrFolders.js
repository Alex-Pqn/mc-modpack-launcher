openAppdataFoldersError = () => {
  const textError = document.getElementById('pr-error');
  const buttonsContainer = document.getElementById('pr-buttons');
  textError.style.display = 'flex';
  buttonsContainer.style.display = 'none';
};

openAppdataFolders = (appdata, launcherFolderLength) => {
  const textError = document.getElementById('pr-error');
  const buttonsContainer = document.getElementById('pr-buttons');
  textError.style.display = 'none';
  buttonsContainer.style.display = 'initial';

  document.getElementById('rp-folder').addEventListener('click', () => {
    if (launcherFolderLength.length > 0 || launcherFolderLength == undefined) {
      openFolder(`${appdata}\\.MMLauncher\\resourcepacks`);
    } else {
      openAppdataFoldersError();
    }
  });
  document.getElementById('sp-folder').addEventListener('click', () => {
    if (launcherFolderLength.length > 0) {
      openFolder(`${appdata}\\.MMLauncher\\shaderpacks`);
    } else {
      openAppdataFoldersError();
    }
  });
};
