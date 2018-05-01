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
  s;
  if (isNaN(guess)) {
    return "Ooooooops! Sorry we can only accept numbers here!";
  }
  if (guess > maxNum) {
    return "Oooooops! That number is too large and is outside the realm of this game!";
  } else if (guess < minNum) {
    return "Oooooops! That number is too low and is outside the realm of this game!";
  } else {
    if (guess === num) {
      return "BOOM!";
    } else if (guess > num) {
      return "That is too high";
    } else {
      return "That is too low";
    }
  }
}

resetButton.addEventListener("click", () => {
  guessForm.reset();
  guessDisplay.innerHTML = ``;
});

clearFormButton.addEventListener("click", () => {
  guessForm.reset();
});

function playGame(e, guess, num, minNum, maxNum) {
  e.preventDefault();
  guessDisplay.innerHTML = `
  You guessed ${guess}. ${compareGuessToNumber(
    parseInt(guess),
    num
  )}. The number was ${num}`;
  guessForm.reset();
}

guessSubmit.addEventListener("click", function(e) {
  playGame(e, guessInput.value, randomNumber(1, 100), 1, 100);
});
