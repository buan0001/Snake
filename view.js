import * as controller from "./controller.js";

export { initView, getDirection };

const board = document.querySelector("#grid");
let tiles = [];
let currentDirection = "a";
function initView(gridSize) {
  console.log("View initted, gridSize is:", gridSize);
  document.addEventListener("keydown", keyPressed);

  board.style.setProperty("--GRID_WIDTH", gridSize);

  initBoard(gridSize);
}

function keyPressed(event) {
  const key = event.key.toLowerCase();
  const validInput = [
    ["w", "a", "s", "d"],
    ["arrowdown", "arrowleft", "arrowup", "arrowright"],
  ];
  console.log(event);

  //   console.log("isOppositeDirection?", isOppositeDirection(validInput, key));
  let found = false;
  for (const subArr of validInput) {
    for (const entry of subArr) {
      console.log(entry);
      if (entry == key) {
        found = true;
        break;
      }
    }
    if (found) break;
  }
  console.log("Is valid?", found);

  if (found && !isOppositeDirection(validInput, key)) {
    currentDirection = key
  }
}

function getDirection(){
    return currentDirection;
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

function updateTile(index) {}

function isOppositeDirection(validInput, key) {
  //   console.log("valid input:", validInput);
  const firstLen = validInput[0].length;
  const secondLen = validInput[1].length;
  const firstOpposite = validInput[0][(currentDirection + firstLen / 2) % firstLen];
  const secondOpposite = validInput[1][(currentDirection + secondLen / 2) % secondLen];
  //   console.log("firstOpposite", firstOpposite);
  //   console.log("secondOpposite", secondOpposite);
  if (firstOpposite == key || secondOpposite == key) {
    return true;
  }
  return false;
}
