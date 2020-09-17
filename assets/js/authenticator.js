const ipc = require('electron').ipcRenderer

const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

let username;
let password;

const button = document.getElementById('submit');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');

displayAuthInformations = () => {
    const authStorage = (localStorage.getItem('auth'))
    usernameInput.setAttribute('value', JSON.parse(authStorage)[0].u)
    passwordInput.setAttribute('value', JSON.parse(authStorage)[1].p)
}

displayStatusFormOne = (statusValue, textColor, backgroundColor) => {
    const textStatusOne = document.getElementById('status-form-one');
    textStatusOne.innerHTML = statusValue;
    textStatusOne.style.color = textColor;
    textStatusOne.style.backgroundColor = backgroundColor;
    textStatusOne.style.padding = "5px";
}

displayStatusFormTwo = (statusValue, textColor, backgroundColor) => {
    const textStatusTwo = document.getElementById('status-form-two');
    textStatusTwo.innerHTML = statusValue;
    textStatusTwo.style.color = textColor;
    textStatusTwo.style.backgroundColor = backgroundColor;
    textStatusTwo.style.padding = "5px";
}

authStorage = (u, p) => {
    const auth = [
        { u: u },
        { p: p }
    ]
    localStorage.setItem('auth', JSON.stringify(auth));
};

if (localStorage.getItem('auth') === null) {
}else{
    displayAuthInformations();
}

button.addEventListener('click', e => {
    username = usernameInput.value;
    password = passwordInput.value;

    let argumentsList = [
        {
            value: username,
            name: 'Votre e-mail/pseudo',
            stepValidation: false,
            minLength: 3,
            maxLength: 24
        },
        {
            value: password,
            name: 'Votre mot de passe',
            stepValidation: false, 
            minLength: 5,
            maxLength: 32
        }
    ]
    formValidation = () => {
        argumentsList.forEach(expression => {
            if (expression.value.length < expression.minLength) {
                displayStatusFormOne(expression.name + " doit contenir au minimum " + expression.minLength + " caractères.", 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
            }
            else if (expression.value.length > expression.maxLength) {
                displayStatusFormOne(expression.name + " doit contenir au maximum " + expression.maxLength + " caractères.", 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
            }
            else {
                expression.stepValidation = true;
                if (argumentsList[0].stepValidation === true && argumentsList[1].stepValidation === true) {
                    ipc.send('login', { u: username, p: password })
                }
            }
        })
    }
    formValidation();
})


ipc.on('err', (data) => {
    button.style.display = 'initial';
    usernameInput.disabled = false;
    passwordInput.disabled = false;
    console.error("Auth error : " + data.er);
    displayStatusFormOne("Les identifiants de connexion Mojang sont incorrects.", 'rgb(255, 104, 104)', 'rgb(92, 0, 0, 0.75)');
  })
  
ipc.on('done', () => {
    button.style.display = 'none';
    usernameInput.disabled = true;
    passwordInput.disabled = true;
    displayStatusFormOne("Connexion réussie. Téléchargement des mises à jour en cours...", 'rgb(0, 82, 0)', 'rgba(53, 255, 53, 0.788)');
    authStorage(username, password);
})