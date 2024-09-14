export class Effect{
    constructor(canvas, ctx, x, y){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 4;
        this.lineWidth = this.r;
        this.color = `rgba(255, 255, 20, ${1/this.r})`;
    }

    draw(){
        this.ctx.save();
        this.ctx.setLineDash([2, 2]);
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r*1.1, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r*1.3, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r*1.7, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r*2.5, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.restore();
    }

    update(){
        this.r += 0.5;
        this.lineWidth = this.r;
        this.color = `rgba(255, 255, 20, ${1/this.r})`;
    }
}