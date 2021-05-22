let githubLink
let twitterLink
let discordLink
let javaLink

// get global values
getData()
function data (globalValues) {
  githubLink = globalValues[7].github
  twitterLink = globalValues[7].twitter
  discordLink = globalValues[7].discord
  javaLink = globalValues[7].java
}

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