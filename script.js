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
    let boardHTML = [];

    gameboard.forEach((el, i) => {
      const boardDiv = document.createElement("div");
      boardDiv.setAttribute("id", `board-${i}`);
      boardDiv.className = "board";
      boardDiv.innerHTML = `${el}`;
      boardHTML.push(boardDiv);
      document.querySelector("#gameboard").appendChild(boardDiv); // Append the boardDiv to the gameboard div
    });
  };

  return {
    renderGame,
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
    GameBoard.renderGame();
  };

  const restartGame = () => {
    players = [];
    currentPlayerIndex = 0;
    endGame = false;
  };

  return {
    startGame,
    restartGame,
  };
})();

startButton.addEventListener("click", GameController.startGame);
restartButton.addEventListener("click", GameController.restartGame);
