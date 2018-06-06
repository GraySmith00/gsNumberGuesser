const guessForm = document.querySelector('#guess-form');
const guessInput = document.querySelector('#guess-input');
const guessSubmit = document.querySelector('#guess-submit');
const lastGuessWas = document.querySelector('#last-guess-was');
const guessNumberDisplay = document.querySelector('#guess-number-display');
const guessAlert = document.querySelector('#guess-alert');
const guessCounterDisplay = document.querySelector('#guess-counter-display');
const resetButton = document.querySelector('#reset-button');
const clearFormButton = document.querySelector('#clear-form-button');
const minMaxForm = document.querySelector('#min-max-form');
const minNumInput = document.querySelector('#min-num');
const maxNumInput = document.querySelector('#max-num');
const minMaxSubmit = document.querySelector('#min-max-submit');
const minMaxDisplay = document.querySelector('#min-max-display');
const mathTeacherDisplay = document.querySelector('#math-teacher');
const mathAnswerForm = document.querySelector('#math-answer-form');
const mathAnswerInput = document.querySelector('#math-answer-input');
const mathAnswerSubmit = document.querySelector('#math-answer-submit');
const mathAnswerDisplay = document.querySelector('#math-answer-display');

let gameCounter = 0;
let totalGuessCounter = 0;
let roundGuessCounter = 0;
let numToGuess = null;
let minNum = null;
let maxNum = null;
let firstGuess;

minMaxSubmit.addEventListener('click', function(e) {
  e.preventDefault();
  minNum = parseInt(minNumInput.value);
  maxNum = parseInt(maxNumInput.value);
  if (minNumInput.value.length === 0 || maxNumInput.value.length === 0) {
    minMaxDisplay.innerHTML = `Oooooops! You are missing some inputs!!!!`;
    minMaxForm.reset();
    return;
  }
  if (isNaN(minNumInput.value) || isNaN(maxNumInput.value)) {
    minMaxDisplay.innerHTML = `Oooooops! Your inputs have to be numbers!!!!`;
    minMaxForm.reset();
    return;
  }
  if (!(maxNum > minNum)) {
    minMaxDisplay.innerHTML = `Oooooops! Your Max number has to be greater than your Min number!!!`;
    minMaxForm.reset();
    return;
  }
  displayMinMaxValues();
  numToGuess = randomNumber();
  console.log(numToGuess);
  minMaxForm.classList.add('display-none');
  guessForm.classList.remove('display-none');
  resetButton.classList.remove('display-none');
});


guessInput.addEventListener('keyup', isInputPopulated);

guessSubmit.addEventListener('click', function(e) {
  e.preventDefault();
  submitGuess(parseInt(guessInput.value), numToGuess);
});


resetButton.addEventListener('click', reset);

clearFormButton.addEventListener('click', () => {
  guessForm.reset();
  isInputPopulated();
});

function setInitialState() {
  minMaxForm.classList.remove('display-none');
  minMaxDisplay.innerHTML = `Set the min and max to start the game!`;
  resetButton.classList.add('display-none');
  guessNumberDisplay.innerHTML = ``;
  guessAlert.innerHTML = ``;
  totalGuessCounter = 0;
  roundGuessCounter = 0;
  gameCounter = 0;
  guessCounterDisplay.innerHTML = ``;
  lastGuessWas.innerHTML = '';
  minNumInput.value = null;
  maxNumInput.value = null;
  minNum = null;
  maxNum = null;
  numToGuess = null;
}
setInitialState();

function areMinAndMaxSet() {
  if (minNum === null || maxNum === null) {
    guessForm.classList.add('display-none');
  }
}
areMinAndMaxSet();

