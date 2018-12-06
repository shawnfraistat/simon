// main.js

let numberOfColors = 3 // default numberOfColors to play the first turn; increases by one each round
const thisTurnArray = [] // array that holds the colors "Simon" will play in a given round
const playersTurnArray = [] // array that holds the colors the player has clicked on in a given round
let time = 0 // a global timing variable used to display the button animations properly in the right sequence

// playSound() is called with an argument (x); it plays a different sound depending on the value of x
const playSound = function (x) {
  switch (x) {
    case 0: // green sound
      document.getElementById('greensound').play()
			break
		case 1: // red sound
			document.getElementById('redsound').play()
			break
		case 2: // yellow sound
			document.getElementById('yellowsound').play()
			break
		case 3: // blue sound
			document.getElementById('bluesound').play()
			break
		case 4: // lose sound
			document.getElementById('losesound').play()
			break;
		case 5: // win sound
			document.getElementById('winsound').play()
			break
	}
}

// playerMove() when the player clicks on a color button
// It adds that color to the array playersTurnArray, which keeps track of what the player's played this round.
// It then calls scorePlayer() to check whether the player's made a wrong move and whether s/he's finished the sequence for this round.
const playerMove = function () {
	const buttonClicked = this.id
	time = 0
	switch (buttonClicked) {
		case 'green':
			playersTurnArray.push(0)
			playThisColor(0)
			break
		case 'red':
			playersTurnArray.push(1)
			playThisColor(1)
			break
		case 'yellow':
			playersTurnArray.push(2)
			playThisColor(2)
			break
		case 'blue':
			playersTurnArray.push(3)
			playThisColor(3)
			break
	}
	scorePlayer()
}

// resetMessage() is called to clear the message text ("You won!", "You lost!", etc.) that displays beneath the game board.
const resetMessage = function () {
	document.getElementById('message').innerHTML = ''
}

// scorePlayer() scores the player's move by comparing it to thisTurnArray. If the player's move doesn't match the color played, s/he loses.
// If the player's move does match, check to see if the player's completed the whole sequence. If so, the player wins. If not, the game continues.
const scorePlayer = function () {
  let checked = false
	for (let i = 0; i < playersTurnArray.length; i++) {
		if (playersTurnArray[i] !== thisTurnArray[i]) {
			setTimeout(function () { document.getElementById('message').innerHTML = 'You lost! Press START button to play again.' }, 1000)
			setTimeout(function () { playSound(4) }, 1000)
			checked = false
			resetGame()
			break
		} else {
		checked = true
		}
	}
	if ((playersTurnArray.length === thisTurnArray.length) && (checked === true) && (numberOfColors < 6)) {
		document.getElementById('message').innerHTML = 'You passed Round ' + (numberOfColors - 2) + '!'
		setTimeout(function () { continueGame() }, 1000)
	}
	if ((playersTurnArray.length === thisTurnArray.length) && (checked === true) && (numberOfColors === 6)) {
		setTimeout(function () { document.getElementById('message').innerHTML = 'You win!' }, 1000)
		setTimeout(function () { playSound(5) }, 1000)
		resetGame()
	}
}

// continueGame() runs every time the player successfully completes a round of play.
// It resets playersTurnArray so that the player can enter colors again on the next round.
// It also increments numberOfColors, so that "Simon" will add one more color to the sequence the player has to repeat.
const continueGame = function () {
	while (playersTurnArray.length > 0) {
		playersTurnArray.pop()
	}
	const buttons = document.getElementsByClassName('colorbutton')
	for (let k = 0; k < buttons.length; k++) { // stops the player from clicking during "Simon's" turn
		buttons[k].removeEventListener('click', playerMove)
	}
	numberOfColors++
	takeTurn()
}


