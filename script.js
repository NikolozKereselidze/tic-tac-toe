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
      boardDiv.innerHTML = `${el}`;
      boardHTML.push(boardDiv);
    });
  };

  return {
    renderGame,
  };
})();
