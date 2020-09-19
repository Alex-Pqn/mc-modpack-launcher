const { ipcRenderer } = require('electron');

window.launch = (data) => {
    ipcRenderer.send('launch', data);
}

ipcRenderer.on('log', (event, data) => {
    console.log(data);
});

ipcRenderer.on('progress', (event, data) => {
    if(data.type === 'forge') {
        displayStatusFormTwo(`Initialisation de forge (${data.task} / ${data.total})`, 'rgb(255, 255, 255)', 'rgba(122, 122, 122, 0.616)');
    } else if(data.type === 'classes') {
        displayStatusFormTwo(`Initialisation des classes (${data.task} / ${data.total})`, 'rgb(255, 255, 255)', 'rgba(122, 122, 122, 0.616)');
    } else if(data.type === 'assets' || data.type === 'assets-copy') {
        displayStatusFormTwo(`Initialisation des assets (${data.task} / ${data.total})`, 'rgb(255, 255, 255)', 'rgba(122, 122, 122, 0.616)');
    } else if(data.type === 'natives') {
        displayStatusFormTwo(`Vérification des natives (${data.task} / ${data.total})`, 'rgb(255, 255, 255)', 'rgba(122, 122, 122, 0.616)');
    } else {
        displayStatusFormTwo('Finitions et lancement du jeu...', 'rgb(0, 82, 0)', 'rgba(53, 255, 53, 0.788)');
    }
});

ipcRenderer.on('game-launched', (event, data) => {
    displayStatusFormOne("Téléchargement des mises à jour terminé.", 'rgb(0, 82, 0)', 'rgba(53, 255, 53, 0.788)');
    displayStatusFormTwo('Tentative de lancement du jeu en cours...', 'rgb(255, 255, 255)', 'rgba(122, 122, 122, 0.616)');
});

let shell = require('electron').shell
document.addEventListener('click', function (event) {
  if (event.target.tagName === 'A' && event.target.href.startsWith('http')) {
    event.preventDefault()
    shell.openExternal(event.target.href)
  }
})