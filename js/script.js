// Player Factory
const PlayerFactory = (name, marker) => {

  const play = function (e) {
    if (e.target.className === "game-cell") {
      const img = e.target.querySelector('img');
      if (img.src.length === 0) {
        img.src = marker;
        img.setAttribute("height", "100");
        img.setAttribute("width", "100");
        return true;
      }
    }
  }

  return {
    play,
    name,
    marker
  }
}


// Modal Popup
const modal = (() => {

  // Elements
  const modalPopup = document.querySelector(".modal");
  const modalClose = document.querySelector("#close-modal")
  const modalRestartButton = document.querySelector(".restart-button")
  const modalPlayAgainButton = document.querySelector(".play-again-button")
  const winningPlayer = document.querySelector(".winning-player")
  const winnerAudio = document.getElementById("winner-audio");

  // vs Player Functions
  const player1Win = function () {
    modalPopup.style.display = "block";
    winningPlayer.innerHTML = `Player 1 Wins!`;
    winnerAudio.play();
  }

  const player2Win = function () {
    modalPopup.style.display = "block";
    winningPlayer.innerHTML = `Player 2 Wins!`;
    winnerAudio.play();    
  }

  const Tie = function () {
    modalPopup.style.display = "block";
    winningPlayer.innerHTML = `It's a tie!`;
  }

  // vs Computer Functions
  const computerPlayer1Win = function () {
    modalPopup.style.display = "block";
    winningPlayer.innerHTML = `Player 1 Wins!`;
    winnerAudio.play();
  }

  const computerPlayer2Win = function () {
    modalPopup.style.display = "block";
    winningPlayer.innerHTML = `Computer Wins!`;
    winnerAudio.play();    
  }

  const computerTie = function () {
    modalPopup.style.display = "block";
    winningPlayer.innerHTML = `It's a tie!`;
  }

  // Close modal button
  modalClose.onclick = function() {
    modalPopup.style.display = "none";
    gameBoard.resetGame();
  }  

  // If user clicks outside of the modal, close it and restart game
  window.onclick = function(event) {
    if (event.target == modalPopup) {
      modalPopup.style.display = "none";
      gameBoard.resetGame();
    }
  }

  // Restart game button
  modalRestartButton.onclick = function() {
    modalPopup.style.display = "none";
    let buttonClickAudio = document.getElementById("button-audio");
    buttonClickAudio.play();
    gameBoard.resetGame();
    gameController.reset();
    gameController.resetScores();
  }
  
  // Play again button
  modalPlayAgainButton.onclick = function() {
    modalPopup.style.display = "none";
    let buttonClickAudio = document.getElementById("button-audio");
    buttonClickAudio.play();
    gameBoard.resetGame();
    gameController.reset();
    }

  return {
    player1Win,
    player2Win,
    Tie,
    computerPlayer1Win,
    computerPlayer2Win,
    computerTie
  }
})