// If the game ends, resetGame() resets numberOfColors, thisTurnArray, and playersTurnArray so the player can start a new game afresh.
const resetGame = function () {
	numberOfColors = 3
	while (playersTurnArray.length > 0) {
		playersTurnArray.pop()
	}
	while (thisTurnArray.length > 0) {
		thisTurnArray.pop()
	}
	const buttons = document.getElementsByClassName('colorbutton')
	for (let k = 0; k < buttons.length; k++) {
		buttons[k].removeEventListener('click', playerMove)
	}
}


// getColorsThisTurn() builds an array called thisTurnArray that contains a list of random numbers, which is numberOfColors in length.
// The random number values are between 0 and 3. Each value represents one of the four colors.
const getColorsThisTurn = function () {
	while (thisTurnArray.length < numberOfColors) {
			var randomNumber = Math.floor(Math.random() * 4)
			thisTurnArray.push(randomNumber)
	}
}

// flashColor() is called with an argument (x), and it makes the corresponding color flash white.
// The method used here--incrementing "colorToFlash.style.animationIterationCount"--was chosen because otherwise
// colors weren't flashing properly if they were supposed to play twice in a row.
const flashColor = function (x) {
	switch(x) {
		case 0:
			let colorToFlash = document.getElementById('green')
			setTimeout(function () { colorToFlash.classList.add('active') }, time)
			colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount + 1
			break
		case 1:
			colorToFlash = document.getElementById('red')
			setTimeout(function () { colorToFlash.classList.add('active') }, time)
			colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount + 1
			break
		case 2:
			colorToFlash = document.getElementById('yellow')
			setTimeout(function () { colorToFlash.classList.add('active') }, time)
			colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount + 1
			break
		case 3:
			colorToFlash = document.getElementById('blue')
	 		setTimeout(function () { colorToFlash.classList.add('active') }, time)
	 		colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount + 1
	}
}

// returnColor() receives an argument (x), and it clears the corresponding color so that it's ready to be flashed again if needed.
const returnColor = function (x) {
	switch(x) {
		case 0:
			let colorToFlash = document.getElementById('green')
			colorToFlash.classList.remove('active')
			colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount - 1
			break
		case 1:
			colorToFlash = document.getElementById('red')
			colorToFlash.classList.remove("active")
			colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount - 1
			break
		case 2:
			colorToFlash = document.getElementById('yellow')
			colorToFlash.classList.remove('active')
			colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount - 1
			break
		case 3:
			colorToFlash = document.getElementById('blue')
	 		colorToFlash.classList.remove('active')
	 		colorToFlash.style.animationIterationCount = colorToFlash.style.animationIterationCount - 1
	 		break
	}
}

//playThisColor() is called by playColorsThisTurn.
//It plays an individual color, along with a sound, and then it clears the color button so that it's ready to go again.
const playThisColor = function (x) {
	flashColor(x);
	setTimeout(function () { playSound(x) }, time);
	time += 500;
	setTimeout(function () { returnColor(x) }, time);
}

//playColorsThusTurn() goes through thisTurnArray and calls playThisColor() on each of the values it finds there.
const playColorsThisTurn = function () {
	for (var i = 0; i < thisTurnArray.length; i++) {
		playThisColor(thisTurnArray[i])
	}
}

// readyPlayerButton() attaches a function to each of the buttons so that the player can now click them.
// (Elsewhere, the game tries to disable the buttons when the player shouldn't be clicking them.)
const readyPlayerButtons = function () {
	const buttons = document.getElementsByClassName('colorbutton')
	for (let i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', playerMove)
	}
}

// takeTurn() is used to take "Simon's" turn.
// It calls getColorsThisTurn() to build an array (thisTurnArray) that stores a list of colors Simon will play this round.
// It then calls playColorsThisTurn() to play each of those colors.
// Once it's done, it calls readyPlayerButtons() so that the buttons will be responsive to player clicks and s/he can take his/her turn.
const takeTurn = function () {
	getColorsThisTurn()
	setTimeout(function () { playColorsThisTurn() }, 500)
	setTimeout(function () { readyPlayerButtons() }, (2000 + time))
}

module.exports = {
  resetMessage,
  takeTurn
}
