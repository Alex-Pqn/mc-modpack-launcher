// GLOBAL
const timeoutStatus = 75;
const defaultValueMessage = 'Les valeurs ont été remises par défaut.';
const changeMessage = 'Les changements ont été pris en compte.';
const errorColor = 'rgb(122, 0, 0)';
const warningColor = 'rgb(197, 95, 0)';
const succedColor = 'rgb(0, 80, 0)';
const textColor = 'white';

// call in options files
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