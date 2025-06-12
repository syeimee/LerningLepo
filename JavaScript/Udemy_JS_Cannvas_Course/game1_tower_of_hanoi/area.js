export class Area{
    constructor(canvas, ctx, numOfDisks){
        this.canvas = canvas;
        this.ctx = ctx;
        this.areaSize = Math.floor(this.canvas.width/4);
        this.x = null;
        this.y = null;
        this.numOfDisks = numOfDisks;
        this.boardWidth = this.areaSize;
        this.boardHeight = this.areaSize / 10;
        this.poleWidth = this.boardHeight * 2/3;
        this.poleHeight = this.areaSize * 9/10;
        this.disks = null;
        this.diskHeight = Math.floor(this.poleHeight * 8/10 / this.numOfDisks);
        this.maxDiskWidth = this.boardWidth * 9/10;
        this.minDiskWidth = this.boardWidth * 3/10;
        this.difDiskWidth = this.boardWidth * 6/10 / this.numOfDisks;
    }

    draw(){
        this.drawBoardAndPole();
        this.drawDisks();
    }

    drawBoardAndPole(){
        // board
        this.ctx.save();
        this.ctx.fillStyle = "#a63c06";
        this.ctx.beginPath();
        this.ctx.fillRect(this.x, this.y + this.poleHeight, this.boardWidth, this.boardHeight);
        this.ctx.restore();
        // pole
        this.ctx.save();
        this.ctx.fillStyle = "#c36f09";
        this.ctx.beginPath();
        this.ctx.fillRect(this.x + this.boardWidth/2 - this.poleWidth/2, this.y, this.poleWidth, this.poleHeight);
        this.ctx.restore();
    }

    drawDisks(){
        if(this.disks){
            this.disks.forEach((disk, index) => {
                const w = this.maxDiskWidth - this.difDiskWidth * disk; // diskは0, 1, 2, ...の数値
                const x = this.x + (this.areaSize - w) / 2;
                const y = this.y + this.poleHeight - this.diskHeight * index;
                const h = - this.diskHeight;
                this.ctx.save();
                this.ctx.fillStyle = `hsl(${360/this.numOfDisks * disk}, 100%, 75%)`;
                this.ctx.beginPath();
                this.ctx.fillRect(x, y, w, h);
                this.ctx.restore();
            });
        }
    }

    moveDiskTo(anotherArea){
        if(this.disks){
            if(anotherArea.disks.length === 0 || anotherArea.disks[anotherArea.disks.length - 1] < this.disks[this.disks.length - 1]){
                const disk = this.disks.pop();
                anotherArea.disks.push(disk);
            }
        }
    }
}