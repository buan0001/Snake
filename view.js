import * as controller from "./controller.js";

export { initView, getDirection,  updateTile, clearTile, removeClass, gameOver, newGame };

const board = document.querySelector("#grid");
let tiles = [];
let currentDirection = null;
let rowSize;

const validInput = ["w", "a", "s", "d", "arrowdown", "arrowright", "arrowup", "arrowleft"];

function initView(sizeOfGrid) {
  rowSize = sizeOfGrid.cols;

  document.addEventListener("keydown", keyPressed);
  document.querySelector("#restart-btn").addEventListener("click", controller.start);
  board.style.setProperty("--GRID_WIDTH", sizeOfGrid.cols);

  
  initBoard(sizeOfGrid);
}

function newGame() {
  clearBoard()
  document.querySelector("#gameOver").textContent = "";
  document.querySelector("#restart-btn").hidden = true;
}

function keyPressed(event) {
  const key = event.key.toLowerCase();
  const foundIndex = validInput.findIndex((element) => element == key);

  if (foundIndex >= 0 && !isOppositeDirection(key)) {
    // console.log("not opposite direction");

    currentDirection = foundIndex;
  }
}

function getDirection() {
  return validInput[currentDirection];
}

function initBoard(gridSize) {
  board.innerHTML = "";
  for (let i = 0; i < gridSize.rows * gridSize.cols; i++) {
    const node = document.createElement("div");
    node.classList.add("cell");
    node.id = i;
    board.appendChild(node);
    tiles.push(node);
  }
}

function clearBoard() {
  for (const tile of tiles) {
    tile.className = "cell"
  }
}

function updateTile(data) {
  const index = data.row * rowSize + data.col;
  tiles[index].classList.toggle(data.val);
}

function removeClass(data) {
  const index = data.row * rowSize + data.col;
  tiles[index].classList.remove(data.val);
}

function clearTile(data) {
  const index = data.row * rowSize + data.col;
  tiles[index].className = "cell";
}

function gameOver(highscore) {
  document.querySelector("#gameOver").textContent = "You lost!!";
  document.querySelector("#restart-btn").hidden = false;
  
  document.querySelector("#highscore").textContent = highscore;
}

function isOppositeDirection(key) {
  const len = validInput.length;
  let firstIndex;
  let secondIndex;
  // Different logic depending on whether the currentDirecion is an arrowkey or wasd
  // 2 is the length between any two opposing values within the same "type" (arrowkeys or wasd)
  // The length between two opposing values of different "types" is 2 + half the length of the array
  // Difference between 'a' and 'd' == 2
  // Difference between 'a' and 'arrowright' == 6
  if (currentDirection >= len / 2) {
    firstIndex = (currentDirection + 2) % len;
    if (firstIndex < len / 2) {
      // Add 4 to get to the arrowkey values if the array did indeed wrap
      firstIndex += 4;
    }
    secondIndex = (currentDirection + len / 2) % len;
  } else {
    firstIndex = (currentDirection + 2) % (len / 2);
    secondIndex = currentDirection + len / 2;
  }

  let firstMatch = validInput[firstIndex];
  let secondMatch = validInput[secondIndex];
  if (key == firstMatch || key == secondMatch) {
    return true;
  } else {
    return false;
  }
}
