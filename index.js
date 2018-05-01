const guessForm = document.querySelector("#guess-form");
const guessInput = document.querySelector("#guess-input");
const guessSubmit = document.querySelector("#guess-submit");
const guessDisplay = document.querySelector("#guess-display");

guessSubmit.addEventListener("click", e => {
  e.preventDefault();
  const guessValue = guessInput.value;
  guessDisplay.innerHTML = `
  you guessed ${guessValue}. ${compareGuessToNumber(parseInt(guessValue), 40)}`;
  guessForm.reset();
});

function compareGuessToNumber(guess, num) {
  if (guess === num) {
    return "BOOM!";
  } else if (guess > num) {
    return "That is too high";
  } else {
    return "That is too low";
  }
}
