import {Effect} from './effect.js';

export class Player{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.controller = controller;
        this.r = 15;
        this.x = this.canvas.width/2;
        this.y = this.canvas.height - this.r * 3;
        this.speedX = 0;
        this.speedY = 0;
        this.acceleration = 2;
        this.friction = 0.9;
        this.effect = null;
        this.alive = true;
    }

    draw(){
        this.ctx.save();
        this.ctx.fillStyle = "#f4d35e";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.fillStyle = "#0d3b66";
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.r * 3/4, 0, Math.PI * 2);
        this.ctx.fill();
        this.ctx.restore();

        if(this.effect) this.effect.draw();
    }

    update(){
        this.speedX *= this.friction;
        this.speedY *= this.friction;

        this.x += this.speedX;
        this.y += this.speedY;

        if(this.controller.keys.includes('ArrowUp')) this.speedY -= this.acceleration;
        if(this.controller.keys.includes('ArrowDown')) this.speedY += this.acceleration;
        if(this.controller.keys.includes('ArrowLeft')) this.speedX -= this.acceleration;
        if(this.controller.keys.includes('ArrowRight')) this.speedX += this.acceleration;

        if(this.x - this.r < 0) this.x = this.r;
        if(this.canvas.width < this.x + this.r) this.x = this.canvas.width - this.r;
        if(this.y - this.r < 0) this.y = this.r;
        if(this.canvas.height < this.y + this.r) this.y = this.canvas.height - this.r;

        if(this.alive && this.r <= 3){
            this.alive = false;
            this.r = 0;
            this.effect = new Effect(this.canvas, this.ctx, this.x, this.y);
        }

        if(this.effect) this.effect.update();
    }
}