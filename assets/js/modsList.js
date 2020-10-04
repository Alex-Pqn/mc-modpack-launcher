const modsListErrorContainer = document.querySelector('#error-mods-list');

// display error mods
modsListError = () => {
  modsListErrorContainer.style.display = 'block';
};

// hide error mods
modsListFined = () => {
  modsListErrorContainer.style.display = 'none';
};

getModsList = (modsList) => {
  const containerList = document.querySelector(
    '.modspr__content__container__mods section'
  );
  if (modsList.length < 1) {
    modsListError();
  } else {
    modsListFined();
    containerList.style.display = 'block';
    for (let i = 1; i < modsList.length; i++) {
      modSplitOne = modsList[i].split('-').join(' ');
      modSplitTwo = modSplitOne.split('.jar').join('');
      modSplitThree = modSplitTwo.split('universal').join('');
      modSplitFour = modSplitThree.split('+').join(' ');
      modSplitFive = modSplitFour.split('_').join(' ');
      modSplitSix = modSplitFive.split('[').join(' ');
      modSplitSeven = modSplitSix.split(']').join(' ');
      const article = document.createElement('article');
      const textElement = document.createElement('p');
      const textContent = document.createTextNode(`${i} - ${modSplitSeven}`);

      containerList.appendChild(article);
      article.appendChild(textElement);
      textElement.appendChild(textContent);
    }
  }
};

// reload list button
document
  .getElementById('button-reload-mods-list')
  .addEventListener('click', () => {
    window.location.reload();
  });
