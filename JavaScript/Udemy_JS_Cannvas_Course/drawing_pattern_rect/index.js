let canvas, ctx, num, cellSize, gapX, gapY, topLeftX, topLeftY, innerGap;

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
    ctx.strokeStyle = "#fff";
    num = 40;
    // cellSize = canvas.height < canvas.width ? canvas.height * 8/10 / (num + 2) : canvas.width * 8/10 / (num + 2);
    // gapX = (canvas.width * 8/10 - cellSize*num) / (num -1);
    // gapY = (canvas.height *8/10 - cellSize*num) / (num -1);
    if(canvas.height < canvas.width){
        cellSize = canvas.height * 8/10 / (num + 2);
        gapY = (canvas.height *8/10 - cellSize*num) / (num -1);
        gapX = gapY;
        topLeftY = canvas.height/10;
        topLeftX = (canvas.width - canvas.height*8/10) / 2;
    }else{
        cellSize = canvas.width * 8/10 / (num + 2);
        gapX = (canvas.width * 8/10 - cellSize*num) / (num -1);
        gapY = gapX;
        topLeftX = canvas.width/10;
        topLeftY = (canvas.height - canvas.width*8/10) / 2;
    }
    innerGap = cellSize/8;
}

function draw(){
    // ctx.beginPath();
    // ctx.rect(canvas.width/10, canvas.height/10, canvas.width*8/10, canvas.height*8/10);
    // ctx.stroke();

    for(let y = 0; y < num; y++){
        for(let x = 0; x < num; x++){
            ctx.save();
            if(Math.random() < 0.5) ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.rect(topLeftX + (cellSize + gapX) * x, topLeftY + (cellSize + gapY) * y, cellSize, cellSize);
            ctx.stroke();
            ctx.restore();
            if(Math.random() < 0.5){
                ctx.save();
                ctx.strokeStyle = `hsl(${Math.random()*360}, 100%, 50%)`;
                ctx.beginPath();
                ctx.rect(topLeftX + innerGap + (cellSize + gapX) * x, topLeftY + innerGap + (cellSize + gapY) * y, cellSize - innerGap*2, cellSize - innerGap*2);
                ctx.stroke();
                ctx.restore();
            }
            
            if(Math.random() < 0.5){
                ctx.save();
                ctx.fillStyle = `hsl(${Math.random()*360}, 100%, 50%)`;
                ctx.beginPath();
                ctx.rect(topLeftX + innerGap*2 + (cellSize + gapX) * x, topLeftY + innerGap*2 + (cellSize + gapY) * y, cellSize - innerGap*4, cellSize - innerGap*4);
                ctx.fill();
                ctx.restore();
            }
        }
    }
}
