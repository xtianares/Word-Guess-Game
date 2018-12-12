const stateList = [
    { state : "Alabama", capital : "Montgomery" },
    { state : "Alaska", capital : "Juneau" },
    { state : "Arizona", capital : "Phoenix" },
    { state : "Arkansas", capital : "Little Rock" },
    { state : "California", capital : "Sacramento" },
    { state : "Colorado", capital : "Denver" },
    { state : "Connecticut", capital : "Hartford" },
    { state : "Delaware", capital : "Dover" },
    { state : "Florida", capital : "Tallahasse" },
    { state : "Georgia", capital : "Atlanta" },
    { state : "Hawaii", capital : "Honolulu" },
    { state : "Idaho", capital : "Boise" },
    { state : "Illinois", capital : "Springfield" },
    { state : "Indiana", capital : "Indianapolis" },
    { state : "Iowa", capital : "Des Moines" },
    { state : "Kansas", capital : "Topeka" },
    { state : "Kentucky", capital : "Frankfort" },
    { state : "Louisiana", capital : "Baton Rouge" },
    { state : "Maine", capital : "Augusta" },
    { state : "Maryland", capital : "Annapolis" },
    { state : "Massachusettes", capital : "Boston" },
    { state : "Michigan", capital : "Lansing" },
    { state : "Minnesota", capital : "Saint Paul" },
    { state : "Mississippi", capital : "Jackson" },
    { state : "Missouri", capital : "Jefferson City" },
    { state : "Montana", capital : "Helena" },
    { state : "Nebraska", capital : "Lincoln" },
    { state : "Nevada", capital : "Carson City" },
    { state : "New Hampshire", capital : "Concord" },
    { state : "New Jersey", capital : "Trenton" },
    { state : "New York", capital : "Albany" },
    { state : "New Mexico", capital : "Santa Fe" },
    { state : "North Carolina", capital : "Raleigh" },
    { state : "North Dakota", capital : "Bismark" },
    { state : "Ohio", capital : "Columbus" },
    { state : "Oklahoma", capital : "Oklahoma City" },
    { state : "Oregon", capital : "Salem" },
    { state : "Pennslyvania", capital : "Harrisburg" },
    { state : "Rhode Island", capital : "Providence" },
    { state : "South Carolina", capital : "Columbia" },
    { state : "South Dakota", capital : "Pierre" },
    { state : "Tennessee", capital : "Nashville" },
    { state : "Texas", capital : "Austin" },
    { state : "Utah", capital : "Salt Lake City" },
    { state : "Vermont", capital : "Montpelier" },
    { state : "Virginia", capital : "Richmond" },
    { state : "Washington", capital : "Olympia" },
    { state : "West Virginia", capital : "Charleston" },
    { state : "Wisconsin", capital : "Madison" },
    { state : "Wyoming", capital : "Cheyenne" }
];

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

let wins = 0,
    losses = 0,
    guesses = 10,
    theState = "",
    theCapital = "",
    charDiv = "",
    newGame = true,
    guessedLetters = [],
    correctLetters = [],
    currentStateDivs = "";

let letterDivs = "";

