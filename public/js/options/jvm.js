// JVM config
const defaultJvm = [
  "-XX:+UnlockExperimentalVMOptions",
  "-XX:+UseG1GC",
  "-XX:G1NewSizePercent=20",
  "-XX:G1ReservePercent=20",
  "-XX:MaxGCPauseMillis=50",
  "-XX:G1HeapRegionSize=32M"
];
const maxLengthJvm = 350;

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
    displayStatus(defaultValueMessage, warningColor, textColor, containerStatusJvm, paragraphStatusJvm, closeTextStatusJvm);
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
      displayStatus(changeMessage, succedColor, textColor, containerStatusJvm, paragraphStatusJvm, closeTextStatusJvm);
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