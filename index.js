const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessSubmit = document.querySelector("#guess-submit");
// const guessDisplay = document.querySelector("#guess-display");
const lastGuessWas = document.querySelector("#last-guess-was");
const guessNumberDisplay = document.querySelector("#guess-number-display");
const guessAlert = document.querySelector("#guess-alert");
const guessCounterDisplay = document.querySelector("#guess-counter-display");
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

function setInitialHTML(minNum, maxNum) {
  lastGuessWas.innerHTML = `Guess a number between ${minNum} and ${maxNum} to start the game!`;
}
setInitialHTML(1, 100);

function reset(minNum, maxNum) {
  guessForm.reset();
  lastGuessWas.innerHTML = `Guess a number between ${minNum} and ${maxNum} to start the game!`;
  guessNumberDisplay.innerHTML = ``;
  guessAlert.innerHTML = ``;
  const numToGuess = randomNumber(1, 100);
  counter = 0;
  guessCounterDisplay.innerHTML = ``;
  isInputPopulated();
  isAnythingToReset(1, 100);
}

function submitGuess(e, guess, num, minNum, maxNum) {
  e.preventDefault();
  counter += 1;
  lastGuessWas.innerHTML = `Your last guess was`;
  guessNumberDisplay.innerHTML = `${guess}`;
  guessAlert.innerHTML = `
   ${compareGuessToNumber(parseInt(guess), num, minNum, maxNum)}`;
  guessCounterDisplay.innerHTML = `
  Guesses: ${counter}
  `;
  guessForm.reset();
  isAnythingToReset(1, 100);
}

let numToGuess = randomNumber(1, 100);
let counter = 0;

function isInputPopulated() {
  console.log(guessInput.value.length);
  if (guessInput.value.length > 0) {
    clearFormButton.disabled = false;
  } else {
    clearFormButton.disabled = true;
  }
}
isInputPopulated();

function isAnythingToReset(minNum, maxNum) {
  if (
    // guessInput.value.length === 0 &&
    lastGuessWas.innerHTML ===
    `Guess a number between ${minNum} and ${maxNum} to start the game!`
  ) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}
isAnythingToReset(1, 100);

guessInput.addEventListener("keyup", function() {
  isInputPopulated();
});

guessSubmit.addEventListener("click", function(e) {
  submitGuess(e, guessInput.value, numToGuess, 1, 100);
});

resetButton.addEventListener("click", function() {
  reset(1, 100);
});

clearFormButton.addEventListener("click", () => {
  guessForm.reset();
  isInputPopulated();
});
