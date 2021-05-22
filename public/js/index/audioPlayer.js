let audioPlayerVolume

// get global values
getData()
function data (globalValues) {
  audioPlayerVolume = globalValues[4].defaultVolume
}

const audioPlayerContainer = document.getElementById('audio-player');
audioPlayerContainer.volume = audioPlayerVolume;
