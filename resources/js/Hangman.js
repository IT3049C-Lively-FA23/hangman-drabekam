class Hangman {
  constructor(_canvas) {
    if (!_canvas) {
      throw new Error(`invalid canvas provided`);
    }

    this.canvas = _canvas;
    this.ctx = this.canvas.getContext(`2d`);
  }

  /**
   * This function takes a difficulty string as a parameter
   * would use the Fetch API to get a random word from the Hangman
   * To get an easy word: https://it3049c-hangman.fly.dev?difficulty=easy
   * To get an medium word: https://it3049c-hangman.fly.dev?difficulty=medium
   * To get an hard word: https://it3049c-hangman.fly.dev?difficulty=hard
   * The results is a json object that looks like this:
   *    { word: "book" }
   * */
  getRandomWord(difficulty) {
    return fetch(
      `https://it3049c-hangman.fly.dev?difficulty=${difficulty}`
    )
      .then((r) => r.json())
      .then((r) => r.word);
  }

  /**
   *
   * @param {string} difficulty a difficulty string to be passed to the getRandomWord Function
   * @param {function} next callback function to be called after a word is received from the API.
   */
  start(difficulty, next) {
    this.getRandomWord(difficulty).then((word) => {
      this.clearCanvas();
      this.drawBase();
      this.guesses = [];
      this.word = word;
      this.isOver = false;
      this.didWin = false;
      if (next) {
        next();
      }
    });
  }

  /**
   *
   * @param {string} letter the guessed letter.
   */
  guess(letter) {
    // Add check to ensure this.word is defined before proceeding
    if (!this.word) {
      throw new Error("The game has not started. Please select a difficulty and start the game.");
    }

    if (!letter) throw new Error("No letter was provided");
    if (!letter.match(/[a-zA-Z]/) || letter.length !== 1) throw new Error("Invalid input. Please enter a single letter.");
    if (this.guesses.includes(letter.toUpperCase())) throw new Error("This letter has already been guessed.");

    this.guesses.push(letter.toUpperCase());

    if (!this.word.includes(letter.toUpperCase())) {
      this.onWrongGuess();
    } else {
      this.checkWin();
    }
  }
  checkWin() {
    const isWin = this.word.split("").every((char) => this.guesses.includes(char));
    if (isWin) {
      this.didWin = true;
      this.isOver = true;
      alert("Congratulations, you won!");
    }
  }

  /**
   * Based on the number of wrong guesses, this function would determine and call the appropriate drawing function
   * drawHead, drawBody, drawRightArm, drawLeftArm, drawRightLeg, or drawLeftLeg.
   * if the number wrong guesses is 6, then also set isOver to true and didWin to false.
   */
  onWrongGuess() {
    const wrongGuesses = this.guesses.filter((guess) => !this.word.includes(guess)).length;
    switch (wrongGuesses) {
      case 1: this.drawHead(); break;
      case 2: this.drawBody(); break;
      case 3: this.drawLeftArm(); break;
      case 4: this.drawRightArm(); break;
      case 5: this.drawLeftLeg(); break;
      case 6:
        this.drawRightLeg();
        this.isOver = true;
        this.didWin = false;
        alert("Game Over. You lost.");
        break;
    }
  }
  /**
   * This function will return a string of the word placeholder
   * It will have underscores in the correct number and places of the un-guessed letters.
   * i.e.: if the word is BOOK, and the letter O has been guessed, this would return _ O O _
   */
  getWordHolderText() {
    return this.word.split('').map(char => this.guesses.includes(char) ? char : '_').join(' ');
  }
  /**
   * This function returns a string of all the previous guesses, separated by a comma
   * This would return something that looks like
   * (Guesses: A, B, C)
   * Hint: use the Array.prototype.join method.
   */
  getGuessesText() {
    return `Guesses: ${this.guesses.join(", ")}`;
  }

  /**
   * Clears the canvas
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the hangman base
   */
  drawBase() {
    this.ctx.fillRect(95, 10, 150, 10); // Top
    this.ctx.fillRect(245, 10, 10, 50); // Noose
    this.ctx.fillRect(95, 10, 10, 400); // Main beam
    this.ctx.fillRect(10, 410, 175, 10); // Base
  }

  drawHead() {
    this.ctx.beginPath();
    this.ctx.arc(150, 60, 10, 0, Math.PI * 2); 
    this.ctx.stroke();
  }

  drawBody() {
    this.ctx.beginPath();
    this.ctx.moveTo(150, 70); 
    this.ctx.lineTo(150, 100); 
    this.ctx.stroke();
  }

  drawLeftArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(150, 80); 
    this.ctx.lineTo(130, 90);
    this.ctx.stroke();
  }

  drawRightArm() {
    this.ctx.beginPath();
    this.ctx.moveTo(150, 80);
    this.ctx.lineTo(170, 90); 
    this.ctx.stroke();
  }

  drawLeftLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(150, 100); 
    this.ctx.lineTo(130, 120); 
    this.ctx.stroke();
  }

  drawRightLeg() {
    this.ctx.beginPath();
    this.ctx.moveTo(150, 100); 
    this.ctx.lineTo(170, 120); 
    this.ctx.stroke();
  }
}