function randomNumber() {
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

function displayMinMaxValues() {
  minMaxDisplay.innerHTML = `<p>Min Number: <span>${minNum}</span> Max Number: <span>${maxNum}</span></p>`;
  isAnythingToReset();
}

function isInputPopulated() {
  var enabled = true;

  if (guessInput.value) {
    enabled = false;
  }
  clearFormButton.disabled = enabled;
  guessSubmit.disabled = enabled;
}
isInputPopulated();

function isAnythingToReset() {
  if (!minNumInput.value && !maxNumInput.value) {
    resetButton.disabled = true;
  } else {
    resetButton.disabled = false;
  }
}
isAnythingToReset();

function reset() {
  guessForm.reset();
  setInitialState();
  isInputPopulated();
  isAnythingToReset();
  areMinAndMaxSet();
}

function submitGuess(guess, num) {
  if (minNum === null || maxNum === null) {
    lastGuessWas.innerHTML = `Ooooops! Need to set the min and max before we can play!`;
    guessForm.reset();
    return;
  }
  if (roundGuessCounter === 0) {
    firstGuess = guess;
  }
  totalGuessCounter += 1;
  roundGuessCounter += 1;
  lastGuessWas.innerHTML = `Your last guess was`;
  guessNumberDisplay.innerHTML = `${guess}`;
  guessAlert.innerHTML = `
    ${compareGuessToNumber(parseInt(guess), num)}
  `;
  guessCounterDisplay.innerHTML = `
    Total Guesses: ${totalGuessCounter}
  `;
  guessForm.reset();
  isAnythingToReset();
}

function compareGuessToNumber(guess, num) {
  if (isNaN(guess)) {
    return 'Ooooooops! Sorry we can only accept numbers here!';
  }
  if (guess > maxNum) {
    return `Oooooops! That number is too large, you need to guess a number in between ${minNum} and ${maxNum}!`;
  } else if (guess < minNum) {
    return `Oooooops! That number is too small, you need to guess a number in between ${minNum} and ${maxNum}!`;
  }
  return isGuessEqualToNumber(guess, num);
}

function isGuessEqualToNumber(guess, num) {
  if (guess === num) {
    return gameCounterStatus(guess, num);
  } else if (guess > num) {
    return 'That is too high';
  } else {
    return 'That is too low';
  }
}

function gameCounterStatus(guess, num) {
  gameCounter += 1;
  if (gameCounter < 3) {
    expandMinAndMax();

    minMaxDisplay.classList.add('display-none');
    guessForm.classList.add('display-none');
    mathTeacherDisplay.classList.remove('display-none');
    mathAnswerForm.classList.remove('display-none');
    mathAnswerDisplay.innerHTML = '';
    mathAnswerDisplay.classList.remove('display-none');

    mathProblem(num);

    roundGuessCounter = 0;
    return `BOOM! ${guess} was the number!!!!`;
  } else {
    return `BOOM! That was the number! You've Won the Game!!!!!`;
  }
}

function mathProblem(num) {
  let mathAnswerOne = (num - firstGuess) * totalGuessCounter;

  mathTeacherDisplay.innerHTML = `
    <h3>Let's Continue, but first a math problem:</h3>
    <p>The number was: ${num}</p>
    <p>Your first guess was: ${firstGuess}</p>
    <p>You've taken ${totalGuessCounter} ${
    totalGuessCounter === 1 ? 'guess' : 'total guesses'
  }</p>
    <p>What is (${num} - ${firstGuess}) * ${totalGuessCounter}</p>
  `;

  mathAnswerSubmit.addEventListener('click', e => {
    e.preventDefault();

    if (Number(mathAnswerInput.value) === mathAnswerOne) {
      guessAlert.innerHTML = `${
        mathAnswerInput.value
      } is Correct! Let's move on! The Min and Max are <span>expanding!!!!</span>`;
      minMaxDisplay.classList.remove('display-none');
      guessForm.classList.remove('display-none');
      mathTeacherDisplay.classList.add('display-none');
      mathAnswerForm.classList.add('display-none');
      mathAnswerDisplay.classList.add('display-none');
      mathAnswerForm.reset();
    } else {
      mathAnswerDisplay.innerHTML = `Oops try again`;
    }
  });
}

function expandMinAndMax() {
  minNum -= 10;
  maxNum += 10;
  displayMinMaxValues();
  numToGuess = randomNumber();
  console.log(numToGuess);
}
