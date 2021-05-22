// Gloval config

let timeoutStatus
let resetMessageStatus
let successMessage
let errorColor
let warningColor
let succedColor
let textColor

// get global values
getData()
function data (globalValues) {
  timeoutStatus = globalValues[2].timeoutStatus
  resetMessageStatus = globalValues[2].resetMessageStatus
  successMessage = globalValues[2].successMessageStatus
  errorColor = globalValues[2].errorColorStatus
  warningColor = globalValues[2].warningColorStatus
  succedColor = globalValues[2].succedColorStatus
  textColor = globalValues[2].textColorStatus
}

function displayStatus (message, background, color, container, paragraph, closeText) {
  closeStatus();
  setTimeout(() => {
    container.style.height = 'auto';
    container.style.opacity = 1;
    container.style.backgroundColor = background;

    paragraph.innerHTML = message;
    paragraph.style.padding = '3px 8px';
    paragraph.style.color = color;

    closeText.innerHTML = '×';
    closeText.style.color = color;
  }, timeoutStatus);
};

// close status on click "x"
function closeStatus () {
  // ram
  containerStatusRam.style.height = 0;
  containerStatusRam.style.opacity = 0;
  // jvm
  containerStatusJvm.style.height = 0;
  containerStatusJvm.style.opacity = 0;
  // res
  containerStatusRes.style.height = 0;
  containerStatusRes.style.opacity = 0;
  // launcher-options
  containerStatusLauncherOptions.style.height = 0;
  containerStatusLauncherOptions.style.opacity = 0;
};

const closeStatusElement = document.querySelectorAll('.close-status');
for (let i = 0; i < closeStatusElement.length; i++) {
  closeStatusElement[i].addEventListener('click', () => {
    closeStatus();
  });
}