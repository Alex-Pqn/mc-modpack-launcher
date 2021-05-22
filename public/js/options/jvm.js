// JVM config

let defaultJvm
let maxLengthJvm

// get global values
getData()
function data (globalValues) {
  defaultJvm = globalValues[1].defaultJvm
  maxLengthJvm = globalValues[1].maxLengthJvm
}

const containerStatusJvm = document.getElementById('container-status-jvm');
const paragraphStatusJvm = document.getElementById('status-jvm');
const closeTextStatusJvm = document.getElementById('close-status-jvm');
const inputJvm = document.getElementById('jvm');

// display jvm - call preload
function displayJvm (jvm) {
  inputJvm.value = jvm;
} 

// reset button
function resetJvm () {
  document.getElementById('button-reset-jvm').addEventListener('click', () => {
    storeJvm(defaultJvm);
    displayJvm(defaultJvm)
    displayStatus(resetMessageStatus, warningColor, textColor, containerStatusJvm, paragraphStatusJvm, closeTextStatusJvm);
  });
}
resetJvm()

// save button
function saveJvm () {
  document.getElementById('button-save-jvm').addEventListener('click', () => {
    if (inputJvm.value.length > maxLengthJvm) {
      displayStatus(`Vous ne pouvez pas inscrire une valeur supérieur à ${maxLengthJvm} caractères.`, errorColor, textColor, containerStatusJvm, paragraphStatusJvm, closeTextStatusJvm);
    } else {
      storeJvm(inputJvm.value);
      displayStatus(successMessage, succedColor, textColor, containerStatusJvm, paragraphStatusJvm, closeTextStatusJvm);
    }
  });
}
saveJvm()

// store jvm in electron store
function storeJvm (jvm) {
  let opts = [
    {
      storeKey: "minecraftOptionJvm",
      storeValue: jvm
    },
  ]
  // push in electron store - call preload
  pushElectronStore(opts);
}