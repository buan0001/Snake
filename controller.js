import Queue from "./Queue.js";
import * as view from "./view.js"


window.addEventListener("load", start)

let model;
function start(){
    console.log("controller started");
    model = new Queue()
    
    view.initView(model)
}