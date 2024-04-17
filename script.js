"use strict";

const startButton = document.querySelector("#start-button");
const restartButton = document.querySelector("#restart-button");

const GameBoard = (function () {
  // Define gameboard size
  const boardSize = 3 * 3;

  //   create gameboard array and push elements to it
  let gameboard = [];
  for (let i = 0; i < boardSize; i++) {
    gameboard.push("");
  }

  const renderGame = () => {
    let boardHTML = "";

    gameboard.forEach((el, i) => {
      boardHTML += `<div id="board-${i}" class="board">${el}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
  };

  const update = (index, value) => {
    gameboard[index] = value;
    renderGame();
  };

  const getGameBoard = () => gameboard;

  return {
    renderGame,
    update,
    getGameBoard,
  };
})();

const createPlayer = (name, move) => {
  return {
    name,
    move,
  };
};

const GameController = (function () {
  let players = [];
  let currentPlayerIndex;
  let endGame;

  const startGame = () => {
    players = [
      createPlayer(document.querySelector("#player1").value, "x"),
      createPlayer(document.querySelector("#player2").value, "o"),
    ];

    currentPlayerIndex = 0;
    endGame = false;
    GameBoard.renderGame();
    addClickEventListeners();
    toggleStart();
  };

  const toggleBoardHide = (el) => {
    el.classList.toggle("gameboard-show");
  };

  const toggleButtonHide = (el) => {
    el.classList.toggle("hidden");
  };

  const toggleStart = () => {
    toggleBoardHide(document.querySelector("#gameboard"));
    toggleButtonHide(restartButton);
    toggleButtonHide(document.querySelector(".controls"));
  };

  const addClickEventListeners = () => {
    // Add event listener to board
    const gameboard = document.querySelector("#gameboard");
    gameboard.addEventListener("click", handleClick);
  };

  const togglePlayer = () => {
    // toggle player index
    currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
  };

  const handleClick = (event) => {
    // Disable click events when endGame is true
    if (endGame) return;

    // get board index
    const index = event.target.id.split("-")[1];

    //   Check if clicked board already has sign
    if (GameBoard.getGameBoard()[index] !== "") return;

    // call the function to update the board
    GameBoard.update(index, players[currentPlayerIndex].move);

    if (winHandler(GameBoard.getGameBoard())) {
      endGame = true;
      console.log(players[currentPlayerIndex].name);
    }

    togglePlayer();
  };

  const restartGame = () => {
    for (let i = 0; i < 9; i++) {
      GameBoard.update(i, "");
    }
    currentPlayerIndex = 0;
    endGame = false;
    toggleStart();
    document.querySelector("#player1").value = "";
    document.querySelector("#player2").value = "";
  };

  return {
    startGame,
    restartGame,
    handleClick,
    togglePlayer,
  };
})();

function winHandler(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningCombinations.length; i++) {
    const [a, b, c] = winningCombinations[i];
    if (board[a]) {
      if (board[a] === board[b] && board[b] === board[c]) {
        return true;
      }
    }
  }
}

startButton.addEventListener("click", GameController.startGame);
restartButton.addEventListener("click", GameController.restartGame);
