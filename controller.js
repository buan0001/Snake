import Queue from "./Queue.js";
import * as view from "./view.js";

export { start };

window.addEventListener("load", init);

let model;
let gridSize = { rows: 3, cols: 3 };
// let gridSize = { rows: 10, cols: 10 };
// let gridSize = { rows: 20, cols: 30};
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
  model.enqueue({ row: gridSize.rows - 1, col: gridSize.cols - 1, val: "snake" });
  //   model.enqueue({ row: 5, col: 5, val: "snake" });

  view.newGame();
  spawnFood();
  tick();
}

function spawnFood() {
  console.log("Spawning food");

  foodObj.row = Math.floor(Math.random() * gridSize.rows);
  foodObj.col = Math.floor(Math.random() * gridSize.cols);
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
      console.log("eating");
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
