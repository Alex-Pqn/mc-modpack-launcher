
const backgroundKey = {
  key: -1
}

if (localStorage.getItem('backgroundKey') === null) {
  localStorage.setItem('backgroundKey', JSON.stringify(backgroundKey))
} else {
  if (JSON.parse(localStorage.getItem('backgroundKey')).key === 14) {
    localStorage.setItem('backgroundKey', JSON.stringify(backgroundKey))
  } 
}

reSetKeyLocalstorage = (actualKey) => {
  const backgroundKey = {
    key: actualKey
  }
  localStorage.setItem('backgroundKey', JSON.stringify(backgroundKey))
}

const actualKey = JSON.parse(localStorage.getItem('backgroundKey')).key + 1
reSetKeyLocalstorage(actualKey)

document.getElementById('main-container').style.backgroundImage = `url(../img/background` + JSON.parse(localStorage.getItem('backgroundKey')).key + `.jpg)`