const modsListErrorContainer = document.querySelector('#error-mods-list');

// display error mods
modsListError = () => {
  modsListErrorContainer.style.display = 'block';
};

// hide error mods
modsListFined = () => {
  modsListErrorContainer.style.display = 'none';
};

// call in preload
getModsList = (modsList) => {
  const containerList = document.querySelector(
    '.pack__content__container__mods section'
  );
  if (modsList.length < 1) {
    modsListError();
  } else {
    modsListFined();
    containerList.style.display = 'block';
    for (let i = 0; i < modsList.length; i++) {
      if (modsList[i].includes('.jar') === true) {
        const modSplit = modsList[i]
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

        const article = document.createElement('article');
        const textElement = document.createElement('p');
        const textContent = document.createTextNode(`${i} - ${modSplit}`);

        containerList.appendChild(article);
        article.appendChild(textElement);
        textElement.appendChild(textContent);
      } else {
        modsListError();
      }
    }
  }
};

// reload list button
document
  .getElementById('button-reload-mods-list')
  .addEventListener('click', () => {
    window.location.reload();
  });
