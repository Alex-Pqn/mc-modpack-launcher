
displayAppdataFolders = (appdata) => {
    //resource-packs
    const rpText = document.getElementById('rp-option');
    rpText.textContent = appdata + "\\.MMLauncher\\resourcepacks"

    //shader-packs
    const spText = document.getElementById('sp-option');
    spText.textContent = appdata + "\\.MMLauncher\\shaderpacks"
}