// Gameboard
const gameBoard = (() => {

  const gameStartAnimation = function () {

    // Elements
    const startingScreenBackground = document.querySelector(".header-container");
    let computerButton = document.querySelector("#computer-button");
    let playerButton = document.querySelector("#player-button");
    let mainScreenAudio = document.getElementById("main-screen-audio");

    // Play main screen audio
    mainScreenAudio.play();

    // Play vs. Computer
    computerButton.onclick = function (event) {
        startingScreenBackground.classList.add("game-started");
        let buttonClickAudio = document.getElementById("button-audio");
        buttonClickAudio.play();
        mainScreenAudio.pause();
        computerButton.style.display = "none";
        playerButton.style.display = "none";
        gameBoard.computerInit(event);
    }

    // Play vs. Player
    playerButton.onclick = function () {
      startingScreenBackground.classList.add("game-started");
      let buttonClickAudio = document.getElementById("button-audio");
      buttonClickAudio.play();
      mainScreenAudio.pause();
      playerButton.style.display = "none";
      computerButton.style.display = "none";
    }
  }

  gameStartAnimation();

  let boardArray = [];

  const computerInit = function (event) {

    // Form submit button audio
    let buttonClickAudio = document.getElementById("button-audio");
    buttonClickAudio.play();

    // Elements
    const gameContainerDiv = document.querySelector(".game-container");
    const twoPlayerForm = document.querySelector(".two-player-form");
    const playerOneDiv = document.querySelector(".player-one");
    const playerTwoDiv = document.querySelector(".player-two");
    const playerOneNameDiv = document.querySelector(".player-one-name-div");
    const playerTwoNameDiv = document.querySelector(".player-two-name-div");
    const playerOneName = "Player";
    const playerTwoName = "Computer";

    // Hide the form
    twoPlayerForm.style.display = "none";

    // For loop to create grid
    for (i=0; i<9; i++) {

      // Create cell div and append to game container
      const cellDiv = document.createElement("div");
      const cellDivClass = document.createAttribute("class");
      const playerMarker = document.createElement('img');
      cellDivClass.value = "game-cell";
      cellDiv.appendChild(playerMarker);
      cellDiv.setAttributeNode(cellDivClass);
      cellDiv.setAttribute("data-id", i);
      cellDiv.setAttribute("data-player", '');
      boardArray.push(cellDiv);
      gameContainerDiv.appendChild(cellDiv);
    }

    // Add event listener to grid
    gameController.mainGameEventListener();

    // Add class to make no opacity
    gameContainerDiv.classList.add("no-opacity");

    // Wait 1000ms and increase opacity of div
    setTimeout(function () { 
      gameContainerDiv.classList.add("increase-opacity");
      let playerOneNameTextNode = document.createTextNode(playerOneName);
      let playerTwoNameTextNode = document.createTextNode(playerTwoName);
      playerOneNameDiv.appendChild(playerOneNameTextNode);
      playerTwoNameDiv.appendChild(playerTwoNameTextNode);
      playerOneDiv.classList.add("increase-opacity");
      playerTwoDiv.classList.add("increase-opacity");
    }, 1000);

    return {

    }
  }

  const playerInit = function (event) {

    // Form submit button audio
    let buttonClickAudio = document.getElementById("button-audio");
    buttonClickAudio.play();

    event.preventDefault();

    // Elements
    const gameContainerDiv = document.querySelector(".game-container");
    const twoPlayerForm = document.querySelector(".two-player-form");
    const playerOneDiv = document.querySelector(".player-one");
    const playerTwoDiv = document.querySelector(".player-two");
    const playerOneNameDiv = document.querySelector(".player-one-name-div");
    const playerTwoNameDiv = document.querySelector(".player-two-name-div");
    const playerOneName = document.getElementById("player-one-name").value;
    const playerTwoName = document.getElementById("player-two-name").value;

    // Hide the form
    twoPlayerForm.style.display = "none";

    // For loop to create grid
    for (i=0; i<9; i++) {

      // Create cell div and append to game container
      const cellDiv = document.createElement("div");
      const cellDivClass = document.createAttribute("class");
      const playerMarker = document.createElement('img');
      cellDivClass.value = "game-cell";
      cellDiv.appendChild(playerMarker);
      cellDiv.setAttributeNode(cellDivClass);
      cellDiv.setAttribute("data-id", i);
      cellDiv.setAttribute("data-player", '');
      boardArray.push(cellDiv);
      gameContainerDiv.appendChild(cellDiv);
    }

    // Add event listener to grid
    gameController.mainGameEventListener();

    // Add class to make no opacity
    gameContainerDiv.classList.add("no-opacity");

    // Wait 1000ms and increase opacity of div
    setTimeout(function () { 
      gameContainerDiv.classList.add("increase-opacity");
      let playerOneNameTextNode = document.createTextNode(playerOneName);
      let playerTwoNameTextNode = document.createTextNode(playerTwoName);
      playerOneNameDiv.appendChild(playerOneNameTextNode);
      playerTwoNameDiv.appendChild(playerTwoNameTextNode);
      playerOneDiv.classList.add("increase-opacity");
      playerTwoDiv.classList.add("increase-opacity");
    }, 1000);

    return {

    }
  }

  const resetGame = function () {
    boardArray.forEach(cell => {
      cell.dataset.player = '';
      cell.removeChild(cell.firstChild);
      const img = document.createElement('img');
      cell.appendChild(img);
  })
  }

  return {
    gameStartAnimation,
    boardArray,
    computerInit,
    playerInit,
    resetGame,
  };
})();



