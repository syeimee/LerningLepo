export class Ball{
    constructor(canvas, ctx){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height/2;
        this.r = Math.random() * 40 + 1;
        this.speed = null;
        this.angle = Math.random() * Math.PI * 2;
        this.color = `hsl(${Math.floor(Math.random() *360)}, 100%, 50%, 50%)`;
    }

    draw(){
        this.ctx.save();
        this.ctx.fillStyle = this.color;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();
    }

    update(){
        this.x += this.speed * Math.cos(this.angle);
        this.y += this.speed * Math.sin(this.angle);

        if(this.x + this.r < 0){
            this.x = this.canvas.width + this.r;
            this.angle = Math.random() * Math.PI * 2;
        }
        if(this.canvas.width < this.x - this.r){
            this.x = -this.r;
            this.angle = Math.random() * Math.PI * 2;
        }
        if(this.y + this.r < 0){
            this.y = this.canvas.height + this.r;
            this.angle = Math.random() * Math.PI * 2;
        }
        if(this.canvas.height < this.y - this.r){
            this.y = -this.r;
            this.angle = Math.random() * Math.PI * 2;
        }
    }
}