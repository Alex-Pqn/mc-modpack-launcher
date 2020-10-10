document.getElementById('github-open-link').addEventListener('click', () => {
  openExternalLink('https://github.com/Alex-Pqn');
});

document.getElementById('twitter-open-link').addEventListener('click', () => {
  openExternalLink('https://twitter.com/Sokaaaa_');
});

document.getElementById('discord-open-link').addEventListener('click', () => {
  openExternalLink('https://discord.gg/jC4r3T9');
});

if (document.getElementById('discord-community-open-link') !== null) {
  document.getElementById('discord-community-open-link').addEventListener('click', () => {
    openExternalLink('https://discord.gg/jolate');
  });
}

if (document.getElementById('java-open-link') !== null) {
  document.getElementById('java-open-link').addEventListener('click', () => {
    openExternalLink('https://www.java.com/fr/download/');
  });
}