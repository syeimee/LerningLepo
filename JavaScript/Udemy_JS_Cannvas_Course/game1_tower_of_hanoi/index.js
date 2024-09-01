import {Manager} from './manager.js';

let canvas, ctx, animationId, lastTime, fps, interval;
let manager;

setup();
animate(0);

window.addEventListener('resize', () => {
    setup();
    animate(0);
})

function setup(){
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // canvas.style.backgroundColor = "#222";
    // ctx.fillStyle = "#fff";
    // ctx.strokeStyle = "#fff";
    animationId = null;
    lastTime = 0;
    fps = 30; // frame per second
    interval = 1000 / fps; // ms
    manager = new Manager(canvas, ctx);
    manager.controller.getMousePosition();
    manager.controller.addMouseDown();
    manager.controller.clearKeys();
    manager.controller.addKeys();
}

function draw(){
    manager.draw();
}

function update(){
    manager.update();
}

function animate(timestamp){
    pauseControl();

    if(!manager.controller.pause){
        if(timestamp - lastTime > interval){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            draw();
            update();
            lastTime = timestamp;
        }
    }
    animationId = requestAnimationFrame(animate);
}

function pauseControl(){
    if(manager.state === manager.states[1]){
        if(manager.controller.keys.includes('p') && !manager.controller.pause){
            manager.controller.pause = true;
            ctx.save();
            ctx.fillStyle = "rgba(100, 0, 100, 0.5)";
            ctx.font = `italic ${canvas.width/15}px Candara`;
            ctx.fillText("PAUSE", canvas.width/2, canvas.height/2);
            ctx.font = `italic ${canvas.width/20}px Candara`;
            ctx.fillText("Press 'o' to Resume", canvas.width/2, canvas.height * 2/3);
            ctx.restore();
        }
        if(manager.controller.keys.includes('o')){
            manager.controller.pause = false;
        }
    }
}

