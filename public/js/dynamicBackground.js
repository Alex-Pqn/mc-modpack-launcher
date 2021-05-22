let maximumBackground
let defaultBackgroundKey

// get global values
getData()
function data (globalValues) {
  maximumBackground = globalValues[6].maximumBackground
  defaultBackgroundKey = globalValues[6].defaultBackgroundKey
}

// if no background key is defined, define key
// MODIFIED WITH PORT TO 1.9.0
// ORIGINAL \/
// if (!localStorage.getItem('backgroundKey')) {
//   localStorage.setItem('backgroundKey', defaultBackgroundKey);
// }
if (!localStorage.getItem('backgroundKey') || localStorage.getItem('backgroundKey') == "NaN") {
  localStorage.setItem('backgroundKey', defaultBackgroundKey);
}

// if it's the last background, reset the background key
else if (parseFloat(localStorage.getItem('backgroundKey')) >= maximumBackground) {
  localStorage.setItem('backgroundKey', defaultBackgroundKey);
}

// store the actual background key
function storeActualBackgroundKey () {
  let actualKey = parseFloat(localStorage.getItem('backgroundKey')) + 1;
  localStorage.setItem('backgroundKey', actualKey);
};
storeActualBackgroundKey();

// display the background image
// MODIFIED WITH PORT TO 1.9.0
// ORIGINAL \/
// document.getElementById(
//   'main-container'
// ).style.backgroundImage = `url(../assets/img/background${
//   localStorage.getItem('backgroundKey')
// }.png)`;
if (localStorage.getItem('backgroundKey') == "NaN") {
  document.getElementById(
    'main-container'
  ).style.backgroundImage = `url(../assets/img/background0.png)`;
}else {
  document.getElementById(
    'main-container'
  ).style.backgroundImage = `url(../assets/img/background${
    localStorage.getItem('backgroundKey')
  }.png)`;
}