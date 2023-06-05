//gets the saved score from local storage; if null - assigns scores 0;
let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

// first time we are calling the function, this gets the js-score element in the js and actually creates the function ;

updateScoreElement();

//function that is called upon picking one of the player moves
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = "";

  if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
  } else if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
  }

  // updates the score depending on the result
  if (result === "You win.") {
    score.wins += 1;
  } else if (result === "You lose.") {
    score.losses += 1;
  } else if (result === "Tie.") {
    score.ties += 1;
  }

  //update the page every time we click a button, every time the score is changed;
  updateScoreElement();

  //displays the result every time we play the game
  document.querySelector(".js-result").innerHTML = result;

  //displays the moves
  //insert photo and class emoji
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img class="move-icon" src="emoji/${playerMove}.png"> 
        <img class="move-icon" src="emoji/${computerMove}.png"> Computer `;

  //saves the score in local storage so if we refresh it's not lost
  localStorage.setItem("score", JSON.stringify(score));
}

//picks random number that determines computer move;
function pickComputerMove() {
  let computerMove = "";
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }

  return computerMove;
}

//resets the score on the page and in the local storage;
function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  updateScoreElement();
  localStorage.removeItem("score");
  document.querySelector(".js-moves").innerHTML = null;
  document.querySelector(".js-result").innerHTML = null;
}

// function that updates the score
function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}
