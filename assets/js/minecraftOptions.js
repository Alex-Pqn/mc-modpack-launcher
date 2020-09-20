
const Store = require('electron-store');
const store = new Store();

const buttonMinRam = document.getElementById('min-ram');
const buttonMaxRam = document.getElementById('max-ram');

let defaultMaxRam = 3584;
let defaultMinRam = 2048;

const getMinRam = store.get('minecraftOptionMinRam')
const getMaxRam = store.get('minecraftOptionMaxRam')

buttonMinRam.value = getMinRam
buttonMaxRam.value = getMaxRam

displayStatus = (value, background, color) => {
    const paragraphErrorRam = document.getElementById('error-ram');
    paragraphErrorRam.textContent = value
    paragraphErrorRam.style.padding = '3px 8px'
    paragraphErrorRam.style.backgroundColor = background
    paragraphErrorRam.style.color = color
}

if (getMinRam === undefined) {
    store.set('minecraftOptionMinRam', defaultMinRam);
    buttonMinRam.value = defaultMinRam
}if (getMaxRam === undefined) {
    store.set('minecraftOptionMaxRam', defaultMaxRam);
    buttonMaxRam.value = defaultMaxRam
}

document.getElementById('button-reset-ram').addEventListener('click', () => {
    store.set('minecraftOptionMinRam', defaultMinRam);
    store.set('minecraftOptionMaxRam', defaultMaxRam);
    buttonMinRam.value = defaultMinRam
    buttonMaxRam.value = defaultMaxRam
    displayStatus('Les valeurs ont bien été remises par défaut.', 'rgb(197, 95, 0)', 'white')
})

document.getElementById('button-save-ram').addEventListener('click', () => {
    store.set('minecraftOptionMinRam', Math.floor(buttonMinRam.value));
    store.set('minecraftOptionMaxRam', Math.floor(buttonMaxRam.value));

    if (buttonMinRam.value == '' || parseInt(buttonMinRam.value) < defaultMinRam) {
        store.set('minecraftOptionMinRam', defaultMinRam);
    }
    if (buttonMaxRam.value == '' || parseInt(buttonMaxRam.value) < defaultMaxRam) {
        store.set('minecraftOptionMaxRam', defaultMaxRam);
    }
    if (buttonMinRam.value == '' || parseInt(buttonMinRam.value) < defaultMinRam) {
        displayStatus('Min. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (' + defaultMinRam + ' Mo).', 'rgb(122, 0, 0)', 'white')
    }else if (buttonMaxRam.value == '' || parseInt(buttonMaxRam.value) < defaultMaxRam) {
        displayStatus('Max. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (' + defaultMaxRam + ' Mo).', 'rgb(122, 0, 0)', 'white')
    }else{
        displayStatus('Les changements ont bien été pris en compte.', 'rgb(0, 80, 0)', 'white')
    }
})