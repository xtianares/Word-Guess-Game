const wordList = ['Awkward', 'Bagpipes', 'Banjo', 'Bungler', 'Croquet', 'Crypt', 'Dwarves', 'Fervid', 'Fishhook', 'Gazebo', 'Gypsy', 'Haiku', 'Hyphen', 'Ivory', 'Jazzy', 'Jiffy', 'Jinx', 'Jukebox', 'Zombie'];

let wins = 0,
    guesses = 7,
    theWord = "",
    charCount = "";

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
    document.querySelector('#start-wrap').style.display = 'none';
    document.querySelector('.remaining-guesses').innerHTML = guesses;
    currentWord();
}

document.onkeyup = function(event) {
    gameInit();
}
