const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessSubmit = document.querySelector("#guess-submit");
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

let gameCounter = 0;
let guessCounter = 0;
let numToGuess = null;
let minNum;
let maxNum;

//===========================================================================================================
// FUNCTIONS
//===========================================================================================================

// Set Initial State Function
//========================================================
function setInitialState() {
  minMaxForm.classList.remove("display-none");
  minMaxDisplay.innerHTML = `Set the min and max to start the game!`;
  resetButton.classList.add("display-none");
  guessNumberDisplay.innerHTML = ``;
  guessAlert.innerHTML = ``;
  guessCounter = 0;
  guessCounterDisplay.innerHTML = ``;
  lastGuessWas.innerHTML = "";
  minNumInput.value = null;
  maxNumInput.value = null;
  numToGuess = null;
}
setInitialState();

// Are Min and Max Set? Function
//========================================================
function areMinAndMaxSet() {
  if (minNumInput.value.length === 0 || maxNumInput.value.length === 0) {
    guessForm.classList.add("display-none");
  }
}
areMinAndMaxSet();

// Random Number Function
//========================================================
function randomNumber() {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

// Set Min Max Values Funtion
//========================================================
function setMinAndMaxValues() {
  minMaxDisplay.innerHTML = `<p>Min Number: <span>${minNum}</span> Max Number: <span>${maxNum}</span></p>`;
  isAnythingToReset();
}

// Is Input Populated? Function
//========================================================
function isInputPopulated() {
  if (guessInput.value.length > 0) {
    clearFormButton.disabled = false;
  } else {
    clearFormButton.disabled = true;
  }
}
isInputPopulated();

// Is Anything to Reset? Function
//========================================================
function isAnythingToReset() {
  if (minNumInput.value.length === 0 && maxNumInput.value.length === 0) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}
isAnythingToReset();

// Reset Function
//========================================================
function reset() {
  guessForm.reset();
  setInitialState();
  isInputPopulated();
  isAnythingToReset();
  areMinAndMaxSet();
}

// Submit Guess Function
//========================================================
function submitGuess(e, guess, num) {
  e.preventDefault();
  if (!minNum || !maxNum) {
    lastGuessWas.innerHTML = `Ooooops! Need to set the min and max before we can play!`;
    guessForm.reset();
    return;
  }
  guessCounter += 1;
  lastGuessWas.innerHTML = `Your last guess was`;
  guessNumberDisplay.innerHTML = `${guess}`;
  guessAlert.innerHTML = `
   ${compareGuessToNumber(parseInt(guess), num)}`;
  guessCounterDisplay.innerHTML = `
  Guesses: ${guessCounter}
  `;
  guessForm.reset();
  isAnythingToReset();
}

// Comapre Guess to Number Function
//========================================================
function compareGuessToNumber(guess, num) {
  if (isNaN(guess)) {
    return "Ooooooops! Sorry we can only accept numbers here!";
  }
  if (guess > maxNum) {
    return `Oooooops! That number is too large, you need to guess a number in between ${minNum} and ${maxNum}!`;
  } else if (guess < minNum) {
    return `Oooooops! That number is too small, you need to guess a number in between ${minNum} and ${maxNum}!`;
  } else {
    if (guess === num) {
      gameCounter += 1;
      console.log(gameCounter);
      minNum -= 10;
      maxNum += 10;
      setMinAndMaxValues();
      return `BOOM! That was the number!`;
    } else if (guess > num) {
      return "That is too high";
    } else {
      return "That is too low";
    }
  }
}

//===========================================================================================================
// EVENT LISTENERS
//===========================================================================================================

// Min Max Submit Event Listener
//========================================================
minMaxSubmit.addEventListener("click", function(e) {
  e.preventDefault();
  minNum = Number(minNumInput.value);
  maxNum = Number(maxNumInput.value);
  setMinAndMaxValues();
  numToGuess = randomNumber();
  minMaxForm.classList.add("display-none");
  guessForm.classList.remove("display-none");
  resetButton.classList.remove("display-none");
});

// Guess Input Keyup Event Listener
//========================================================
guessInput.addEventListener("keyup", function() {
  isInputPopulated();
});

// Guess Submit Event Listener
//========================================================
guessSubmit.addEventListener("click", function(e) {
  submitGuess(e, parseInt(guessInput.value), numToGuess);
});

// Reset Button Event Listener
//========================================================
resetButton.addEventListener("click", function() {
  reset();
});

// Clear Form Button Event Listener
//========================================================
clearFormButton.addEventListener("click", () => {
  guessForm.reset();
  isInputPopulated();
});
