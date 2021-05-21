// Resolution config
const defaultHeight = 1080;
const defaultWidth = 1920;
const defaultFullscreenBoolean = true;

const containerStatusRes = document.getElementById('container-status-res');
const paragraphStatusRes = document.getElementById('status-res');
const closeTextStatusRes = document.getElementById('close-status-res');
const inputHeightRes = document.getElementById('height-res');
const inputWidthRes = document.getElementById('width-res');
const inputFullscreenRes = document.getElementById('fullscreen-res');

// display resolution - call preload
function displayResolution (height, width, fullscreenBoolean) {
  inputHeightRes.value = height;
  inputWidthRes.value = width;
  inputFullscreenRes.checked = fullscreenBoolean;
}

// save button
function saveResolution () {
  document.getElementById('button-save-res').addEventListener('click', () => {
    let height = Math.floor(inputHeightRes.value)
    let width = Math.floor(inputWidthRes.value)
    let fullscreenBoolean = inputFullscreenRes.checked
    
    storeResolution(height, width, fullscreenBoolean);
    displayStatus(changeMessage, succedColor, textColor, containerStatusRes, paragraphStatusRes, closeTextStatusRes
    );
  });
}
saveResolution()

// reset button
function resetResolution () {
  document.getElementById('button-reset-res').addEventListener('click', () => {
    storeResolution(defaultHeight, defaultWidth, defaultFullscreenBoolean);
    displayResolution(defaultHeight, defaultWidth, defaultFullscreenBoolean)
    displayStatus(defaultValueMessage, warningColor, textColor, containerStatusRes, paragraphStatusRes, closeTextStatusRes
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