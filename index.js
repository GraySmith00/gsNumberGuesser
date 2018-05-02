const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessSubmit = document.querySelector("#guess-submit");
const guessDisplay = document.querySelector("#guess-display");
const resetButton = document.querySelector("#reset-button");
const clearFormButton = document.querySelector("#clear-form-button");

function randomNumber(minNum, maxNum) {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function compareGuessToNumber(guess, num, minNum, maxNum) {
  if (isNaN(guess)) {
    return "Ooooooops! Sorry we can only accept numbers here!";
  }
  if (guess > maxNum) {
    return `Oooooops! That number is too large, you need to guess a number in between ${minNum} and ${maxNum}!`;
  } else if (guess < minNum) {
    return `Oooooops! That number is too small, you need to guess a number in between ${minNum} and ${maxNum}!`;
  } else {
    if (guess === num) {
      return `BOOM! That was the number!`;
    } else if (guess > num) {
      return "That is too high";
    } else {
      return "That is too low";
    }
  }
}

function reset() {
  guessForm.reset();
  guessDisplay.innerHTML = ``;
  const numToGuess = randomNumber(1, 100);
}

resetButton.addEventListener("click", function() {
  reset();
});

clearFormButton.addEventListener("click", () => {
  guessForm.reset();
});

function playGame(e, guess, num, minNum, maxNum) {
  e.preventDefault();
  guessDisplay.innerHTML = `
  You guessed ${guess}. ${compareGuessToNumber(
    parseInt(guess),
    num,
    minNum,
    maxNum
  )}.`;
  guessForm.reset();
}

let numToGuess = randomNumber(1, 100);

guessSubmit.addEventListener("click", function(e) {
  playGame(e, guessInput.value, numToGuess, 1, 100);
});
