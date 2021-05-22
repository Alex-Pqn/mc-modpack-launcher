let messageEN
let messageFR

// get global values
getData()
function data (globalValues) {
  messageEN = globalValues[3].en
  messageFR = globalValues[3].fr
}

console.error(messageEN);
console.error(messageFR);