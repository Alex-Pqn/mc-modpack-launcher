
const timeoutStatus = 200;
const defaultValueMessage = "Les valeurs ont été remises par défaut.";
const changeMessage = "Les changements ont été pris en compte.";

//RAM 

const containerStatusRam = document.getElementById('container-status-ram');

storeRam = (getMinRam, getMaxRam) => {
    const inputMinRam = document.getElementById('min-ram');
    const inputMaxRam = document.getElementById('max-ram');

    const paragraphStatusRam = document.getElementById('status-ram');
    const closeTextStatusRam = document.getElementById('close-status-ram');

    let defaultMaxRam = 3584;
    let defaultMinRam = 2048;

    inputMinRam.value = getMinRam
    inputMaxRam.value = getMaxRam
    
    displayStatusRam = (value, background, color) => {
        closeStatus()

        containerStatusRam.style.height = 0
        containerStatusRam.style.opacity = 0

        setTimeout(() => {
            containerStatusRam.style.height = "auto"
            containerStatusRam.style.opacity = 1
            containerStatusRam.style.backgroundColor = background;
        
            paragraphStatusRam.innerHTML = value;
            paragraphStatusRam.style.padding = '3px 8px';
            paragraphStatusRam.style.color = color;
        
            closeTextStatusRam.innerHTML = '×';
            closeTextStatusRam.style.color = color;
        }, timeoutStatus);
    }

    if (getMinRam === undefined) {
        storeSet('minecraftOptionMinRam', defaultMinRam)
        inputMinRam.value = defaultMinRam
    }if (getMaxRam === undefined) {
        storeSet('minecraftOptionMaxRam', defaultMaxRam)
        inputMaxRam.value = defaultMaxRam
    }

    document.getElementById('button-reset-ram').addEventListener('click', () => {
        storeSet('minecraftOptionMinRam', defaultMinRam)
        storeSet('minecraftOptionMaxRam', defaultMaxRam)
        inputMinRam.value = defaultMinRam
        inputMaxRam.value = defaultMaxRam
        displayStatusRam(defaultValueMessage, 'rgb(197, 95, 0)', 'white')
    })

    document.getElementById('button-save-ram').addEventListener('click', () => {
        storeSet('minecraftOptionMinRam', Math.floor(inputMinRam.value))
        storeSet('minecraftOptionMaxRam', Math.floor(inputMaxRam.value))

        if (inputMinRam.value == '' || parseInt(inputMinRam.value) < defaultMinRam) {
            storeSet('minecraftOptionMinRam', defaultMinRam)
        }
        if (inputMaxRam.value == '' || parseInt(inputMaxRam.value) < defaultMaxRam) {
            storeSet('minecraftOptionMaxRam', defaultMaxRam)
        }
        if (inputMinRam.value == '' || parseInt(inputMinRam.value) < defaultMinRam) {
            displayStatusRam('Min. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (' + defaultMinRam + ' Mo).', 'rgb(122, 0, 0)', 'white')
        }else if (inputMaxRam.value == '' || parseInt(inputMaxRam.value) < defaultMaxRam) {
            displayStatusRam('Max. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (' + defaultMaxRam + ' Mo).', 'rgb(122, 0, 0)', 'white')
        }else{
            displayStatusRam(changeMessage, 'rgb(0, 80, 0)', 'white')
        }
    })
}


//JVM

const containerStatusJvm = document.getElementById('container-status-jvm');

storeJvm = (getJvm) => {
    const paragraphStatusJvm = document.getElementById('status-jvm');
    const closeTextStatusJvm = document.getElementById('close-status-jvm');
    
    let inputJvm = document.getElementById('jvm');
    
    let defaultJvm = [];
    
    const maxLengthJvm = 500
    
    inputJvm.value = getJvm
    
    displayStatusJvm = (value, background, color) => {
        closeStatus()
    
        containerStatusJvm.style.height = 0
        containerStatusJvm.style.opacity = 0
    
        setTimeout(() => {
            containerStatusJvm.style.height = "auto"
            containerStatusJvm.style.opacity = 1
            containerStatusJvm.style.backgroundColor = background;
        
            paragraphStatusJvm.innerHTML = value;
            paragraphStatusJvm.style.padding = '3px 8px';
            paragraphStatusJvm.style.color = color;
        
            closeTextStatusJvm.innerHTML = '×';
            closeTextStatusJvm.style.color = color;
        }, timeoutStatus);
    }
    
    if (getJvm === undefined) {
        storeSet('minecraftOptionJvm', defaultJvm)
        
        inputJvm.value = defaultJvm
    }
    
    document.getElementById('button-reset-jvm').addEventListener('click', () => {
        storeSet('minecraftOptionJvm', defaultJvm);
        inputJvm.value = defaultJvm
        displayStatusJvm(defaultValueMessage, 'rgb(197, 95, 0)', 'white')
    })
    
    document.getElementById('button-save-jvm').addEventListener('click', () => {
        storeSet('minecraftOptionJvm', [inputJvm.value]);
    
        if (inputJvm.value.length > maxLengthJvm) {
            storeSet('minecraftOptionJvm', defaultJvm);
            displayStatusJvm('Vous ne pouvez pas inscrire une valeur supérieur à ' + maxLengthJvm + ' caractères.', 'rgb(122, 0, 0)', 'white')
        }else if (inputJvm.value.length === 0) {
            storeSet('minecraftOptionJvm', defaultJvm);
            displayStatusJvm(changeMessage, 'rgb(0, 80, 0)', 'white')
        }else{
            displayStatusJvm(changeMessage, 'rgb(0, 80, 0)', 'white')
        }
    })
}


