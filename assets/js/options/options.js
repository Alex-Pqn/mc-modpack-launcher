// GLOBAL
const timeoutStatus = 75;
const defaultValueMessage = 'Les valeurs ont été remises par défaut.';
const changeMessage = 'Les changements ont été pris en compte.';
const errorColor = 'rgb(122, 0, 0)';
const warningColor = 'rgb(197, 95, 0)';
const succedColor = 'rgb(0, 80, 0)';
const textColor = 'white';

displayStatus = (value, background, color, container, paragraph, closeText) => {
  closeStatus();
  container.style.height = 0;
  container.style.opacity = 0;
  setTimeout(() => {
    container.style.height = 'auto';
    container.style.opacity = 1;
    container.style.backgroundColor = background;

    paragraph.innerHTML = value;
    paragraph.style.padding = '3px 8px';
    paragraph.style.color = color;

    closeText.innerHTML = '×';
    closeText.style.color = color;
  }, timeoutStatus);
};

// Minecraft Options : RAM
const containerStatusRam = document.getElementById('container-status-ram');
const paragraphStatusRam = document.getElementById('status-ram');
const closeTextStatusRam = document.getElementById('close-status-ram');

// call in preload
storeRam = (getMinRam, getMaxRam) => {
  const inputMinRam = document.getElementById('min-ram');
  const inputMaxRam = document.getElementById('max-ram');
  const defaultMaxRam = 3584;
  const defaultMinRam = 2048;
  inputMinRam.value = getMinRam;
  inputMaxRam.value = getMaxRam;

  // button reset ram
  document.getElementById('button-reset-ram').addEventListener('click', () => {
    storeSet('minecraftOptionMinRam', defaultMinRam);
    storeSet('minecraftOptionMaxRam', defaultMaxRam);
    inputMinRam.value = defaultMinRam;
    inputMaxRam.value = defaultMaxRam;
    displayStatus(
      defaultValueMessage,
      warningColor,
      textColor,
      containerStatusRam,
      paragraphStatusRam,
      closeTextStatusRam
    );
  });

  // button save ram
  document.getElementById('button-save-ram').addEventListener('click', () => {
    // store values
    if (
      inputMinRam.value == '' ||
      parseInt(inputMinRam.value) > defaultMinRam
    ) {
      storeSet('minecraftOptionMinRam', Math.floor(inputMinRam.value));
    }
    if (
      inputMaxRam.value == '' ||
      parseInt(inputMaxRam.value) > defaultMaxRam
    ) {
      storeSet('minecraftOptionMaxRam', Math.floor(inputMaxRam.value));
    }
    // display status
    if (
      inputMinRam.value == '' ||
      parseInt(inputMinRam.value) < defaultMinRam
    ) {
      displayStatus(
        `Min. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (${defaultMinRam} Mo).`,
        errorColor,
        textColor,
        containerStatusRam,
        paragraphStatusRam,
        closeTextStatusRam
      );
    } else if (
      inputMaxRam.value == '' ||
      parseInt(inputMaxRam.value) < defaultMaxRam
    ) {
      displayStatus(
        `Max. | Vous ne pouvez pas inscrire une valeur inférieure à celle par défaut (${defaultMaxRam} Mo).`,
        errorColor,
        textColor,
        containerStatusRam,
        paragraphStatusRam,
        closeTextStatusRam
      );
    } else {
      displayStatus(
        changeMessage,
        succedColor,
        textColor,
        containerStatusRam,
        paragraphStatusRam,
        closeTextStatusRam
      );
    }
  });
};

// Minecraft Options : JVM
const containerStatusJvm = document.getElementById('container-status-jvm');
const paragraphStatusJvm = document.getElementById('status-jvm');
const closeTextStatusJvm = document.getElementById('close-status-jvm');

// call in preload
storeJvm = (getJvm) => {
  const inputJvm = document.getElementById('jvm');
  inputJvm.value = getJvm;
  const defaultJvm = [];
  const maxLengthJvm = 500;

  // button reset jvm
  document.getElementById('button-reset-jvm').addEventListener('click', () => {
    storeSet('minecraftOptionJvm', defaultJvm);
    inputJvm.value = defaultJvm;
    displayStatus(
      defaultValueMessage,
      warningColor,
      textColor,
      containerStatusJvm,
      paragraphStatusJvm,
      closeTextStatusJvm
    );
  });

  // button save jvm
  document.getElementById('button-save-jvm').addEventListener('click', () => {
    // display status & saves values
    if (inputJvm.value.length > maxLengthJvm) {
      displayStatus(
        `Vous ne pouvez pas inscrire une valeur supérieur à ${maxLengthJvm} caractères.`,
        errorColor,
        textColor,
        containerStatusJvm,
        paragraphStatusJvm,
        closeTextStatusJvm
      );
    } else if (inputJvm.value.length === 0) {
      storeSet('minecraftOptionJvm', defaultJvm);
      displayStatus(
        changeMessage,
        succedColor,
        textColor,
        containerStatusJvm,
        paragraphStatusJvm,
        closeTextStatusJvm
      );
    } else {
      storeSet('minecraftOptionJvm', [inputJvm.value]);
      displayStatus(
        changeMessage,
        succedColor,
        textColor,
        containerStatusJvm,
        paragraphStatusJvm,
        closeTextStatusJvm
      );
    }
  });
};

