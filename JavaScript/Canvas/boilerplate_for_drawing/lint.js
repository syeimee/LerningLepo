export class Lint{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.l = Math.random() * 20 + 10;
        this.rep = Math.floor(Math.random()*20 + 1);
        this.ctx.strokeStyle = "white";

    }

    draw(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.x,this.y);
        for(let i = 0; i < this.rep; i++){
            const x = this.x + this.l * (Math.random()* 2 - 1);
            const y = this.y + this.l * (Math.random() * 2 - 1);
            this.ctx.lineTo(x,y);
        }
        this.ctx.stroke();
    }


}