// RES

const containerStatusRes = document.getElementById('container-status-res');

storeRes = (getHeightRes, getWidthRes, getFullscreenRes) => {
    const inputHeightRes = document.getElementById('height-res');
    const inputWidthRes = document.getElementById('width-res');
    const inputFullscreenRes = document.getElementById('fullscreen-res');

    const paragraphStatusRes = document.getElementById('status-res');
    const closeTextStatusRes = document.getElementById('close-status-res');

    let defaultHeightRes = 1080;
    let defaultWidthRes = 1920;
    let defaultFullscreenRes = true;

    inputHeightRes.value = getHeightRes
    inputWidthRes.value = getWidthRes
    inputFullscreenRes.checked = getFullscreenRes
    
    displayStatusRes = (value, background, color) => {
        closeStatus()

        containerStatusRes.style.height = 0
        containerStatusRes.style.opacity = 0

        setTimeout(() => {
            containerStatusRes.style.height = "auto"
            containerStatusRes.style.opacity = 1
            containerStatusRes.style.backgroundColor = background;

            paragraphStatusRes.innerHTML = value;
            paragraphStatusRes.style.padding = '3px 8px';
            paragraphStatusRes.style.color = color;

            closeTextStatusRes.innerHTML = '×';
            closeTextStatusRes.style.color = color;
        }, timeoutStatus);
    }

    if (getHeightRes === undefined) {
        storeSet('minecraftOptionHeightRes', defaultHeightRes)
        inputHeightRes.value = defaultHeightRes
    }if (getWidthRes === undefined) {
        storeSet('minecraftOptionWidthRes', defaultWidthRes)
        inputWidthRes.value = defaultWidthRes
    }if (getFullscreenRes === undefined) {
        storeSet('minecraftOptionFullscreenRes', defaultFullscreenRes)
        inputFullscreenRes.checked = defaultFullscreenRes
    }

    document.getElementById('button-reset-res').addEventListener('click', () => {
        storeSet('minecraftOptionHeightRes', defaultHeightRes)
        storeSet('minecraftOptionWidthRes', defaultWidthRes)
        storeSet('minecraftOptionFullscreenRes', defaultFullscreenRes)
        inputHeightRes.value = defaultHeightRes
        inputWidthRes.value = defaultWidthRes
        inputFullscreenRes.checked = defaultFullscreenRes
        displayStatusRes(defaultValueMessage, 'rgb(197, 95, 0)', 'white')
    })

    document.getElementById('button-save-res').addEventListener('click', () => {
        storeSet('minecraftOptionHeightRes', Math.floor(inputHeightRes.value))
        storeSet('minecraftOptionWidthRes', Math.floor(inputWidthRes.value))
        storeSet('minecraftOptionFullscreenRes', inputFullscreenRes.checked)

        displayStatusRes(changeMessage, 'rgb(0, 80, 0)', 'white')
    })
}


// PR

displayAppdataFolders = (appdata) => {
    //resource-packs
    const rpText = document.getElementById('rp-option');
    rpText.textContent = appdata + "\\.MMLauncher\\resourcepacks"

    //shader-packs
    const spText = document.getElementById('sp-option');
    spText.textContent = appdata + "\\.MMLauncher\\shaderpacks"
}


// CLOSE STATUS

closeStatus = () => {
    containerStatusRam.style.height = 0
    containerStatusRam.style.opacity = 0

    containerStatusJvm.style.height = 0
    containerStatusJvm.style.opacity = 0
    
    containerStatusRes.style.height = 0
    containerStatusRes.style.opacity = 0
}

closeStatusElement = document.querySelectorAll('.close-status')

for (let i = 0; i < closeStatusElement.length; i++) {
    closeStatusElement[i].addEventListener('click', () => {
        closeStatus();
    })
}
