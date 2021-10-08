let guessingWord;
var playerGuessesLeft = 6;
var playerGuessesCount = 0;
let btn = [];
let restartButton = document.getElementById('restartGame');
let removeText = document.getElementById('intro');

//setting the word to guess
function setUserInput() {
	guessingWord = document.getElementById('textfield').value;
}

//check if the word is correct and not including digits or some other characters but letters
function checkUserInput() {
	setUserInput();
	for (var i = 0; i < guessingWord.length; i++) {
		if (!isLetter(guessingWord.charAt(i))) {
			return false;
		}
	}
	return true;
}

//function for checking if a character is letter or not
function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

//if the user input is correct, game is starting ..... otherwise he has to input some other word
function validateUserInput() {

	if (!checkUserInput() || guessingWord.length < 1) {
		let changeWord = document.getElementById('intro').innerHTML = "Input one word and only letters(a-z)";
	} else {
		guessingWord = guessingWord.toUpperCase();
		var pos = 15;
		for (var i = 0; i < guessingWord.length; i++) {
			let label = document.createElement('label');
			label.setAttribute('for', guessingWord.charAt(i));
			label.setAttribute('id', i);
			label.innerHTML = "_";
			label.style.position = 'absolute';
			label.style.width = '50px';
			label.style.height = '0px';
			label.style.top = '350px';
			label.style.left = pos + '%';
			label.style.fontSize = '60px';
			label.style.fontStyle = 'italic';
			label.style.color = 'white';
			document.body.appendChild(label);
			pos += 5;
		}
		generateAlphabet();
	}
}

//setting the alphabet buttons (and some basic CSS)
function generateAlphabet() {
	removeIntro();
	var leftPos = 15, topPos = 500;
	for (var i = 0; i < 26; i++) {
		btn[i] = document.createElement('button');
		btn[i].setAttribute('id', String.fromCharCode(i + 65));
		btn[i].innerHTML = String.fromCharCode(i + 65);
		btn[i].style.position = 'absolute';
		btn[i].style.backgroundColor = "white";
		btn[i].style.width = "50px";
		btn[i].style.height = "40px";
		btn[i].style.top = topPos + "px";
		btn[i].style.left = leftPos + "%";
		document.body.appendChild(btn[i]);
		leftPos += 5;
		if (leftPos > 80) {
			leftPos = 20;
			topPos += 50;
		}
		
	}
}

//removing the textfield and submit button from the intro page
function removeIntro() {
	let textBox = document.getElementById('textfield');
	textBox.parentNode.removeChild(textBox);

	let bttn = document.getElementById('submitBtn');
	bttn.parentNode.removeChild(bttn);

	document.getElementById('intro').innerHTML = "Select letters from below to fill the missing spaces: ";
	document.getElementById('infoMessage').innerHTML = "You have " + playerGuessesLeft + " tries to guess the word";
}

function winLoseCondition() {
	if (playerGuessesCount == guessingWord.length) {
		document.getElementById('infoMessage').innerHTML = "Congratulations, you guessed the word!";
		removeText.parentNode.removeChild(removeText);
		restartButton.style.visibility = 'visible';
	} else if (playerGuessesLeft < 1) {
		document.getElementById('infoMessage').innerHTML = "You lost, the word was " + guessingWord;
		removeText.parentNode.removeChild(removeText);
		restartButton.style.visibility = 'visible';	
	}
}

function playGame() {
	validateUserInput();
	for (var i = 0; i < btn.length; i++) {		// adding eventListener for each button
		document.getElementById(String.fromCharCode(i + 65)).addEventListener("click", myFunction);
	}
	
	function myFunction() {
		var checkMistake = playerGuessesCount;

		for (var j = 0; j < guessingWord.length; j++) {			//checking if button's pressed id matching any label
			let labelID = document.getElementById(j);			
			let labelAttrib = labelID.getAttribute('for');
			if (this.id == labelAttrib) {						//if yes, the label will show the button's letter you pressed
				++playerGuessesCount;
				document.getElementById(j).innerHTML = this.id;
			}
		}

		if (checkMistake == playerGuessesCount) {
			--playerGuessesLeft;
			document.getElementById('infoMessage').innerHTML = "You have " + playerGuessesLeft + " tries to guess the word";
		}
		winLoseCondition();
	}
}

function restartGame() {
	window.location.reload();
}