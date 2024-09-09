let canvas, ctx, animationId, lastTime, fps, interval;
let numOfCols, barWidth, marginX, values;

setup();
animate(0);

window.addEventListener('resize', () => {
    setup();
    animate(0);
})

window.addEventListener('click', () => {
    if(animationId){
        cancelAnimationFrame(animationId);
        animationId = null;
    }else{
        animate(0);
    }
})

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
    fps = 10; // frame per second
    interval = 1000 / fps; // ms
    numOfCols = 200;
    barWidth = Math.floor(canvas.width / numOfCols);
    marginX = canvas.width - barWidth * numOfCols;
    values = new Array(numOfCols).fill(0);
}

function draw(){
    drawBar();
}

function update(){
   updateValues(100, 50);
}

function animate(timestamp){
    // console.log(timestamp);
    if(timestamp - lastTime > interval){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        draw();
        update();
        lastTime = timestamp;
    }
    animationId = requestAnimationFrame(animate);
}

function pickUpIndex(rep){
    let total = 0;
    // const value1 = Math.random();
    // const value2 = Math.random();
    // total = value1 + value2;
    // const average = total/2;
    for(let i = 0; i < rep; i++){
        total += Math.random();
    }
    const average = total / rep;

    const index = Math.floor(average * numOfCols);

    return index
}

function updateValues(n, rep){
    for(let i = 0; i < n; i++){
        const index = pickUpIndex(rep);
        values[index] += 1;
    }
}

function drawBar(){
    for(let i = 0; i < numOfCols; i++){
        const barHeight = values[i];
        ctx.beginPath();
        ctx.fillRect(marginX/2 + barWidth * i, canvas.height, barWidth, - barHeight);
    }
}