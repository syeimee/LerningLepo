import {Ripple} from './ripple.js';
let canvas, ctx, ripples;

setup();
draw();

window.addEventListener('resize', () => {
    setup();
    draw();
})

function setup(){
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#222";
    ripples = createRipples(8);
    // console.log(ripples);
}

function draw(){
    ripples.forEach(ripple => {
        ripple.draw();
    })
}

function createRipples(n){
    const ripples = [];
    for(let i = 0; i < n; i++){
        const ripple = new Ripple(canvas, ctx, ripples);
        ripples.push(ripple);
    }
    return ripples
}

setInterval(() => {
    setup();
    draw();
}, 1000)