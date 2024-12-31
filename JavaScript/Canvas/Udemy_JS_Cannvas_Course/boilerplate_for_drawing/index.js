let canvas, ctx;

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
    canvas.style.backgroundColor ="black";
}

function draw(){
    
}

// 一度確認してみてください
// console.log(window)
// console.log(ctx)