const wordList = ['Awkward', 'Bagpipes', 'Banjo', 'Bungler', 'Croquet', 'Crypt', 'Dwarves', 'Fervid', 'Fishhook', 'Gazebo', 'Gypsy', 'Haiku', 'Hyphen', 'Ivory', 'Jazzy', 'Jiffy', 'Jinx', 'Jukebox', 'Zombie'];

let wins = 0,
    guesses = 10,
    theWord = "",
    charDiv = "",
    newGame = true,
    guessedLetters = [],
    correctLetters = [];

let letterDivs = document.querySelectorAll('.letter-display div');

// function to select and display current word
function currentWord() {
    theWord = wordList[Math.floor(Math.random() * wordList.length)];
    //theWord = "speeds"; // word use for testing
    theWord = theWord.toUpperCase();
	console.log("The Word is: " + theWord);
    for(var i = 0; i < theWord.length; i++) {
    	charDiv += '<div class="letter"></div>';
    }
    document.querySelector('.current-word').innerHTML = charDiv;
}
function gameInit() {
    guesses = 10,
    theWord = "",
    charDiv = "",
    guessedLetters = [],
    correctLetters = [];
    currentWord();
    document.querySelector('#start-wrap').style.display = 'none';
    document.querySelector('#game-wrap').style.display = 'flex';
    document.querySelector('.remaining-guesses').innerHTML = guesses;
    document.querySelector('.win-count').innerHTML = wins;
    // adding guessed class to the selected letter
    for(var i = 0; i < letterDivs.length; i++) {
        letterDivs[i].classList.remove("guessed");
    }
    newGame = false;
}
function checkLetter(letter) {
    // checking if the guessed letter hevnt been guesed yet
    if (guessedLetters.indexOf(letter) < 0) {
        guessedLetters.push(letter);
        for(var i = 0; i < letterDivs.length; i++) {
            if (letterDivs[i].textContent == letter) {
                letterDivs[i].classList.add("guessed");
            }
        }
        let currentWordDivs = document.querySelectorAll('.current-word div');
        for(var i = 0; i < theWord.length; i++) {
            if (theWord.charAt(i) === letter) {
                currentWordDivs[i].innerHTML = letter;
                correctLetters.push(letter);
                //console.log("Letter in word: " + theWord.charAt(i));
            }
        }
        // tracking number of wins
        if (theWord.length === correctLetters.length) {
            wins++;
            document.querySelector('.win-count').innerHTML = wins;
            // adding setTimeout to allow the user to see the last letter added to the answer
            // is there a better way to do this?
            setTimeout(function() {
                alert("YOU WIN!");
                gameInit();
            }, 50);
        }
        // tracking number of guesses left
        if (theWord.indexOf(letter) < 0) {
            guesses--;
            document.querySelector('.remaining-guesses').innerHTML = guesses;
            //console.log(guessedLetters);
            if (guesses === 0) {
                // adding setTimeout to allow the user to see the last letter guessed
                // is there a better way to do this?
                setTimeout(function() {
                    alert("YOU LOSE!");
                    gameInit();
                }, 50);
            }
        }
    }
    else {
        alert("You already tried that letter!")
    }
}

document.onkeyup = function(event) {
    // checking if it's a new game, if not don't initialize the game on onkeyup
    if (newGame) {
        gameInit();
    }
    else {
        // Check if the key is a letter
        let charCode = event.keyCode;
        let letter = String.fromCharCode(charCode).toUpperCase();
        // using regex to check if the key pressed is a letter
        if (/[a-zA-Z]/i.test(letter)) {
            //console.log("Letter: " + letter);
            checkLetter(letter);
        }
        else {
            alert("Press a letter!");
        }
    }
}