// Game Controller
const gameController = (() => {

  // Elements
  const playerOneScoreDiv = document.querySelector(".player-one-score-div");
  const playerTwoScoreDiv = document.querySelector(".player-two-score-div");
  const playerTwoNameDiv = document.querySelector(".player-two-name-div");

  // Create players
  let player1 = PlayerFactory("Player 1", "images/player.png");
  let player2 = PlayerFactory("Player 2", "images/computer.png");

  // Initialise game variables
  let round = 0;
  let maxRounds = 9;
  let turn = 0;
  let player1Score = 0;
  let player2Score = 0;

  // Main game function
  const play = function (e) {

    // Display modal pop-up for tie
    if (round == maxRounds) {
      if (checkWinner() == undefined) {
        player1Score++;
        player2Score++;
        playerOneScoreDiv.innerHTML = player1Score;
        playerTwoScoreDiv.innerHTML = player2Score;
        round = 0;
        if (playerTwoNameDiv.innerHTML == "Computer") {
          modal().computerTie();
        }
        else (modal().Tie());
        return false;
      }
    }

    switch (turn) {
      case 0:
        if (player1.play(e)) {
          let player1Audio = document.getElementById("player-1-audio");
          player1Audio.play();
          e.target.dataset.player = 0;
          round++;
          turn = 1;
          if (checkWinner() == 0) {
            player1Score++;
            playerOneScoreDiv.innerHTML = player1Score;
            round = 0;
            if (playerTwoNameDiv.innerHTML == "Computer") {
              modal().computerPlayer1Win();
            }
            else (modal().player1Win());
          }
        }
        break;
      case 1:
        if (player2.play(e)) {
          let player2Audio = document.getElementById("player-2-audio");
          player2Audio.play();
          e.target.dataset.player = 1;
          round++;
          turn = 0;
          if (checkWinner() == 1) {
            player2Score++;
            playerTwoScoreDiv.innerHTML = player2Score;
            round = 0;
            console.log(playerTwoScoreDiv.innerHTML);
            if (playerTwoNameDiv.innerHTML == "Computer") {
              modal().computerPlayer2Win();
            }
            else (modal().player2Win());
          }
        }
        break;
        }
    }
  
  // Check winner function
  const checkWinner = function () {

    // Initialise winner variable
    let gameWinner = '';

    // For loop checking for horizontal wins
    for (i=0; i<9; i=i+3) {
      if (gameBoard.boardArray[i].dataset.player) {
        if ((gameBoard.boardArray[i].dataset.player == gameBoard.boardArray[i+1].dataset.player) && (gameBoard.boardArray[i+1].dataset.player == gameBoard.boardArray[i+2].dataset.player)) {
          gameWinner = gameBoard.boardArray[i].dataset.player;
          return gameWinner;
        }
      }
    }

    // For loop checking for vertical wins
    for (i=0; i<3; i++) {
      if (gameBoard.boardArray[i].dataset.player) {
        if ((gameBoard.boardArray[i].dataset.player == gameBoard.boardArray[i+3].dataset.player) && (gameBoard.boardArray[i+3].dataset.player == gameBoard.boardArray[i+6].dataset.player)) {
          gameWinner = gameBoard.boardArray[i].dataset.player;
          return gameWinner;
        }
      }
    }

    // For loop checking for diagonal wins
    if (gameBoard.boardArray[0].dataset.player) {
      if ((gameBoard.boardArray[0].dataset.player == gameBoard.boardArray[4].dataset.player) && (gameBoard.boardArray[4].dataset.player == gameBoard.boardArray[8].dataset.player)) {
        gameWinner = gameBoard.boardArray[0].dataset.player;
        return gameWinner;
      }
    }

    // For loop checking for diagonal wins
    if (gameBoard.boardArray[2].dataset.player) {
      if ((gameBoard.boardArray[2].dataset.player == gameBoard.boardArray[4].dataset.player) && (gameBoard.boardArray[4].dataset.player == gameBoard.boardArray[6].dataset.player)) {
        gameWinner = gameBoard.boardArray[2].dataset.player;
        return gameWinner;
      }
    }
  }

  // Reset function
  const reset = function () {
    turn = 0;
    round = 0;
  }

  // Reset scores
  const resetScores = function () {
    player1Score = 0;
    player2Score = 0;
    const playerOneScoreDiv = document.querySelector(".player-one-score-div");
    const playerTwoScoreDiv = document.querySelector(".player-two-score-div");
    playerOneScoreDiv.innerHTML = player1Score;
    playerTwoScoreDiv.innerHTML = player2Score;
  }

  // Add click event listener
  const mainGameEventListener = function () {
    let cells = document.querySelectorAll(".game-cell").forEach(cell => {
        cell.addEventListener("click", play);
    });
  }
    
  return {
    reset,
    resetScores,
    mainGameEventListener
  };
})();