const game = {
    // function to select and display current word
    currentWord: function() {
        let randomNumber = Math.floor(Math.random() * stateList.length);
        theState = stateList[randomNumber].state;
        theCapital = stateList[randomNumber].capital;
        //theState = "Massachusettes"; // word use for testing
        theState = theState.toUpperCase();
    	console.log("The State is: " + theState);
        // creating the divs per letter to be guessed
        for(var i = 0; i < theState.length; i++) {
            if (theState[i] === ' ') {
                charDiv += '<div class="letter space"></div>';
            } else {
                charDiv += '<div class="letter"></div>';
            }
        }
        document.querySelector('.current-word').innerHTML = charDiv;
        document.querySelector('.capital').innerHTML = theCapital;
    },
    init: function() {
        guesses = 10,
        theState = "",
        charDiv = "",
        guessedLetters = [],
        correctLetters = [];
        this.currentWord();
        currentStateDivs = document.querySelectorAll('.current-word div');
        document.querySelector('#start-wrap').style.display = 'none';
        document.querySelector('#game-wrap').style.display = 'flex';
        document.querySelector('.remaining-guesses').innerHTML = guesses;
        document.querySelector('.win-count').innerHTML = wins;
        document.querySelector('.loss-count').innerHTML = losses;
        document.querySelector('.need-hint').style.display = "none";
        document.querySelector('#show-hint').style.display = "inline";
        document.querySelector('.the-hint').style.display = "none";
        document.querySelector('.letter-display').style.display = "flex";
        document.querySelector('.win-lose').style.display = "none";
        // removing guessed class to the selected letter
        //let newDivs = document.querySelectorAll('.letter-display div');
        document.querySelector('.letter-display').innerHTML = "";
        for(var i = 0; i < alphabet.length; i++) {
            let div = document.createElement("div");
                div.innerHTML = alphabet[i];
            //newDivs += div;
            document.querySelector('.letter-display').appendChild(div);
        }
        letterDivs = document.querySelectorAll('.letter-display div');
        // removing guessed class to the selected letter
        // for(var i = 0; i < letterDivs.length; i++) {
        //     letterDivs[i].classList.remove("guessed");
        // }
        // automatically adding 'space' to the correctLetters array
        for(var i = 0; i < theState.length; i++) {
            if (theState.charAt(i) === ' ') {
                correctLetters.push(' ');
            }
        }
        newGame = false;
    },
    checkLetter: function(letter) {
        // checking if the guessed letter havent been guesed yet
        if (guessedLetters.indexOf(letter) < 0) {
            guessedLetters.push(letter);
            // adding guessed class to the selected letter
            for(var i = 0; i < letterDivs.length; i++) {
                if (letterDivs[i].textContent.toUpperCase() === letter) {
                    letterDivs[i].classList.add("guessed");
                }
            }
            for(var i = 0; i < theState.length; i++) {
                if (theState.charAt(i) === letter) {
                    currentStateDivs[i].innerHTML = letter;
                    correctLetters.push(letter);
                    //console.log("Letter in word: " + theState.charAt(i));
                }
            }
            // tracking number of wins
            if (theState.length === correctLetters.length) {
                this.win();
            }
            // tracking number of guesses left
            if (theState.indexOf(letter) < 0) {
                guesses--;
                document.querySelector('.remaining-guesses').innerHTML = guesses;
                //console.log(guessedLetters);
                if (guesses === 0) {
                    this.loss();
                }
            }
            // display hint trigger if the guessesRemaining is low
            if (guesses <= 5) {
                document.querySelector('.need-hint').style.display = "block";
            }
        }
        else {
            alert("You already tried that letter!")
        }
    },
    win: function() {
        wins++;
        document.querySelector('.win-count').innerHTML = wins;
        let audio = new Audio('assets/sounds/win.mp3');
        audio.play();
        let winner = `<h2 class="h1 mb-0">You Win!</h2>
                    <p class="mb-0">Starting a new game...</p>`;
        document.querySelector('.win-lose').innerHTML = winner;
        document.querySelector('.letter-display').style.display = "none";
        document.querySelector('.win-lose').style.display = "block";
        // adding setTimeout to allow the user to see the last letter added to the answer
        // is there a better way to do this?
        setTimeout(function() {
            //alert("YOU WIN!");
            game.init();
        }, 2500);
    },
    loss: function() {
        losses++;
        document.querySelector('.loss-count').innerHTML = losses;
        let audio = new Audio('assets/sounds/loss.mp3');
        audio.play();
        let winner = `<h2 class="h1 mb-0">You Lose!</h2>
                    <p class="mb-0">Starting a new game...</p>`;
        document.querySelector('.win-lose').innerHTML = winner;
        document.querySelector('.letter-display').style.display = "none";
        document.querySelector('.win-lose').style.display = "block";
        // per suggestion from my son display the correct answer
        let answer = '';
        for(var i = 0; i < theState.length; i++) {
            if (theState[i] === ' ') {
                answer += '<div class="letter space"></div>';
            } else {
                answer += '<div class="letter space">'+ theState[i] +'</div>';
            }
        }
        document.querySelector('.current-word').innerHTML = answer;
        // adding setTimeout to allow the user to see the last letter guessed
        // is there a better way to do this?
        setTimeout(function() {
            //alert("YOU LOSE!");
            game.init();
        }, 3500);
    }
}

// trigger to show the hint
document.getElementById('show-hint').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#show-hint').style.display = "none";
    document.querySelector('.the-hint').style.display = "inline-block";
});

document.onkeyup = function(event) {
    // checking if it's a new game, if not don't initialize the game on onkeyup
    if (newGame) {
        game.init();
    }
    else {
        // Check if the key is a letter
        let charCode = event.keyCode;
        let letter = String.fromCharCode(charCode).toUpperCase();
        // using regex to check if the key pressed is a letter
        if (/[a-zA-Z]/i.test(letter)) {
            //console.log("Letter: " + letter);
            if (guesses > 0) {
                game.checkLetter(letter);
            }
        }
        else {
            //alert("Press a letter!");
        }
    }
}

//adding support for clicking the displayed letter
document.addEventListener('click', function (event) {
    if (!Element.prototype.matches) {
    	Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
    }
    if (newGame) {
        game.init();
    }
	// If the clicked element doesn't have the right selector, bail
	if (!event.target.matches('.letter-display div')) {
        return;
    }
	event.preventDefault();
    if (guesses > 0) {
        game.checkLetter(event.target.innerText.toUpperCase());
    }
	console.log(event.target);
}, false);
