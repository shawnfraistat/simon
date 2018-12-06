'use strict'

// use require with a reference to bundle the file and use it in this file
// const example = require('./example')

// use require without a reference to ensure a file is bundled
// require('./example')

const main = require('./main.js')

$(() => {
  document.getElementById('start').addEventListener('click', main.takeTurn)
  document.getElementById('start').addEventListener('click', main.resetMessage)
})
