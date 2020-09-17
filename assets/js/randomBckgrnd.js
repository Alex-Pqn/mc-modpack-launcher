
displayBackground = (key) => {
    console.log(key)
    document.body.style.backgroundImage = `url(../img/background` + key + `.jpg)`
}

intNumberGenerator = (key) => {
  const result = Math.floor(Math.random() * Math.floor(key));
  displayBackground(result)
}

intNumberGenerator(3)