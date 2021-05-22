// modpack links
const modpackLink = {
  advanced: "https://www.dropbox.com/s/oy7boskdvpdhyd5/clientPackage.zip?dl=1",
  normal: "https://www.dropbox.com/s/lxwwemhup0zgax3/clientPackage.zip?dl=1" 
}

// modpack consistent files
const modpackConsistentFiles = [
  "options.txt", 
  "optionsof.txt", 
  "optionsshaders.txt", 
  "usercache.json", 
  "realms_persistence.json", 
  "saves",
  "logs",
  "crash-reports",
  "screenshots", 
  "launcher_accounts.json", 
  "launcher_msa_credentials.json", 
  "launcher_profiles.json", 
  "launcher_settings.json", 
  "launcher_ui_state.json",
]

// console warning
const consoleWarning = {
  en: "DO NOT PASTE CODE/COMMANDS LINES INTO THE CONSOLE, WHOEVER ASKED YOU TO DO, IT COULD BE A MALICIOUS CODE FOR GETTING YOUR CONFIDENTIAL INFORMATION.",
  fr: "NE COPIEZ COLLEZ PAS DE CODE/LIGNES DE COMMANDES DANS LA CONSOLE, QUEL QUE SOIT LA PERSONNE VOUS AYANT DEMANDÉ DE LE FAIRE, IL POURRAIT S'AGIR DE CODE MALVEILLANT PERMETTANT DE SOUTIRRER VOS INFORMATIONS CONFIENTIELLES."
}

// minecraft options
const defaultMinecraftOpt = {
  defaultMaxRam: 3,
  defaultMinRam: 2,
  defaultHeightRes: 1080,
  defaultWidthRes: 1920,
  defaultFullscreenRes: true,
  defaultJvm: [
    "-XX:+UnlockExperimentalVMOptions",
    "-XX:+UseG1GC",
    "-XX:G1NewSizePercent=20",
    "-XX:G1ReservePercent=20",
    "-XX:MaxGCPauseMillis=50",
    "-XX:G1HeapRegionSize=32M"
  ],
  maxLengthJvm: 250
}

// typed
const typedOpt = {
  messages: [
    '"La patience mène à bien, la précipitation à rien"',
    "Promis, c'est bientôt fini :D",
    '"La patience est une médecine de la vie"',
    'Il ne reste que très peu de temps...',
    '"La patience est la force des faibles"',
    '"Qui ne se lasse point vient à bout de tout"',
    '"Petit à petit le raisin devient sucré"',
    'Nous en venons bientôt à bout...',
  ],
}

// audio player
const audioPlayer = {
  defaultVolume: 0.5
}

// global
const globalOpt = {
  timeoutStatus: 75,
  resetMessageStatus: 'Les valeurs ont été remises par défaut.',
  successMessageStatus: 'Les changements ont été pris en compte.',
  errorColorStatus: 'rgb(122, 0, 0)',
  warningColorStatus: 'rgb(197, 95, 0)',
  succedColorStatus: 'rgb(0, 80, 0)',
  textColorStatus: 'white'
}

// dynamic background
const dynamicBackground = {
  maximumBackground: 14,
  defaultBackgroundKey: -1
}

// external links
const externalLink = {
  github: "https://github.com/Alex-Pqn",
  twitter: "https://twitter.com/Sokaaaa_",
  discord: "https://discord.gg/jC4r3T9",
  java: "https://www.java.com/fr/download/"
}

// cryptr arguments
const cryptOpt = {
  chars: '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz',
  string_length: 256,
}

// authenticator
const authValidator = {
  u: {
    name: 'Votre e-mail/pseudo',
    minLength: 3,
    maxLength: 45,
  },
  p: {
    name: 'Votre mot de passe',
    minLength: 3,
    maxLength: 35,
  }
}

module.exports = { modpackLink, defaultMinecraftOpt, globalOpt, consoleWarning, audioPlayer, authValidator, dynamicBackground, externalLink, typedOpt, cryptOpt, modpackConsistentFiles };