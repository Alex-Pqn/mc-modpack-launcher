const githubLink = "https://github.com/Alex-Pqn"
const twitterLink = "https://twitter.com/Sokaaaa_"
const discordLink = "https://discord.gg/jC4r3T9"
const javaLink = "https://www.java.com/fr/download/"

document.getElementById('github-open-link').addEventListener('click', () => {
  openExternalLink(githubLink);
});

document.getElementById('twitter-open-link').addEventListener('click', () => {
  openExternalLink(twitterLink);
});

document.getElementById('discord-open-link').addEventListener('click', () => {
  openExternalLink(discordLink);
});

if (document.getElementById('java-open-link') !== null) {
  document.getElementById('java-open-link').addEventListener('click', () => {
    openExternalLink(javaLink);
  });
}