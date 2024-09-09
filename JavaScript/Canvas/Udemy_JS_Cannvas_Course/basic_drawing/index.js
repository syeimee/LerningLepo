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
    canvas.style.backgroundColor = "#222";
}

function draw(){
    // ctx.strokeStyle = "#fff";
    // ctx.beginPath();
    // ctx.rect(100, 100, 100, 100);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.rect(300, 300, 100, 100);
    // ctx.stroke();
    // ctx.fillStyle = "#fff";
    // ctx.beginPath();
    // ctx.rect(100, 100, 100, 100);
    // ctx.fill();
    // ctx.beginPath();
    // ctx.rect(300, 300, 100, 100);
    // ctx.fill();
    // ctx.fillStyle = "#fff";
    // ctx.beginPath();
    // ctx.fillRect(100, 100, 100, 100);
    // ctx.strokeStyle = "#fff";
    // ctx.beginPath();
    // ctx.arc(300, 300, 100, 0, -Math.PI/2, true);
    // ctx.stroke();
    // ctx.fillStyle = "#fff";
    // ctx.beginPath();
    // ctx.arc(300, 300, 100, 0, Math.PI/2);
    // ctx.fill();
    // ctx.strokeStyle = "#fff";
    // ctx.beginPath();
    // ctx.arc(canvas.width/2, canvas.height/2, 100, 0, Math.PI*2);
    // ctx.stroke();
    // ctx.save();
    // ctx.strokeStyle = "#0fa";
    // ctx.lineWidth = 10;
    // ctx.beginPath();
    // ctx.arc(canvas.width/2, canvas.height/2, 150, 0, Math.PI*2);
    // ctx.stroke();
    // ctx.restore();
    // ctx.beginPath();
    // ctx.arc(canvas.width/2, canvas.height/2, 200, 0, Math.PI*2);
    // ctx.stroke();
    // ctx.strokeStyle = "#0fa";
    ctx.beginPath();
    ctx.ellipse(canvas.width/2, canvas.height/2, 150, 50, Math.PI/2, 0, Math.PI*2);
    ctx.stroke();
    ctx.strokeStyle = "#fff";
    ctx.fillStyle = "#00f";
    ctx.lineWidth = 3;
    ctx.beginPath();
    // ctx.moveTo(200, 200);
    // ctx.lineTo(500, 500);
    // ctx.lineTo(700, 300);
    // ctx.closePath();
    // ctx.fill();
    // ctx.stroke();
    // ctx.strokeStyle = "#fff";
    // ctx.lineWidth = 2;
    // ctx.fillStyle = "#0fa";
    // ctx.font = "80px Candara";
    // ctx.strokeText('hello', 300, 300);
    // ctx.fillText('canvas', 300, 500);
    // ctx.fillText('canvas', 300, 500);
    // ctx.strokeStyle = "#fff";
    // ctx.beginPath();
    // ctx.moveTo(400, 100);
    // ctx.lineTo(400, 500);
    // ctx.stroke();
    // ctx.beginPath();
    // ctx.moveTo(200, 300);
    // ctx.lineTo(600, 300);
    // ctx.stroke();
    // // (400, 300)
    // ctx.fillStyle = "#0fa";
    // ctx.font = "80px Candara";
    // ctx.textAlign = "right";   // left, center
    // ctx.textBaseline = "top";  // middle
    // ctx.fillText('Canvas', 400, 300);
}
