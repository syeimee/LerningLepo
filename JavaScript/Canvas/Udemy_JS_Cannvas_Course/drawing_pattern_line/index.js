import {Lint} from './lint.js';
let canvas, ctx, lints;

setup();
draw();

window.addEventListener('resize', () => {
    setup();
    draw();
})

window.addEventListener('click', e => {
    // console.log(e);
    erase(e.clientX, e.clientY);
    lints.forEach((lint, index) => {
        // const dist = Math.sqrt((e.clientX - lint.x)**2 + (e.clientY - lint.y)**2);
        // if(dist < 50){
        //     lints.splice(index, 1);
        //     console.log(lints)
        // }
        lint.update(e.clientX, e.clientY);
        // console.log(lint.isErased);
        lints = lints.filter(lint => !lint.isErased);
        console.log(lints);
    })
})

function setup(){
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#222";
    lints = createLints(10);
    // console.log(lints)
}

function draw(){
    lints.forEach(lint => {
        lint.draw();
    })
}

function createLints(n){
    const lints = [];
    for(let i = 0; i < n; i++){
        const lint = new Lint(canvas, ctx);
        lints.push(lint);
    }
    return lints
}

function erase(x, y){
    ctx.clearRect(x, y, 50, 50);
}

// 一度確認してみてください
// console.log(window)
// console.log(ctx)