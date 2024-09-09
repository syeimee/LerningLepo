let canvas, ctx, animationId, lastTime, fps, interval;
let y = 0;

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
    animationId = null;
    lastTime = 0;
    fps = 30; // frame per second
    interval = 1000 / fps; // ms
}

function draw(){
    gradientBackground();
    gradientRect();
    gradientCircle();
    sphere();
}

function update(){
    y += 3;
}

function animate(timestamp){
    if(timestamp - lastTime > interval){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        update();
        lastTime = timestamp;
    }
    animationId = requestAnimationFrame(animate);
}

function gradientBackground(){
    ctx.save();
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#e3879e");
    gradient.addColorStop(0.4, "#fec0ce");
    gradient.addColorStop(1, "#f1a66a");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
}

function gradientRect(){
    ctx.save();
    ctx.filter = "blur(5px)";
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
    gradient.addColorStop(0, "#f00");
    gradient.addColorStop(0.2, "#faa");
    gradient.addColorStop(0.4, "#0f0");
    gradient.addColorStop(0.6, "#afa");
    gradient.addColorStop(0.8, "#aaf");
    gradient.addColorStop(1, "#00f");
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.fillRect(0, 0, canvas.width/10, canvas.height);
    ctx.fillRect(canvas.width/10, y, canvas.width/10, 100);
    ctx.restore();
}

function gradientCircle(){
    ctx.save();
    const radialGradient = ctx.createRadialGradient(canvas.width/2-50, canvas.height/5-50, 20, canvas.width/2-40, canvas.height/5-40, 80);
    radialGradient.addColorStop(0, "#fff");
    radialGradient.addColorStop(0.2, "#f00");
    radialGradient.addColorStop(0.5, "#0f0");
    radialGradient.addColorStop(0.8, "#00f");
    radialGradient.addColorStop(1, "#666");
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/5, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}

function sphere(){
    ctx.save();
    // ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    // ctx.beginPath();
    // ctx.ellipse(canvas.width/2+20, canvas.height/2+150, 100, 20, 0, 0, Math.PI*2);
    // ctx.fill();
    // ctx.shadowColor = "rgba(0, 0, 0, 0.1)";
    // ctx.shadowOffsetX = 90;
    // ctx.shadowOffsetY = 90;
    // ctx.shadowBlur = 10;
    ctx.filter = "drop-shadow(90px 90px 10px rgba(0,0,0,0.1))";
    const radialGradient = ctx.createRadialGradient(canvas.width/2-60, canvas.height/2-60, 25, canvas.width/2-50, canvas.height/2-50, 120);
    radialGradient.addColorStop(0, "#fff");
    radialGradient.addColorStop(1, "#aaa");
    ctx.fillStyle = radialGradient;
    ctx.beginPath();
    ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
}
