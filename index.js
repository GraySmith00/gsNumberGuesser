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
const minMaxForm = document.querySelector("#min-max-form");
const minNumInput = document.querySelector("#min-num");
const maxNumInput = document.querySelector("#max-num");
const minMaxSubmit = document.querySelector("#min-max-submit");
const minMaxDisplay = document.querySelector("#min-max-display");

console.log(minNumInput.value.length > 0);

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
  minMaxDisplay.innerHTML = `Set the min and max to start the game!`;
}
setInitialHTML();

function reset() {
  guessForm.reset();
  minMaxDisplay.innerHTML = `Set the min and max to start the game!`;
  guessNumberDisplay.innerHTML = ``;
  guessAlert.innerHTML = ``;
  counter = 0;
  guessCounterDisplay.innerHTML = ``;
  isInputPopulated();
  isAnythingToReset();
  lastGuessWas.innerHTML = "";
  minNumInput.value = null;
  maxNumInput.value = null;
  numToGuess = null;
  minMaxForm.classList.remove("display-none");
}

function submitGuess(e, guess, num, minNum, maxNum) {
  e.preventDefault();
  if (!minNum || !maxNum) {
    lastGuessWas.innerHTML = `Ooooops! Need to set the min and max before we can play!`;
    guessForm.reset();
    return;
  }
  counter += 1;
  lastGuessWas.innerHTML = `Your last guess was`;
  guessNumberDisplay.innerHTML = `${guess}`;
  guessAlert.innerHTML = `
   ${compareGuessToNumber(parseInt(guess), num, minNum, maxNum)}`;
  guessCounterDisplay.innerHTML = `
  Guesses: ${counter}
  `;
  guessForm.reset();
  isAnythingToReset();
}

//let numToGuess = randomNumber(maxNumInput.value, maxNumInput.value);
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
  // console.log(minNumInput.value);
  if (minNumInput.value.length === 0 && maxNumInput.value.length === 0) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}
isAnythingToReset();

function randomNumber(minNumStr, maxNumStr) {
  const minNum = Number(minNumStr);
  const maxNum = Number(maxNumStr);
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function setMinAndMaxValues() {
  minMaxDisplay.innerHTML = `Min Number: ${minNumInput.value} Max Number: ${
    maxNumInput.value
  }`;

  isAnythingToReset();
}

let numToGuess = null;
minMaxSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  setMinAndMaxValues();
  lastGuessWas.innerHTML = ``;
  numToGuess = randomNumber(minNumInput.value, maxNumInput.value);
  minMaxForm.classList.add("display-none");
  console.log(numToGuess);
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
