let messages

// get global values
getData()
function data (globalValues) {
  messages = globalValues[8].messages
}

new Typed('#typed-info', {
  strings: messages,
  typeSpeed: 60,
  backSpeed: 30,
  backDelay: 7500,
  loop: true,
  showCursor: false,
  smartBackspace: false,
  shuffle: true,
});

new Typed('#typed-status', {
  strings: ['. . . . . . . .'],
  typeSpeed: 80,
  backSpeed: 80,
  backDelay: 0,
  loop: true,
  showCursor: false,
});
