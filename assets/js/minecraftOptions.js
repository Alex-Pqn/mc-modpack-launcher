
const Store = require('electron-store');
const store = new Store();

const buttonMinRam = document.getElementById('min-ram');
const buttonMaxRam = document.getElementById('max-ram');

const paragraphStatusRam = document.getElementById('status-ram');
const closeStatusRam = document.getElementById('close-status-ram');
const containerStatusRam = document.getElementById('container-status-ram');

let defaultMaxRam = 3584;
let defaultMinRam = 2048;

const getMinRam = store.get('minecraftOptionMinRam')
const getMaxRam = store.get('minecraftOptionMaxRam')

buttonMinRam.value = getMinRam
buttonMaxRam.value = getMaxRam

displayStatus = (value, background, color) => {
    containerStatusRam.style.height = 0
    containerStatusRam.style.opacity = 0

    setTimeout(() => {
        containerStatusRam.style.height = "auto"
        containerStatusRam.style.opacity = 1
        containerStatusRam.style.backgroundColor = background;
    
        paragraphStatusRam.innerHTML = value;
        paragraphStatusRam.style.padding = '3px 8px';
        paragraphStatusRam.style.color = color;
    
        closeStatusRam.innerHTML = '×';
        closeStatusRam.style.color = color;
    
        closeStatus(containerStatusRam);
    }, 200);
}

closeStatus = () => {
    document.getElementById('close-status-ram').addEventListener('click', () => {
        containerStatusRam.style.height = 0
        containerStatusRam.style.opacity = 0
    })
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