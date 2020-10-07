// PR
openAppdataFolders = (appdata) => {
    document.getElementById('rp-folder').addEventListener('click', () => {
      openFolder(`${appdata}\\.MMLauncher\\resourcepacks`);
    });
    document.getElementById('sp-folder').addEventListener('click', () => {
      openFolder(`${appdata}\\.MMLauncher\\shaderpacks`);
    });
  };