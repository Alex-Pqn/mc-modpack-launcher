const ipc = require('electron').ipcRenderer
const { Client, Authenticator } = require('minecraft-launcher-core');
const launcher = new Client();

const button = document.getElementById('submit');
const textError = document.getElementById('error-form');

button.addEventListener('click', e => {
    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    let expressionsList = [];

    let argumentsList = [
        {
            value: username, 
            name: 'Votre e-mail/pseudo',
            box: '',
            stepValidation: false, 
            regexEmail: false,
            minLength: 3,
            maxLength: 24
        },
        {
            value: password, 
            name: 'Votre mot de passe',
            box: '',
            stepValidation: false, 
            minLength: 3,
            maxLength: 32
        }
    ]

    displayErrorForm = (errorValue) => {
        textError.innerHTML = errorValue;
    }

    formExpressionValidation = (value) => {
        let expressionValidation = {
            regexEmail : /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/,
        }
        expressionsList = {
            regexEmail : expressionValidation.regexEmail.test(value),
        };
    }

    formValidation = () => {
        argumentsList.forEach(expression => { 
            formExpressionValidation(expression.value)
            if (expression.value.length < expression.minLength) {
                displayErrorForm(expression.name + " doit contenir au minimum " + expression.minLength + " caractères.");
            }
            else if (expression.value.length > expression.maxLength) {
                displayErrorForm(expression.name + " doit contenir au maximum " + expression.maxLength + " caractères.");
            }
            else if (expressionsList.regexEmail === expression.regexEmail) {
                displayErrorForm("L'e-mail/pseudo entré est invalide, veillez à bien l'orthographier.");
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
    console.error("Error during authentification : "+ data.er)
    textError.innerHTML = "Les identifiants de connexion sont incorrects."
})

ipc.on('done', () => {
})