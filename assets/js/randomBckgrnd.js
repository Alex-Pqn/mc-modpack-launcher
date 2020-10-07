const backgroundKey = {
  key: -1,
};

// if background key not defined, set key
if (localStorage.getItem('backgroundKey') === null) {
  localStorage.setItem('backgroundKey', JSON.stringify(backgroundKey));
}

// if last background, reset key
else if (JSON.parse(localStorage.getItem('backgroundKey')).key === 12) {
  localStorage.setItem('backgroundKey', JSON.stringify(backgroundKey));
}

reSetKeyLocalstorage = (actualKey) => {
  const backgroundKey = {
    key: actualKey,
  };
  localStorage.setItem('backgroundKey', JSON.stringify(backgroundKey));
};

const actualKey = JSON.parse(localStorage.getItem('backgroundKey')).key + 1;
reSetKeyLocalstorage(actualKey);

document.getElementById(
  'main-container'
).style.backgroundImage = `url(../img/background${
  JSON.parse(localStorage.getItem('backgroundKey')).key
}.jpg)`;
