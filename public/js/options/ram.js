// RAM config

let defaultMaxRam;
let defaultMinRam;

// get global values
getData()
function data (globalValues) {
  defaultMinRam = globalValues[1].defaultMinRam
  defaultMaxRam = globalValues[1].defaultMaxRam
}

const containerStatusRam = document.getElementById('container-status-ram');
const paragraphStatusRam = document.getElementById('status-ram');
const closeTextStatusRam = document.getElementById('close-status-ram');
const inputMinRam = document.getElementById('min-ram');
const inputMaxRam = document.getElementById('max-ram');

// display ram - call preload
function displayRam (minRam, maxRam) {
  inputMinRam.value = minRam;
  inputMaxRam.value = maxRam;
};

// save button
function saveRam () {
  document.getElementById('button-save-ram').addEventListener('click', () => {
    if (
      parseInt(inputMinRam.value) >= defaultMinRam && 
      parseInt(inputMaxRam.value) >= defaultMaxRam) 
      {
      let minRam = Math.floor(inputMinRam.value)
      let maxRam = Math.floor(inputMaxRam.value)
      
      storeRam(minRam, maxRam)
      displayStatus(successMessage, succedColor, textColor, containerStatusRam, paragraphStatusRam, closeTextStatusRam);
      
    } else {
      displayStatus(`Vous ne pouvez pas inscrire de valeurs inférieures à celles par défaut.`, errorColor, textColor, containerStatusRam, paragraphStatusRam, closeTextStatusRam);
    }
  });
}
saveRam()

// reset button
function resetRam () {
  document.getElementById('button-reset-ram').addEventListener('click', () => {
    storeRam(defaultMinRam, defaultMaxRam)
    displayRam(defaultMinRam, defaultMaxRam)
    displayStatus(resetMessageStatus, warningColor, textColor, containerStatusRam, paragraphStatusRam, closeTextStatusRam);
  });
} 
resetRam()

// call in preload
function storeRam (minRam, maxRam) {
  let opts = [
    {
      storeKey: "minecraftOptionMinRam",
      storeValue: minRam
    },
    {
      storeKey: "minecraftOptionMaxRam",
      storeValue: maxRam
    },
  ]
  // push in electron store - call preload
  pushElectronStore(opts);
};