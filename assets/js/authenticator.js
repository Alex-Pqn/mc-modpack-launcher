const ipc = require('electron').ipcRenderer

const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

const button = document.getElementById('submit');
const uInput = document.getElementById('u');
const pInput = document.getElementById('p');
const mainNav = document.getElementById('main-nav');
const gameLaunchedText = document.getElementById('game-launched');

displayAuthInformations = () => {
    const authStorage = (localStorage.getItem('auth'))
    uInput.setAttribute('value', JSON.parse(authStorage)[0].u)
}

displayStatusForm = (statusValue, textColor, backgroundColor) => {
    const textStatus = document.getElementById('status-form');
    textStatus.innerHTML = statusValue;
    textStatus.style.color = textColor;
    textStatus.style.backgroundColor = backgroundColor;
    textStatus.style.padding = "5px";
}

displayInfoForm = (statusValue, textColor, backgroundColor) => {
    const textInfo = document.getElementById('info-form');
    textInfo.innerHTML = statusValue;
    textInfo.style.color = textColor;
    textInfo.style.backgroundColor = backgroundColor;
    textInfo.style.padding = "5px";
}

authStorage = (u) => {
    const auth = [
        { 
            u: u,
        },
    ]
    localStorage.setItem('auth', JSON.stringify(auth));
};

if (localStorage.getItem('auth') === null) {
}else{
    displayAuthInformations();
}

button.addEventListener('click', e => {
    let u = uInput.value;
    let p = pInput.value;

    let argumentsList = [
        {
            value: u,
            name: 'Votre e-mail/pseudo',
            stepValidation: false,
            minLength: 3,
            maxLength: 24
        },
        {
            value: p,
            name: 'Votre mot de passe',
            stepValidation: false, 
            minLength: 5,
            maxLength: 32
        }
    ]
    formValidation = () => {
        argumentsList.reverse().forEach(expression => {
            if (expression.value.length < expression.minLength) {
                displayStatusForm(expression.name + " doit contenir au minimum " + expression.minLength + " caractères.", 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
            }
            else if (expression.value.length > expression.maxLength) {
                displayStatusForm(expression.name + " doit contenir au maximum " + expression.maxLength + " caractères.", 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
            }
            else {
                expression.stepValidation = true;
                if (argumentsList[0].stepValidation === true && argumentsList[1].stepValidation === true) {
                    ipc.send('login', { u: u, p: p })
                }
            }
        })
    }
    formValidation();
})


ipc.on('err', (data) => {
    button.style.display = 'initial';
    uInput.disabled = false;
    pInput.disabled = false;
    gameLaunchedText.style.display = 'none';
    mainNav.style.display = 'initial';
    console.error("Auth error : " + data.er);
    displayStatusForm("Les identifiants de connexion Mojang sont incorrects.", 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
  })
  
ipc.on('done', () => {
    mainNav.style.display = 'none';
    gameLaunchedText.style.display = 'block';
    button.style.display = 'none';
    uInput.disabled = true;
    pInput.disabled = true;
    displayStatusForm("Connexion réussie. Téléchargement des mises à jour en cours...", 'rgb(0, 82, 0)', 'rgba(53, 255, 53, 0.788)');
    authStorage(uInput.value);
})