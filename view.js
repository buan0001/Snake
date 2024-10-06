import * as controller from "./controller.js";

export { initView, getDirection, updateBoard, updateTile, clearTile };

const board = document.querySelector("#grid");
let tiles = [];
let currentDirection = 1;
// let currentDirection = "a";
let gridSize;

const validInput = ["w", "a", "s", "d", "arrowdown", "arrowright", "arrowup", "arrowleft"];
// const validInput = ["w", "a", "s", "d", "arrowup", "arrowright", "arrowdown", "arrowleft"];

function initView(sizeOfGrid) {
  gridSize = sizeOfGrid;
  console.log("View initted, gridSize is:", sizeOfGrid);
  document.addEventListener("keydown", keyPressed);

  board.style.setProperty("--GRID_WIDTH", sizeOfGrid);

  initBoard(sizeOfGrid);
}

function keyPressed(event) {
  const key = event.key.toLowerCase();
  // const validInput = [
  //   ["w", "a", "s", "d"],
  //   ["arrowdown", "arrowleft", "arrowup", "arrowright"],
  // ];

  // let found = false;
  // for (const subArr of validInput) {
  //   for (const entry of subArr) {
  //     if (entry == key) {
  //       found = true;
  //       break;
  //     }
  //   }
  //   if (found) break;
  // }
  const foundIndex = validInput.findIndex((element) => element == key);

  if (foundIndex >= 0 && !isOppositeDirection(key)) {
    console.log("not opposite direction");

    currentDirection = foundIndex;
  }
}

function getDirection() {
  return validInput[currentDirection];
}

function initBoard(gridSize) {
  for (let i = 0; i < gridSize * gridSize; i++) {
    const node = document.createElement("div");
    node.classList.add("cell");
    node.id = i;
    board.appendChild(node);
    tiles.push(node);
  }
  console.log("tiles:", tiles);
}

function updateBoard(model) {}

function updateTile(data) {
  const index = data.row * gridSize + data.col;
  tiles[index].classList.toggle(data.val);
}

function clearTile(data) {
  const index = data.row * gridSize + data.col;
  tiles[index].className = "cell";
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
