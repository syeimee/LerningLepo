let canvas, ctx, animationId, lastTime, fps, interval;
let angle;
setup();
animate(0);

window.addEventListener('resize', () => {
    setup();
    animate(0);
})

// window.addEventListener('click', () => {
//     if(animationId){
//         cancelAnimationFrame(animationId);
//         animationId = null;
//     }else{
//         animate();
//     }
// })

function setup(){
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor = "#222";
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.translate(canvas.width/2, canvas.height/2);
    animationId = null;
    lastTime = 0;
    fps = 30; // frame per second
    interval = 1000 / fps; // ms
    angle = 0;
}

function draw(){
    // translateSample();
    // rotateSample();
    // scaleSample();
    transformationSample();
}

function update(){
   angle += 0.05;
}

function animate(timestamp){
    if(timestamp - lastTime > interval){
        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);
        draw();
        update();
        lastTime = timestamp;
    }
    animationId = requestAnimationFrame(animate);
}

function drawArrow(){
    ctx.textAlign = 'left';
    ctx.textBaseline = "middle";
    ctx.font = "120px monospace";
    ctx.fillText('→', 300, 0);
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(300, 0);
    ctx.stroke();
}

function translateSample(){
    ctx.save();
    ctx.translate(100, 100);
    drawArrow();
    ctx.translate(200, 200);
    drawArrow();
    ctx.restore();

    ctx.save();
    ctx.fillStyle = "#0fa";
    ctx.translate(200, 200);
    drawArrow();
    ctx.restore();
}

function rotateSample(){
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    drawArrow();
    ctx.rotate(Math.PI/6);
    drawArrow();
    ctx.rotate(Math.PI/6);
    drawArrow();
    ctx.beginPath();
    ctx.arc(-300, 0, 50, 0, Math.PI*2);
    ctx.fill();
    ctx.restore();
}

function scaleSample(){
    ctx.save();
    ctx.translate(canvas.width/2, canvas.height/2);
    drawArrow();
    ctx.rotate(Math.PI);
    ctx.scale(1.5, 5);
    drawArrow();
    ctx.restore();
}

function transformationSample(){
    ctx.save();
    ctx.rotate(angle);
    ctx.translate(300*Math.sin(angle/2), 300);
    ctx.scale(Math.sin(angle*3) + 1, Math.cos(angle) + 1);
    ctx.fillRect(-50, -50, 100, 100);
    ctx.restore();
}
