const wordList = ['Awkward', 'Bagpipes', 'Banjo', 'Bungler', 'Croquet', 'Crypt', 'Dwarves', 'Fervid', 'Fishhook', 'Gazebo', 'Gypsy', 'Haiku', 'Hyphen', 'Ivory', 'Jazzy', 'Jiffy', 'Jinx', 'Jukebox', 'Zombie'];

let wins = 0,
    guesses = 10,
    theWord = "",
    charCount = "",
    newGame = true,
    guessedLetters = [];

// function to select and display current word
function currentWord() {
    theWord = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(theWord);
    for(var i = 0; i < theWord.length; i++) {
    	charCount += '<div class="letter"></div>';
    }
    document.querySelector('.current-word').innerHTML = charCount;
}
function gameInit() {
    currentWord();
    document.querySelector('#start-wrap').style.display = 'none';
    document.querySelector('#game-wrap').style.display = 'flex';
    document.querySelector('.remaining-guesses').innerHTML = guesses;
    document.querySelector('.win-count').innerHTML = wins;
    let letterDivs = document.querySelectorAll('.letter-display div');
    for(var i = 0; i < letterDivs.length; i++) {
        letterDivs[i].classList.remove("guessed");
    }
}
function reset() {
    wins = 0,
    guesses = 7,
    theWord = "",
    charCount = "",
    newGame = true,
    guessedLetters = [];
    gameInit();
}
function selectedLetter(letter) {
    let letterDivs = document.querySelectorAll('.letter-display div');
    if (guessedLetters.indexOf(letter) < 0) {
        guessedLetters.push(letter);
        for(var i = 0; i < letterDivs.length; i++) {
            if (letterDivs[i].id == letter) {
                letterDivs[i].classList.add("guessed");
            }
        }
        guesses -= 1;
    }
    document.querySelector('.remaining-guesses').innerHTML = guesses;
    console.log(guessedLetters);
    if (guesses === 0) {
        alert("YOU LOSE!");
        reset();
    }
}

document.onkeyup = function(event) {
    if (newGame) {
        gameInit();
    }
    newGame = false;
    // Check if letter key
    let charCode = event.keyCode;
    let letter = String.fromCharCode(charCode).toLowerCase();
    if (/[a-zA-Z]/i.test(letter)) {
 		//console.log("Letter: " + letter);
        selectedLetter(letter);
    }
    else {
        alert("Press a letter!");
    }
}
