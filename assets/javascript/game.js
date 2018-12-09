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

let letterDivs = document.querySelectorAll('.letter-display div');

// function to select and display current word
function currentWord() {
    let randomNumber = Math.floor(Math.random() * stateList.length);
    theState = stateList[randomNumber].state;
    theCapital = stateList[randomNumber].capital;
    //theState = "Massachusettes"; // word use for testing
    theState = theState.toUpperCase();
	console.log("The State is: " + theState);
    // creating the divs per letter
    for(var i = 0; i < theState.length; i++) {
        if (theState[i] === ' ') {
            charDiv += '<div class="letter space"></div>';
        } else {
            charDiv += '<div class="letter"></div>';
        }
    }
    document.querySelector('.current-word').innerHTML = charDiv;
    document.querySelector('.capital').innerHTML = theCapital;
}
function gameInit() {
    guesses = 10,
    theState = "",
    charDiv = "",
    guessedLetters = [],
    correctLetters = [];
    currentWord();
    currentStateDivs = document.querySelectorAll('.current-word div');
    document.querySelector('#start-wrap').style.display = 'none';
    document.querySelector('#game-wrap').style.display = 'flex';
    document.querySelector('.remaining-guesses').innerHTML = guesses;
    document.querySelector('.win-count').innerHTML = wins;
    document.querySelector('.loss-count').innerHTML = losses;
    document.querySelector('.need-hint').style.display = "none";
    document.querySelector('#show-hint').style.display = "inline";
    document.querySelector('.the-hint').style.display = "none";
    // removing guessed class to the selected letter
    for(var i = 0; i < letterDivs.length; i++) {
        letterDivs[i].classList.remove("guessed");
    }
    // automatically adding 'space' to the correctLetters array
    for(var i = 0; i < theState.length; i++) {
        if (theState.charAt(i) === ' ') {
            correctLetters.push(' ');
        }
    }
    newGame = false;
}
function checkLetter(letter) {
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
            win();
        }
        // tracking number of guesses left
        if (theState.indexOf(letter) < 0) {
            guesses--;
            document.querySelector('.remaining-guesses').innerHTML = guesses;
            //console.log(guessedLetters);
            if (guesses === 0) {
                loss();            }
        }
        if (guesses <= 5) {
            document.querySelector('.need-hint').style.display = "block";
        }
    }
    else {
        alert("You already tried that letter!")
    }
}
function win() {
    wins++;
    document.querySelector('.win-count').innerHTML = wins;
    // adding setTimeout to allow the user to see the last letter added to the answer
    // is there a better way to do this?
    setTimeout(function() {
        alert("YOU WIN!");
        gameInit();
    }, 50);
}
function loss() {
    losses++;
    document.querySelector('.loss-count').innerHTML = losses;
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
        alert("YOU LOSE!");
        gameInit();
    }, 50);
}

document.getElementById('show-hint').addEventListener('click', function (event) {
    event.preventDefault();
    document.querySelector('#show-hint').style.display = "none";
    document.querySelector('.the-hint').style.display = "inline-block";
});

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
