let minimumNumber = 1,
    maximumNumber = 10,
    numberToGuess = getRandomNumber(minimumNumber, maximumNumber),
    guessesLeft = 3,
    errorMessage = `Please enter a nubmer between ${minimumNumber} and ${maximumNumber}`,
    successMessage = `${numberToGuess} is correct, YOU WIN!`,
    gameOverMessage = `Game Over. Correct number was ${numberToGuess}, YOU LOOSE!`;

const ERROR = 'red',
      SUCCESS = 'green';
const game = document.querySelector('#game');
const minNumber = document.querySelector('.min-number');
const maxNumber = document.querySelector('.max-number');
const guessedNumber = document.querySelector('#guessed-number');
const guessButton = document.querySelector('#guess-button');
const message = document.querySelector('.message');

minNumber.textContent = minimumNumber.toString();
maxNumber.textContent = maximumNumber.toString();

guessButton.addEventListener('click', guessNumber);
game.addEventListener('mousedown', playAgain);

function guessNumber(event) {
    console.log('guessing number ...');
    if (isInvalid(parseInt(guessedNumber.value))) {
        invalidGuess();
    } else if (isCorrectGuess()) {
        gameWon();
    } else {
        guessesLeft -= 1;
        if (isGameOver()) {
            gameOver();
        } else {
            showGuessesLeft();
        }
    }
}

function playAgain(event) {
    console.log('Play again ?');
    if (event.target.className === 'play-again') {
        console.log('reloading ...');
        window.location.reload();
    }
}

function isInvalid(numberToValidate) {
    console.log(`validating number "${numberToValidate}" ...`);
    let result = false;
    if (isNaN(numberToValidate)) {
        result = true;
    } else if (numberToValidate < minimumNumber) {
        result = true;
    } else if (numberToValidate > maximumNumber) {
        result = true
    }
    console.log(`result = "${result}"`);
    return result;
}

function invalidGuess() {
    showMessage(errorMessage, ERROR);
    setBorderColor(ERROR);
}

function gameWon() {
    endGame();
    showMessage(successMessage, SUCCESS);
    setBorderColor(SUCCESS);
}

function endGame() {
    guessedNumber.value = '';
    disableGuessedNumber();
    showPlayAgainButton();
}

function gameOver() {
    endGame();
    showMessage(gameOverMessage, ERROR);
    setBorderColor(ERROR);
}

function showGuessesLeft() {
    showMessage(
        `${guessedNumber.value} is NOT correct, ${guessesLeft} guesses left!`, ERROR
    );
    guessedNumber.value = '';
    setBorderColor(ERROR);
}

function showMessage(messageToDisplay, colorToDisplay) {
    console.log(`showing message "${messageToDisplay}" with color "${colorToDisplay}"`);
    message.style.color = colorToDisplay;
    message.textContent = messageToDisplay;
}

function isCorrectGuess() {
    console.log(`isCorrectGuess = "${guessedNumber.value}" === "${numberToGuess}"`);
    return parseInt(guessedNumber.value) === numberToGuess;
}

function disableGuessedNumber() {
    guessedNumber.disabled = true;
}

function setBorderColor(colorToDisplay) {
    console.log(`settting bordercolor to "${colorToDisplay}"`);
    guessedNumber.style.borderColor = colorToDisplay;
}

function isGameOver() {
    return guessesLeft === 0;
}

function hideGuessButton() {
    guessButton.style.display = 'none';
}

function showPlayAgainButton() {
    guessButton.value = 'Play Again';
    guessButton.className += 'play-again';
}

function getRandomNumber(minimumNumber, maximumNumber) {
    return Math.floor(
        Math.random() * (maximumNumber - minimumNumber - 1) + 1
    );
}