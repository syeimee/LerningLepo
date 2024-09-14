export class Ripple{
    constructor(canvas,ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.r = Math.random() * this.canvas.width/4;
    }

    draw(){
        this.ctx.strokeStyle = "rgba(0,0,0,0.3)";
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r,0,Math.PI*2);
        this.ctx.stroke();

        this.ctx.strokeStyle = "rgba(0,0,0,0.3)";
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r/3,0,Math.PI*2);
        this.ctx.stroke();

        this.ctx.strokeStyle = "rgba(0,0,0,0.3)";
        this.ctx.beginPath();
        this.ctx.arc(this.x,this.y,this.r/4,0,Math.PI*2);
        this.ctx.stroke();
    }


}


// const ripple1 = new Ripple();
// ripple1.x
// ripple1.y


