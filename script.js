let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];

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

function makeMove(cellIndex) {
  if (board[cellIndex] === "") {
    board[cellIndex] = currentPlayer;
    document.getElementById("board").children[cellIndex].innerText = currentPlayer;
    if (checkWinner(currentPlayer)) {
      document.getElementById("status").innerText = `Player ${currentPlayer} wins!`;
      disableBoard();
    } else if (checkDraw()) {
      document.getElementById("status").innerText = "It's a draw!";
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
    }
  }
}

function checkWinner(player) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return board[index] === player;
    });
  });
}

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
  Array.from(document.getElementById("board").children).forEach((cell) => {
    cell.innerText = "";
  });
  enableBoard();
}

function disableBoard() {
  Array.from(document.getElementById("board").children).forEach((cell) => {
    cell.onclick = null;
  });
}

function enableBoard() {
  Array.from(document.getElementById("board").children).forEach((cell, index) => {
    if (board[index] === "") {
      cell.onclick = () => makeMove(index);
    }
  });
}

document.getElementById("status").innerText = `Player ${currentPlayer}'s turn`;
