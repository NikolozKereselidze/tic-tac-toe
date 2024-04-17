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
    if (gameboard[index] === "") {
      gameboard[index] = value;
      renderGame();
      GameController.togglePlayer();
    }
  };

  return {
    renderGame,
    update,
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
  };

  const restartGame = () => {
    players = [];
    currentPlayerIndex = 0;
    endGame = false;
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
    // get board index
    const index = event.target.id.split("-")[1];

    // call the function to update the board
    GameBoard.update(index, players[currentPlayerIndex].move);
  };

  return {
    startGame,
    restartGame,
    handleClick,
    togglePlayer,
  };
})();

startButton.addEventListener("click", GameController.startGame);
restartButton.addEventListener("click", GameController.restartGame);
