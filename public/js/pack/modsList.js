const containerList = document.querySelector('.pack__content__container__mods section');
const modsListErrorContainer = document.querySelector('#error-mods-list');

// display mods list - call in preload
function displayModsList (modsList) {
  if (modsList && modsList.length > 0) {
    modsListFined();
    
    modsList.forEach((mod, index) => {
      if(mod.includes('.jar') === true) {
        
        // text form
        let modSplit = mod
        .split('-')
        .join(' ')
        .split('.jar')
        .join('')
        .split('universal')
        .join('')
        .split('+')
        .join(' ')
        .split('_')
        .join(' ')
        .split('[')
        .join(' ')
        .split(']')
        .join(' ');
        
        createModTemplate(index, modSplit)
      }
    });
  } else {
    modsListError();
  }
};

// create mod template
function createModTemplate (index, modName) {
  const article = document.createElement('article');
  const textElement = document.createElement('p');
  const textContent = document.createTextNode(`${index + 1} - ${modName}`);
  
  containerList.appendChild(article);
  article.appendChild(textElement);
  textElement.appendChild(textContent);
}

// reload mods list
function reloadList () {
  document
  .getElementById('button-reload-mods-list')
  .addEventListener('click', () => {
    window.location.reload();
  });
}
reloadList()

// display error
function modsListError () {
  modsListErrorContainer.style.display = 'block';
};

// display mods list & hide error
function modsListFined () {
  containerList.style.display = 'block';
};
