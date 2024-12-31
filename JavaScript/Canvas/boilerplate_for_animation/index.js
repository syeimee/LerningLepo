let canvas, ctx,animationId,lastTime,fps,interval;
let n = 0;
let x = 100;
window.addEventListener('resize', () => {
    setup();
    draw();
})
window.addEventListener('click',()=>{
    if(animationId){
        cancelAnimationFrame(animationId);//これだけだとnullにはならない
        animationId = null;
    }else{
        animate();
    }
})
function setup(){
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor ="black";
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    animationId = null;
    lastTime = 0;
    fps = 30;
    interval = 1000 /fps;

}

function draw(){
    ctx.beginPath();
    ctx.rect(x,100,200,200);
    ctx.fill();

}

function update(){
    x += 5;

}


function animate(timestamp){
    if(timestamp - lastTime > interval){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        draw();
        update();
        lastTime = timestamp;
    }
    animationId = requestAnimationFrame(animate);

}



setup();
animate();
