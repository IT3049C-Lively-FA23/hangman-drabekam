// START + DIFFICULTY SELECTION
const startWrapper = document.getElementById(`startWrapper`);
const difficultySelectForm = document.getElementById(`difficultySelect`);
const difficultySelect = document.getElementById(`difficulty`);

// GAME
const gameWrapper = document.getElementById(`gameWrapper`);
const guessesText = document.getElementById(`guesses`);
const wordHolderText = document.getElementById(`wordHolder`);

// GUESSING FORM
const guessForm = document.getElementById(`guessForm`);
const guessInput = document.getElementById(`guessInput`);

// GAME RESET BUTTON
const resetGame = document.getElementById(`resetGame`);

// CANVAS
let canvas = document.getElementById(`hangmanCanvas`);

// The following Try-Catch Block will catch the errors thrown
try {
  // Instantiate a game Object using the Hangman class.
  const game = new Hangman(canvas);

  // Add a submit Event Listener for the difficultySelectionForm
  difficultySelectForm.addEventListener(`submit`, function (event) {
    event.preventDefault(); // Prevent form from submitting normally
    const difficulty = difficultySelect.value; // Get the difficulty input

    // Call the game start() method
    game.start(difficulty, function () {
      // Callback function actions
      startWrapper.style.display = `none`; // 1. Hide the startWrapper
      gameWrapper.style.display = `block`; // 2. Show the gameWrapper
      wordHolderText.textContent = game.getWordHolderText(); // 3. Update wordHolderText
      guessesText.textContent = game.getGuessesText(); // 4. Update guessesText
    });
  });

  // Add a submit Event Listener to the guessForm
  guessForm.addEventListener(`submit`, function (e) {
    e.preventDefault(); // Prevent form from submitting normally
    const guess = guessInput.value.trim(); // Get the guess input

    try {
      game.guess(guess); // Call the game guess() method
      wordHolderText.textContent = game.getWordHolderText(); // Update the wordHolderText
      guessesText.textContent = game.getGuessesText(); // Update the guessesText
    } catch (error) {
      alert(error); // Show error if any from guessing
    }

    guessInput.value = ""; // Clear the guess input field

    // Check if the game is over
    if (game.isOver) {
      guessInput.disabled = true; // Disable the guessInput
      document.getElementById(`guessButton`).disabled = true; // Disable the guessButton
      resetGame.style.display = `block`; // Show the resetGame button

      // Alert win or loss
      if (game.didWin) {
        alert("Congratulations, you've won!");
      } else {
        alert("Game Over. Try again!");
      }
    }
  });

  // Add a click Event Listener to the resetGame button
  resetGame.addEventListener(`click`, function (e) {
    e.preventDefault();
    startWrapper.style.display = `block`; // Show the startWrapper
    gameWrapper.style.display = `none`; // Hide the gameWrapper
    resetGame.style.display = `none`; // Hide the reset button
    guessInput.disabled = false; // Re-enable the guessInput
    document.getElementById(`guessButton`).disabled = false; // Re-enable the guessButton

    // Reset game state if needed
    // Note: This might require additional logic to reset the game object completely,
    // depending on the Hangman class implementation.
  });
} catch (error) {
  console.error(error);
  alert(error);
}
