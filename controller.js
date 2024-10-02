import Queue from "./Queue.js";
import * as view from "./view.js"


window.addEventListener("load", start)

let model;
let gridSize = 10;
function start(){
    console.log("controller started");
    model = new Queue()
    
    view.initView(gridSize);

    tick()
}

let timer = 600;
function tick(){

    console.log("tick, tock");
    
    // setTimeout(tick, timer);
    const currentDir = view.getDirection()

    switch (currentDir){
        case "a":
        case "arrowleft":
            moveLeft()
            break;
        case "w":
        case "arrowup":
            moveUp()
            break;
        case "d":
        case "arrowright":
            moveRight()
            break;
        case "s":
        case "arrowdown":
            moveDown()
            break;
    }

}


function name(params) {
    
}
