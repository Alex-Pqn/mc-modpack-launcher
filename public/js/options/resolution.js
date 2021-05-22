// Resolution config
let defaultHeight
let defaultWidth
let defaultFullscreenBoolean

// get global values
getData()
function data (globalValues) {
  defaultHeight = globalValues[1].defaultHeightRes
  defaultWidth = globalValues[1].defaultWidthRes
  defaultFullscreenBoolean = globalValues[1].defaultFullscreenRes
}

const containerStatusRes = document.getElementById('container-status-res');
const paragraphStatusRes = document.getElementById('status-res');
const closeTextStatusRes = document.getElementById('close-status-res');
const inputHeightRes = document.getElementById('height-res');
const inputWidthRes = document.getElementById('width-res');
const inputFullscreen = document.getElementById('fullscreen-res');

// display resolution - call preload
function displayResolution (height, width, fullscreenBoolean) {
  inputHeightRes.value = height;
  inputWidthRes.value = width;
  inputFullscreen.checked = fullscreenBoolean;
}

// save button
function saveResolution () {
  document.getElementById('button-save-res').addEventListener('click', () => {
    let height = Math.floor(inputHeightRes.value)
    let width = Math.floor(inputWidthRes.value)
    let fullscreenBoolean = inputFullscreen.checked
    
    storeResolution(height, width, fullscreenBoolean);
    displayStatus(successMessage, succedColor, textColor, containerStatusRes, paragraphStatusRes, closeTextStatusRes
    );
  });
}
saveResolution()

// reset button
function resetResolution () {
  document.getElementById('button-reset-res').addEventListener('click', () => {
    storeResolution(defaultHeight, defaultWidth, defaultFullscreenBoolean);
    displayResolution(defaultHeight, defaultWidth, defaultFullscreenBoolean)
    displayStatus(resetMessageStatus, warningColor, textColor, containerStatusRes, paragraphStatusRes, closeTextStatusRes
    );
  });
}
resetResolution()

// store resolution in electron store
function storeResolution (heightResolution, widthResolution, fullscreenBoolean) {
  let opts = [
    {
      storeKey: "minecraftOptionHeightRes",
      storeValue: heightResolution
    },
    {
      storeKey: "minecraftOptionWidthRes",
      storeValue: widthResolution
    },
    {
      storeKey: "minecraftOptionFullscreenBoolean",
      storeValue: fullscreenBoolean
    }
  ]
  // push in electron store - call preload
  pushElectronStore(opts);
}