function displayDynamicCopyright () {
  const copyrightContainer = document.querySelectorAll('.dynamic-copyright')

  for(let i = 0; i < copyrightContainer.length; i++) {
    copyrightContainer[i].textContent = `© ${new Date().getFullYear()}-${new Date().getFullYear() + 1} Alex-Pqn`
  }
}
displayDynamicCopyright()