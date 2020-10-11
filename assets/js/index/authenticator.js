const button = document.getElementById('submit');
const uInput = document.getElementById('u');
const pInput = document.getElementById('p');
const authRemember = document.getElementById('authRemember');
const mainNav = document.getElementById('main-nav');

const gameLaunched = document.getElementById('game-launched');

displayAuthInformations = (uDecrypted, pDecrypted) => {
  uInput.setAttribute('value', uDecrypted);
  pInput.setAttribute('value', pDecrypted);
};

displayStatusForm = (statusValue, textColor, backgroundColor) => {
  const textStatus = document.getElementById('status-form');
  textStatus.innerHTML = statusValue;
  textStatus.style.color = textColor;
  textStatus.style.backgroundColor = backgroundColor;
  textStatus.style.padding = '5px';
};

displayInfoForm = (statusValue, textColor, backgroundColor) => {
  const textInfo = document.getElementById('info-form');
  textInfo.innerHTML = statusValue;
  textInfo.style.color = textColor;
  textInfo.style.backgroundColor = backgroundColor;
  textInfo.style.padding = '5px';
};

// Store Mojang informations
authStore = (uEncrypted, pEncrypted) => {
  const auth = [
    {
      u: uEncrypted,
      p: pEncrypted,
    },
  ];
  authSetStore(auth);
};

// Get Mojang informations on page loading
getAuthStore = (auth) => {
  if (auth !== undefined) {
    authRemember.checked = true;
    const authStorage = auth;
    const uEncrypted = JSON.parse(authStorage)[0].u;
    const pEncrypted = JSON.parse(authStorage)[0].p;
    authDecrypt(uEncrypted, pEncrypted);
  }
};

// Login
button.addEventListener('click', (e) => {
  const u = uInput.value;
  const p = pInput.value;

  const argumentsList = [
    {
      value: u,
      name: 'Votre e-mail/pseudo',
      stepValidation: false,
      minLength: 3,
      maxLength: 45,
    },
    {
      value: p,
      name: 'Votre mot de passe',
      stepValidation: false,
      minLength: 3,
      maxLength: 35,
    },
  ];
  formValidation = () => {
    argumentsList.reverse().forEach((expression) => {
      if (expression.value.length < expression.minLength) {
        displayStatusForm(
          `${expression.name} doit contenir au minimum ${expression.minLength} caractères.`,
          'rgb(255, 104, 104)',
          'rgb(92, 0, 0, 0.75)'
        );
      } else if (expression.value.length > expression.maxLength) {
        displayStatusForm(
          `${expression.name} doit contenir au maximum ${expression.maxLength} caractères.`,
          'rgb(255, 104, 104)',
          'rgb(92, 0, 0, 0.75)'
        );
      } else {
        expression.stepValidation = true;
        if (
          argumentsList[0].stepValidation === true &&
          argumentsList[1].stepValidation === true
        ) {
          authSend(u, p);
        }
      }
    });
  };
  formValidation();
});

// Game Launched Error
gameLaunchedError = (data) => {
  console.error(`Game Launched Error : ${data}`);

  button.style.display = 'initial';
  uInput.disabled = false;
  pInput.disabled = false;
  authRemember.disabled = false;

  gameLaunched.style.display = 'none';
  mainNav.style.display = 'initial';

  displayStatusForm(data, 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
  displayInfoForm(
    'Cette erreur peut être liée à une connexion internet défectueuse.',
    'rgb(255, 255, 255)',
    'rgba(122, 122, 122, 0.616)'
  );
};

// Mojang API Connection Succeed
authDone = () => {
  mainNav.style.display = 'none';

  gameLaunched.style.display = 'flex';

  button.style.display = 'none';
  uInput.disabled = true;
  pInput.disabled = true;
  authRemember.disabled = true;

  displayStatusForm(
    'Connexion réussie. Téléchargement des mises à jour en cours...',
    'rgb(0, 82, 0)',
    'rgba(53, 255, 53, 0.788)'
  );
  displayInfoForm(
    'La durée de cette opération dépend de votre connexion internet.',
    'rgb(255, 255, 255)',
    'rgba(122, 122, 122, 0.616)'
  );

  if (authRemember.checked === true) {
    authEncrypt(uInput.value, pInput.value);
  } else {
    authInformationsDelete();
  }
};

// Mojang API Connection Error
authError = (data) => {
  console.error(`Mojang Authentification Error : ${data.er}`);

  button.style.display = 'initial';
  uInput.disabled = false;
  pInput.disabled = false;
  authRemember.disabled = false;

  gameLaunched.style.display = 'none';
  mainNav.style.display = 'initial';

  displayStatusForm(
    'Les identifiants de connexion Mojang sont incorrects.',
    'rgb(255, 104, 104)',
    'rgb(92, 0, 0, 0.75)'
  );
  displayInfoForm(
    "Rappel : Il est nécessaire d'être connecté à internet.",
    'rgb(255, 255, 255)',
    'rgba(122, 122, 122, 0.616)'
  );
};

// Download Modpack files progress
downloadProgress = (data) => {
  if (data.type === 'forge') {
    displayInfoForm(
      `Initialisation de forge (${data.task} / ${data.total})`,
      'rgb(255, 255, 255)',
      'rgba(122, 122, 122, 0.616)'
    );
  } else if (data.type === 'classes') {
    displayInfoForm(
      `Initialisation des classes (${data.task} / ${data.total})`,
      'rgb(255, 255, 255)',
      'rgba(122, 122, 122, 0.616)'
    );
  } else if (data.type === 'assets' || data.type === 'assets-copy') {
    displayInfoForm(
      `Initialisation des assets (${data.task} / ${data.total})`,
      'rgb(255, 255, 255)',
      'rgba(122, 122, 122, 0.616)'
    );
  } else if (data.type === 'natives') {
    displayInfoForm(
      `Vérification des natives (${data.task} / ${data.total})`,
      'rgb(255, 255, 255)',
      'rgba(122, 122, 122, 0.616)'
    );
  } else {
    displayInfoForm(
      'Finitions et lancement du jeu...',
      'rgb(0, 82, 0)',
      'rgba(53, 255, 53, 0.788)'
    );
  }
};

// Download Modpack files finished
downloadFinished = () => {
  displayStatusForm(
    'Téléchargement et installation des mises à jour terminé.',
    'rgb(0, 82, 0)',
    'rgba(53, 255, 53, 0.788)'
  );
  displayInfoForm(
    'Tentative de lancement du jeu en cours...',
    'rgb(255, 255, 255)',
    'rgba(122, 122, 122, 0.616)'
  );
};

debugLogs = (data) => {
  const containerLogs = document.getElementById('game-launched-logs');
  const logContainer = document.createElement('article');
  const logElement = document.createElement('p');
  const logContent = document.createTextNode(data);

  containerLogs.appendChild(logContainer);
  logContainer.appendChild(logElement);
  logElement.appendChild(logContent);
};
