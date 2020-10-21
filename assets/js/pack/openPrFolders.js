const textError = document.getElementById('pr-error');
const buttonsContainer = document.getElementById('pr-buttons');
const rpButton = document.getElementById('rp-folder');
const spButton = document.getElementById('sp-folder');

openAppdataFoldersError = () => {
  textError.style.display = 'flex';
  buttonsContainer.style.display = 'none';
};

openAppdataFolders = () => {
  textError.style.display = 'none';
  buttonsContainer.style.display = 'initial';

  document.getElementById('rp-folder').addEventListener('click', () => {
    rpButton.textContent = 'Aucun dossier trouvé';
    rpAppdataFolder();
  });
  document.getElementById('sp-folder').addEventListener('click', () => {
    spButton.textContent = 'Aucun dossier trouvé';
    spAppdataFolder();
  });
};

openRpAppdataFolder = (appdata) => {
  rpButton.textContent = 'Ouvrir le dossier';
  openFolder(`${appdata}\\.MMLauncher\\resourcepacks`);
};
openSpAppdataFolder = (appdata) => {
  spButton.textContent = 'Ouvrir le dossier';
  openFolder(`${appdata}\\.MMLauncher\\shaderpacks`);
};
