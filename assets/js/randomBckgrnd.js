
displayBackground = (key) => {
    document.body.style.backgroundImage = `url(../img/background` + key + `.jpg)`
}

intNumberGenerator = (key) => {
  const result = Math.floor(Math.random() * Math.floor(key));
  if (localStorage.getItem('lastBackgroundKey') === result) {
    intNumberGenerator(15)
  } else {
    localStorage.setItem('lastBackgroundKey', result)
    displayBackground(result)
  }
}

intNumberGenerator(15)