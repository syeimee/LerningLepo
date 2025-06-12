export class Effect{
    constructor(canvas, ctx, x, y){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.r = 15;
        this.lineWidth = 1;
        this.alpha = 0.9;
        this.color = `rgba(151, 114, 251, ${this.alpha})`;
    }
    
    draw(){
        this.ctx.save();
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r/2, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r/4, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.restore();
    }
    
    update(){
        this.alpha *= 0.9;
        this.r += 1;
        this.color = `rgba(151, 114, 251, ${this.alpha})`;
        this.lineWidth *= 1.08;
    }
}