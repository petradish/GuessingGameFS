/* 

Write your guess-game code here! Don't forget to look at the test specs as a guide. You can run the specs
by running "testem".

In this file, you will also include the event listeners that are needed to interact with your HTML file when
a user clicks a button or adds a guess to the input field.

*/

document.getElementById('');

function generateWinningNumber () {
    return Math.ceil(100 * Math.random())
}

function shuffle(arr) {
        let m = arr.length, t, i;
        // While there remain elements to shuffle…
        while (m) {
          // Pick a remaining element…
          i = Math.floor(Math.random() * m--);
      
          // And swap it with the current element.
          t = arr[m];
          arr[m] = arr[i];
          arr[i] = t;
        }
        return arr;
}

class Game {
    constructor () {
        this.playersGuess = null;
        this.pastGuesses = [];
        this.winningNumber = generateWinningNumber();
    }
    difference () {
        return Math.abs(this.playersGuess - this.winningNumber)
    }

    isLower () {
        if (this.playersGuess - this.winningNumber > 0) return false
        return true;
    }

    playersGuessSubmission(guess){
        if (guess < 1 || guess > 100 || typeof guess !== 'number') {
            throw `That is an invalid guess.`
        } else {
            this.playersGuess = guess;
            return this.checkGuess(this.playersGuess);
        }
    }

    checkGuess(guess){
        let displayText = '';
        if (this.playersGuess === this.winningNumber) {
            displayText = 'You Win!';
        } else if (this.pastGuesses.includes(this.playersGuess)) {
            displayText = 'You have already guessed that number.';
            document.querySelector(`#displayText`).innerHTML = displayText;
            return displayText;
        } else {
            this.pastGuesses.push(guess);
            if (this.pastGuesses.length === 5) {
                displayText = 'You Lose.';
            } else {
                let diff = this.difference()
                if (diff < 10){
                    displayText = `You're burning up!`;
                } else if (diff < 25){
                    displayText = `You're lukewarm.`;
                } else if (diff < 50){
                    displayText = `You're a bit chilly.`;
                } else displayText = `You're ice cold!`
            }
        }
        document.querySelector(`#displayText`).innerHTML = displayText;
        document.querySelector(`#guess li:nth-child(${this.pastGuesses.length})`).innerHTML = this.playersGuess;

        return displayText;
    }   

    provideHint(){
        const arr = [this.winningNumber, generateWinningNumber(), generateWinningNumber()]
        const shuffled = shuffle(arr);        
        document.querySelector(`#displayText`).innerHTML = shuffled;
    }
    
}

function newGame (){
    return new Game;
}

function playGame() {
    let game = newGame();
    const submit = document.querySelector(`#submit`);
    const reset = document.querySelector(`#reset`);
    const hint = document.querySelector(`#hint`);

    submit.addEventListener('click', function (){
        const playersGuess = +document.querySelector('input').value;
        document.querySelector('input').value = ' '
        game.playersGuessSubmission(playersGuess);
    });
    hint.addEventListener('click', function () {
        game.provideHint();
    });

    reset.addEventListener('click', function (){
        document.getElementById('guess').innerHTML = 
        `<li class='guessChild'></li>
        <li class='guessChild'></li>
        <li class='guessChild'></li>
        <li class='guessChild'></li>
        <li class='guessChild'></li>`;
        document.querySelector(`#displayText`).innerHTML = `Let's play a new game!`;
        game = newGame();
       
    });
}

playGame();