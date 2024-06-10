const winCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
const MAX_TURNS = 9;
const gameSquares = document.querySelectorAll('.game-square');
const gameHeading = document.getElementById('game-heading');
const restartButton = document.getElementById('restart-button');
// 1 - X; 2 - O
let currPlayer = 1;
let countTurns = 0;
const playerMatch = {
  1: 'X',
  2: 'O',
};

function switchPlayer() {
  currPlayer = currPlayer === 1 ? 2 : 1;
}

function setHeading(heading) {
  gameHeading.textContent = heading;
}

function endGame() {
  restartButton.style.display = 'block';
  gameSquares.forEach((square) => (square.disabled = true));
}

function getWinner() {
  return winCombinations.some((condition) => {
    return condition.every((gameSquarePosition) => {
      return (
        gameSquares[gameSquarePosition].textContent === playerMatch[currPlayer]
      );
    });
  });
}

function onGameSquareClick() {
  this.disabled = true;

  this.textContent = playerMatch[currPlayer];
  countTurns++;

  if (getWinner()) {
    setHeading(`Player ${currPlayer} Won!`);
    endGame();
    return;
  }

  if (countTurns === MAX_TURNS) {
    setHeading('Tie Game!');
    endGame();
    return;
  }

  switchPlayer();
  setHeading(`Player ${currPlayer}'s Turn`);
}

function restartGame() {
  restartButton.style.display = 'none';
  currPlayer = 1;
  countTurns = 0;
  setHeading(`Player 1's Turn`);
  gameSquares.forEach((square) => {
    square.textContent = '';
    square.disabled = false;
  });
}

function init() {
  gameSquares.forEach((square) =>
    square.addEventListener('click', onGameSquareClick)
  );
  restartButton.addEventListener('click', restartGame);
}

init();