// Minecraft Options : RES
const containerStatusRes = document.getElementById('container-status-res');
const paragraphStatusRes = document.getElementById('status-res');
const closeTextStatusRes = document.getElementById('close-status-res');

// call in preload
storeRes = (getHeightRes, getWidthRes, getFullscreenRes) => {
  const inputHeightRes = document.getElementById('height-res');
  const inputWidthRes = document.getElementById('width-res');
  const inputFullscreenRes = document.getElementById('fullscreen-res');
  const defaultHeightRes = 1080;
  const defaultWidthRes = 1920;
  const defaultFullscreenRes = true;
  inputHeightRes.value = getHeightRes;
  inputWidthRes.value = getWidthRes;
  inputFullscreenRes.checked = getFullscreenRes;

  // button reset res
  document.getElementById('button-reset-res').addEventListener('click', () => {
    storeSet('minecraftOptionHeightRes', defaultHeightRes);
    storeSet('minecraftOptionWidthRes', defaultWidthRes);
    storeSet('minecraftOptionFullscreenRes', defaultFullscreenRes);
    inputHeightRes.value = defaultHeightRes;
    inputWidthRes.value = defaultWidthRes;
    inputFullscreenRes.checked = defaultFullscreenRes;
    displayStatus(
      defaultValueMessage,
      warningColor,
      textColor,
      containerStatusRes,
      paragraphStatusRes,
      closeTextStatusRes
    );
  });

  // button save res
  document.getElementById('button-save-res').addEventListener('click', () => {
    // store values
    storeSet('minecraftOptionHeightRes', Math.floor(inputHeightRes.value));
    storeSet('minecraftOptionWidthRes', Math.floor(inputWidthRes.value));
    storeSet('minecraftOptionFullscreenRes', inputFullscreenRes.checked);
    // display status
    displayStatus(
      changeMessage,
      succedColor,
      textColor,
      containerStatusRes,
      paragraphStatusRes,
      closeTextStatusRes
    );
  });
};

// Launcher Options
const containerStatusLauncherOptions = document.getElementById(
  'container-status-launcher-options'
);
const paragraphStatusLauncherOptions = document.getElementById(
  'status-launcher-options'
);
const closeTextStatusLauncherOptions = document.getElementById(
  'close-status-launcher-options'
);

updateAvailable = () => {
  displayStatus(
    'Une mise à jour a été détectée. Lancement du processus de téléchargement en cours.',
    succedColor,
    textColor,
    containerStatusLauncherOptions,
    paragraphStatusLauncherOptions,
    closeTextStatusLauncherOptions
  );
};
NoUpdateAvailable = () => {
  displayStatus(
    "Après vérification, aucune nouvelle mise à jour n'est disponible.",
    warningColor,
    textColor,
    containerStatusLauncherOptions,
    paragraphStatusLauncherOptions,
    closeTextStatusLauncherOptions
  );
};
updateError = () => {
  displayStatus(
    'Erreur lors de la vérification des mises à jour.',
    errorColor,
    textColor,
    containerStatusLauncherOptions,
    paragraphStatusLauncherOptions,
    closeTextStatusLauncherOptions
  );
};

// call in preload
launcherOptions = (appdata) => {
  // update
  document
    .getElementById('button-update-launcherOptions')
    .addEventListener('click', () => {
      checkUpdate();
    });
  // cache
  document
    .getElementById('button-cache-launcherOptions')
    .addEventListener('click', () => {
      openFolder(`${appdata}\\mmlauncher`);
    });
  // debugging mode
  document
    .getElementById('button-debugging-launcherOptions')
    .addEventListener('click', () => {
      setStoreDebuggingMode();
      displayStatus(
        'Le mode de débogage a été activé. Il prendra seulement effet lors du prochain redémarrage.',
        succedColor,
        textColor,
        containerStatusLauncherOptions,
        paragraphStatusLauncherOptions,
        closeTextStatusLauncherOptions
      );
    });
};

// Close status on click "x"
const closeStatusElement = document.querySelectorAll('.close-status');

closeStatus = () => {
  // ram
  containerStatusRam.style.height = 0;
  containerStatusRam.style.opacity = 0;
  // jvm
  containerStatusJvm.style.height = 0;
  containerStatusJvm.style.opacity = 0;
  // res
  containerStatusRes.style.height = 0;
  containerStatusRes.style.opacity = 0;
  // launcher options
  containerStatusLauncherOptions.style.height = 0;
  containerStatusLauncherOptions.style.opacity = 0;
};

for (let i = 0; i < closeStatusElement.length; i++) {
  closeStatusElement[i].addEventListener('click', () => {
    closeStatus();
  });
}
