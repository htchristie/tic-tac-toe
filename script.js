let currentPlayer = "X";
let sounds = [];
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const cells = document.querySelectorAll('.cell');
const resetBtn = document.querySelector('#reset-btn');
const turnLabel = document.querySelector('#player-turn');
const playerLabel = document.querySelector('#player');
const announcement = document.querySelector('#announcement');

function resetGame() {
  resetBtn.classList.add('hide');
}

const SND_PATH = [
  "audio/move.wav",
  "audio/win.wav",
  "audio/lose.wav"
];

SND_PATH.forEach(path => {
  const audio = new Audio(path);
  sounds.push(audio);
});

cells.forEach(cell => {
  cell.addEventListener("click", cellListener);
});

function cellListener(e) {
  const cell = e.target;
  if (cell.innerText !== "") {
    return;
  }
  
  placeMark(cell);

  if (checkWin()) {
    endGame(false)
  } else if (checkDraw()) {
    endGame(true)
  } else {
  switchPlayer();
  }
}

function placeMark(cell) {
  currentPlayer === "X" ? cell.classList.add('x-marker') : cell.classList.add('o-marker');
  sounds[0].cloneNode(true).play(); //permite tocar o áudio várias vezes simultâneamente

  cell.innerText = currentPlayer;
}

function switchPlayer() {
  currentPlayer === "X" ? currentPlayer = "O" : currentPlayer = "X";
  updatePlayer();
}

function updatePlayer() {
  playerLabel.innerText = currentPlayer;
}

function checkDraw() {
  return [...cells].every(cell => {
    return cell.innerText !== "";
  });
}

function endGame(draw) {
  if (draw) {
    announcement.innerHTML = "Draw!"
    sounds[2].play();
  } else {
    announcement.innerText = currentPlayer === "X" ? "X WON!" : "O WON!"
    sounds[1].play();
  }

  cells.forEach(cell => {
    cell.removeEventListener('click', cellListener);
    cell.style.cursor = "default";
  });

  turnLabel.classList.add("hide-display");
  announcement.classList.remove("hide-display");
  resetBtn.classList.remove("hide-opacity");
}

function checkWin() {
  let currentClass;

  if (currentPlayer === "X") {
    currentClass = "x-marker"
  } else if (currentPlayer === "O") {
    currentClass = "o-marker"
  }

  return WINNING_COMBINATIONS.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function resetGame() {
  cells.forEach(cell => {
    cell.innerText = "";
    cell.classList.remove("x-marker", "o-marker");
    cell.addEventListener('click', cellListener);
    cell.style.cursor = "pointer";
  });
  
  currentPlayer = "X";
  updatePlayer();

  turnLabel.classList.remove("hide-display");
  announcement.classList.add("hide-display");
  resetBtn.classList.add("hide-opacity");
}
