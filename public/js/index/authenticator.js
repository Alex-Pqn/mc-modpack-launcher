const advancedModpackLink = "https://www.dropbox.com/s/oy7boskdvpdhyd5/clientPackage.zip?dl=1"
const normalModpackLink = "https://www.dropbox.com/s/lxwwemhup0zgax3/clientPackage.zip?dl=1" 

const button = document.getElementById('submit');
const uInput = document.getElementById('u');
const pInput = document.getElementById('p');
const authRemember = document.getElementById('authRemember');
const mainNav = document.getElementById('main-nav');
const textStatus = document.getElementById('status-form');
const textInfo = document.getElementById('info-form');
const gameLaunched = document.getElementById('game-launched');

function displayAuthInformations (uDecrypted, pDecrypted) {
  uInput.setAttribute('value', uDecrypted);
  pInput.setAttribute('value', pDecrypted);
  authRemember.checked = true;
};

function displayStatusForm (statusValue, textColor, backgroundColor) {
  textStatus.innerHTML = statusValue;
  textStatus.style.color = textColor;
  textStatus.style.backgroundColor = backgroundColor;
  textStatus.style.padding = '5px';
};

function displayInfoForm (statusValue, textColor, backgroundColor) {
  textInfo.innerHTML = statusValue;
  textInfo.style.color = textColor;
  textInfo.style.backgroundColor = backgroundColor;
  textInfo.style.padding = '5px';
};

function displayPackageChoice () {
  const packageChoiceContainer = document.getElementById('package-choice');
  packageChoiceContainer.style.display = 'initial';

  button.style.display = 'none';
  uInput.disabled = true;
  pInput.disabled = true;
  authRemember.disabled = true;

  textStatus.style.display = 'none';
  textInfo.style.display = 'none';

  // advanced package choice
  document
    .getElementById('package-choice-yes')
    .addEventListener('click', () => {
      packageChoiceContainer.style.display = 'none';
      textStatus.style.display = 'initial';
      textInfo.style.display = 'initial';
      defineAdvancedPackageChoice()
      skipPackageChoice()
    });
    
  // normal package choice
  document.getElementById('package-choice-no').addEventListener('click', () => {
    packageChoiceContainer.style.display = 'none';
    textStatus.style.display = 'initial';
    textInfo.style.display = 'initial';
    defineNormalPackageChoice()
    skipPackageChoice()
  });
};

function defineNormalPackageChoice () {
  let opts = [
    {
      storeKey: "launcherModpackLink",
      storeValue: normalModpackLink
    }
  ]
  // push in electron store - call preload
  pushElectronStore(opts);
}

function defineAdvancedPackageChoice () {
  let opts = [
    {
      storeKey: "launcherModpackLink",
      storeValue: advancedModpackLink
    }
  ]
  // push in electron store - call preload
  pushElectronStore(opts);
}

function skipPackageChoice () {
  const u = uInput.value;
  const p = pInput.value;
  authSend(u, p);
};

// Store Mojang informations
function storeAuthInformations (uEncrypted, pEncrypted) {
  const auth = [
    {
      u: uEncrypted,
      p: pEncrypted,
    },
  ];
  
  let authStringify = JSON.stringify(auth)
  let opts = [
    {
      storeKey: "auth",
      storeValue: authStringify
    }
  ]
  // push in electron store
  pushElectronStore(opts)
};

function mojangLogin () {
  button.addEventListener('click', () => {
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
    
    function formValidation () {
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
            packageChoice();
          }
        }
      });
    };
    formValidation();
  });
}
mojangLogin()

// Game Launched Error
function gameLaunchedError (err) {
  console.error('Game Launched Error');
  console.error(err)

  button.style.display = 'initial';
  uInput.disabled = false;
  pInput.disabled = false;
  authRemember.disabled = false;

  gameLaunched.style.display = 'none';
  mainNav.style.display = 'initial';

  displayStatusForm(err, 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
  displayInfoForm(
    'Cette erreur peut être liée à une connexion internet défectueuse.',
    'rgb(255, 255, 255)',
    'rgba(122, 122, 122, 0.616)'
  );
};

// Mojang API Connection Succeed
function authDone () {
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

  // if remember button is checked
  if (authRemember.checked === true) {
    authEncrypt(uInput.value, pInput.value);
  } else {
    deleteElectronStore('auth')
  }
};

// Mojang API Connection Error
function authError (err) {
  console.error('Mojang Authentification Error');
  console.error(err)

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
function downloadProgress (data) {
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
function downloadFinished () {
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

function debugLogs (data) {
  const containerLogs = document.getElementById('game-launched-logs');
  const logContainer = document.createElement('article');
  const logElement = document.createElement('p');
  const logContent = document.createTextNode(data);

  containerLogs.appendChild(logContainer);
  logContainer.appendChild(logElement);
  logElement.appendChild(logContent);
};
