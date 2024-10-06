import Queue from "./Queue.js";
import * as view from "./view.js";

export { start };

window.addEventListener("load", init);

let model;
// let gridSize = { rows: 3, cols: 3 };
// let gridSize = { rows: 10, cols: 10 };
let gridSize = { rows: 20, cols: 30 };
let foodObj = { row: -1, col: -1, val: "food" };
let timer = 400;
let highscore = 0;
let nextSpawn;

function init() {
  view.initView(gridSize);

  start();
}

function start() {
  console.log("starting new game in controller");
  model = new Queue();
  model.enqueue({ row: Math.floor(gridSize.rows / 2), col: Math.floor(gridSize.cols / 2), val: "snake" });

  view.newGame();
  spawnFood();
  tick();
}

function spawnFood() {
    // Get all the currently occupied tiles
  const snakeIndices = [];
  let index = 0;
  let current = model.get(index++);
  while (current) {
    // Converting rows and cols to indexes for easier arithmetic
    snakeIndices.push(current.data.row * gridSize.rows + current.data.col);
    current = model.get(index++);
  }

  let maxIndex = gridSize.rows * gridSize.cols;
  const foodIndex = Math.floor(Math.random() * maxIndex);
  let startIndex = foodIndex;
  let occupied = true;
  let change = 1;

  // Compare the current index to every index in the taken array
  // until the entire array has been searched without finding a match
  while (occupied) {
    for (const index of snakeIndices) {
      if (index == foodIndex) {
        // If we get to the last legal tile without finding a free tile, start looking in the opposite direction
        if (startIndex == maxIndex - 1) {
          change = -1;
          foodIndex = startIndex;
        } else if (foodIndex == 0) {
          console.log("No available tiles for food to spawn!! you won?");
          break;
        }
        foodIndex += change;
        break;
      }
    }
    occupied = false;
  }
  
  foodObj.row = Math.floor(foodIndex / gridSize.cols);
  foodObj.col = Math.floor(foodIndex % gridSize.rows);

  view.updateTile(foodObj);
}

function tick() {
  for (const tile of model) {
    view.removeClass(tile.data);
  }

  const currentDir = view.getDirection();

  const newData = { ...model.tail.data };

  switch (currentDir) {
    case "a":
    case "arrowleft":
      newData.col--;
      break;
    case "d":
    case "arrowright":
      newData.col++;
      break;
    case "w":
    case "arrowup":
      newData.row--;
      break;
    case "s":
    case "arrowdown":
      newData.row++;
      break;
  }

  wrapCoordinates(newData);

  model.move(newData);

  if (model.hasDuplicates()) {
    console.log("Game over!!!");
    if (model.size() > highscore) {
      highscore = model.size();
    }
    view.gameOver(highscore);

    // Stop the next food from spawning
    clearTimeout(nextSpawn);
  } else {

    if (isOnFood(newData)) {
      view.removeClass(foodObj);
      // Make sure it cant be eaten more than once
      foodObj.col = -1;

      model.eat();

      nextSpawn = setTimeout(spawnFood, timer * 4);
    }

    setTimeout(tick, timer);
    for (const tile of model) {
      view.updateTile(tile.data);
    }
  }
}

function isOnFood(tile) {
  return tile.row == foodObj.row && tile.col == foodObj.col;
}

function wrapCoordinates(tile) {
  if (tile.row < 0) {
    tile.row = gridSize.rows - 1;
  } else if (tile.row >= gridSize.rows) {
    tile.row = 0;
  } else if (tile.col < 0) {
    tile.col = gridSize.cols - 1;
  } else if (tile.col >= gridSize.cols) {
    tile.col = 0;
  }
}
