import Queue from "./Queue.js";
import * as view from "./view.js";

window.addEventListener("load", start);

let model;
let gridSize = 10;
let foodObj = { row: -1, col: -1, val:"food" };
let timer = 1000;

function start() {
  console.log("controller started");
  model = new Queue();
  model.enqueue({ row: 5, col: 5, val: "snake" });

  view.initView(gridSize);

  window.model = model;
  window.view = view;
  spawnFood();
  tick();
}

function spawnFood() {
    foodObj.row = Math.floor(Math.random()*gridSize)
    foodObj.col = Math.floor(Math.random()*gridSize)
    view.updateTile(foodObj)
}

function tick() {
  setTimeout(tick, timer);

  for (const tile of model) {
    view.clearTile(tile.data);
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

  if (isOnFood(newData)) {
    view.clearTile(foodObj)
    model.eat();
  }

  model.move(newData);

  for (const tile of model) {
    view.updateTile(tile.data);
  }
}

function isOnFood(tile) {
  return tile.row == foodObj.row && tile.col == foodObj.col;
}

// function moveLeft() {
//   if (model.tail) {
//     const newData = { ...model.tail.data };
//     newData.col--;
//     wrapCoordinates(newData);
//     model.move(newData);
//   }
// }
// function moveRight() {
//   if (model.tail) {
//     const newData = { ...model.tail.data };
//     newData.col++;
//     wrapCoordinates(newData);
//     model.move(newData);
//   }
// }
// function moveUp() {
//   if (model.tail) {
//     const newData = { ...model.tail.data };
//     newData.row--;
//     wrapCoordinates(newData);
//     model.move(newData);
//   }
// }
// function moveDown() {
//   if (model.tail) {
//     const newData = { ...model.tail.data };
//     newData.row++;
//     wrapCoordinates(newData);
//     model.move(newData);
//   }
// }

function wrapCoordinates(tile) {
  if (tile.row < 0) {
    tile.row = gridSize - 1;
  } else if (tile.row >= gridSize) {
    tile.row = 0;
  } else if (tile.col < 0) {
    tile.col = gridSize - 1;
  } else if (tile.col >= gridSize) {
    tile.col = 0;
  }
}
