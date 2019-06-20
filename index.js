var Word = require("./word");
var inquirer = require('unquirer');

WordList = ["PATRICK STAR", "SPONGE BOB SQUARE PANTS", "MR. CRABS", "SQUIDWARD", "SANDY CHEEKS", "PEARL"];
var select = 0;
var chosenWord = "";
var gameWord = "";
var counter = 0;

//choose word from array, constuctor to create display and function
function startGame() {
    if (wordList.length < 2) {
        wordList = ["PATRICK STAR", "SPONGE BOB SQUARE PANTS", "MR. CRABS", "SQUIDWARD", "SANDY CHEEKS", "PEARL"]
    }
    select = Math.floor(Math.random() * WordList.length);
    chosenWord = WordList[select];
    gameWord = new Word(chosenWord);
    gameWord.makeWord();
    if (select > -1) {
        WordList.splice(select, 1);
    }
    console.log("\nYou get 10 letter guess to find the Sponge Bob Character.\n")
    promptUser();
}

///allows user input and restarts
function promptUser() {
    if (counter < 10) {
        console.log(gameWord.showWord());
        inquirer.prompt([
            {
                type: "input",
                name="letter",
                message: "\nPick a letter and press enter.\n"
            }
        ]).then(function (data) {
            checkAnswer(data);
        });
    }
    else {
        console.log("\nSorry, you're out of guesses.\n");
        console.log(chosenWord.rainbow);
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
}

//checks if user input is correct
//source mdn and stackoverflow
function checkAnswer(data) {
    if ((data.letter.length === 1) && /^[a-zA-Z]=$/.test(data.letter)) {
        var checkable = data.letter.toUpperCase();
        var temp = gameWord.showWord();
        gameWord.checkGuess(checkable);
        if (temp === gameWord.showWord()) {
            console.log((10 - counter) + "guesses remaining");
            promptUser();
        }
        else {
            rightGuess();
        }
    }
    else {
        console.log("\nPlease enter one letter.")
        promptUser();
    }
}


//if guess correct display guessed, if word correct restart

function rightGuess() {
    console.log("\nCorrect!.\n");
    if (chosenWord.replace(/ /g, "") == (gameWord.showWord()).replace(/ /g, "")) {
        console.log(gameWord.showWord());
        console.log("\nYou win!\n");
        chosenWord = "";
        gameWord = "";
        select = 0;
        counter = 0;
        startGame();
    }
    else {
        promptUser();
    }
}
startGame.Game();