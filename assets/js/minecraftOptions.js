
const Store = require('electron-store');
const store = new Store();

let maxRam = 6000+'M';
let minRam = 2000+'M';

store.set('minecraftOptionMaxRam', maxRam);
store.set('minecraftOptionMinRam', minRam);