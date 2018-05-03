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
const minNumInput = document.querySelector("#min-num");
const maxNumInput = document.querySelector("#max-num");
const minMaxSubmit = document.querySelector("#min-max-submit");
const minMaxDisplay = document.querySelector("#min-max-display");

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

function setInitialHTML() {
  lastGuessWas.innerHTML = `Set the min and max to start the game!`;
}
setInitialHTML();

function reset(minNum, maxNum) {
  guessForm.reset();
  lastGuessWas.innerHTML = `Set the min and max to start the game!`;
  guessNumberDisplay.innerHTML = ``;
  guessAlert.innerHTML = ``;
  const numToGuess = null;
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

let numToGuess = randomNumber(maxNumInput.value, maxNumInput.value);
let counter = 0;

function isInputPopulated() {
  if (guessInput.value.length > 0) {
    clearFormButton.disabled = false;
  } else {
    clearFormButton.disabled = true;
  }
}
isInputPopulated();

function isAnythingToReset() {
  if (
    // guessInput.value.length === 0 &&
    lastGuessWas.innerHTML === `Set the min and max to start the game!`
  ) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}
isAnythingToReset(maxNumInput.value, maxNumInput.value);

minMaxSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  const numToGuess = randomNumber(minNumInput.value, maxNumInput.value);
  console.log(numToGuess);
  minMaxDisplay.innerHTML = `Min Number: ${minNumInput.value} Max Number: ${
    maxNumInput.value
  }`;
});

guessInput.addEventListener("keyup", function() {
  isInputPopulated();
});

guessSubmit.addEventListener("click", function(e) {
  submitGuess(
    e,
    guessInput.value,
    numToGuess,
    minNumInput.value,
    maxNumInput.value
  );
});

resetButton.addEventListener("click", function() {
  reset(1, 100);
});

clearFormButton.addEventListener("click", () => {
  guessForm.reset();
  isInputPopulated();
});
