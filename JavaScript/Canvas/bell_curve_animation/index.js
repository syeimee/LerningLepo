let canvas, ctx, animationId, lastTime, fps, interval;
let numOfCols,barWidth,marginX,values;

// numOfCols:カラムの数
// barWidth:棒グラフの幅
// marginX:棒グラフの左右の余白
// values:棒グラフの高さ


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
    fps = 60; 
    interval = 1000 / fps; 
    numOfCols = 40;
    barWidth = Math.floor(canvas.width / numOfCols);
    marginX = canvas.width - barWidth * numOfCols;
    values = new Array(numOfCols).fill(0);
    //アニメーションのdefalt設定-------------------------------------------
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
    //-------------------------------------------------------------------


    //ベジェ曲線のdefalt設定-------------------------------------------
    p0 = {x: canvas.width/10, y: canvas.height/10};
    p1 = {x: canvas.width * 2/10, y: canvas.height * 8/10};

    // 制御点が2つの3次ベジェ曲線
    cp0 = {x: canvas.width * 8/10, y: canvas.height /10};
    cp1 = {x: canvas.width * 6/10, y: canvas.height *9/10};

    r = 5; //各点を示す円の半径

    points = [p0, p1, cp0, cp1];
    
    //-------------------------------------------------------------------




}

function draw(){
    drawBar();
}

function update(){
   updateValues(80,7);//サンプル数
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

function pickUpIndex(rep){
    let total = 0;
    // const value1 = Math.random();
    // const value2 = Math.random();
    // total = value1 + value2;
    // const average = total /2;

    //中央に近いindexが選ばれる
    for(let i = 0;i < rep; i++){
        total += Math.random();
    }
    const average = total / rep;

    const index = Math.floor(average * numOfCols);
    return index;
}

function updateValues(n,rep){
    for(let i = 0; i< n; i++){
        const index = pickUpIndex(rep);
        values[index] +=1;
    }
}

function drawBar(){
    for(let i = 0; i<numOfCols;i++){
        const barHeight = values[i];
        ctx.beginPath();
        ctx.fillRect(marginX/2 + barWidth * i,canvas.height,barWidth,-barHeight);
    }
}