
const { remote } = require('electron');
var win = remote.getCurrentWindow();

document.getElementById('minimize').addEventListener('click', function() {
    win.minimize();
})

document.getElementById('maximize').addEventListener('click', function() {
    if(win.isMaximized()){
        win.unmaximize();
    }else{
        win.maximize();
    }
})

document.getElementById('close').addEventListener('click', function() {
    win.close();
})