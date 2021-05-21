// modpack reset
function resetModpack () {
  document
  .getElementById('button-reset_modpack')
  .addEventListener('click', () => {
    // reset modpack folder - call preload
    deleteElectronStore("launcherModpackLink")
    resetModpackFolder();
    window.location.reload();
  });
}
resetModpack()