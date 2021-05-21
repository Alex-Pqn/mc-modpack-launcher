const textError = document.getElementById('pr-error');
const buttonsContainer = document.getElementById('pr-buttons');
const resourcepacksButton = document.getElementById('rp-folder');
const shaderpacksButton = document.getElementById('sp-folder');

// open resourcepacks folder
function openResourcepacksFolder () {
  document.getElementById('rp-folder').addEventListener('click', () => {
    resourcepacksAppdataFolder();
  });
};
openResourcepacksFolder()

// open shaderpacks folder
function openShaderpacksFolder () {
  document.getElementById('sp-folder').addEventListener('click', () => {
    shaderpacksAppdataFolder();
  });
};
openShaderpacksFolder()

// ressourcepacks folder error (folder doesn't find)
function resourcepacksFolderError () {
  resourcepacksButton.textContent = 'Aucun dossier trouvé';
  setTimeout(() => {
    resourcepacksButton.textContent = 'Ouvrir le dossier';
  }, 2000);
}

// shaderpacks folder error (folder doesn't find)
function shaderpacksFolderError () {
  shaderpacksButton.textContent = 'Aucun dossier trouvé';
  setTimeout(() => {
    shaderpacksButton.textContent = 'Ouvrir le dossier';
  }, 2000);
}