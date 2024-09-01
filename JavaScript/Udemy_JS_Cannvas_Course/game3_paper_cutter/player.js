import {Laser} from './laser.js';

export class Player{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.controller = controller;
        this.s = this.canvas.width/25;
        this.x = 50;
        this.y = this.canvas.height /2 - this.s/2;
        this.acceleration = 2;
        this.speedX = 0;
        this.speedY = 0;
        this.friction = 0.85;
        this.direction = null;
        this.laser = null;
        this.life = 100;
    }

    draw(){
        this.ctx.save();
        this.ctx.fillStyle = "rgb(249, 217, 35)";
        this.ctx.strokeStyle = "rgb(246, 107, 14)";
        this.ctx.lineWidth = 8;
        this.ctx.lineJoin = "round";
        this.ctx.lineCap = "round";
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.s, this.s);
        this.ctx.stroke();
        this.ctx.fill();

        this.ctx.beginPath();
        this.ctx.moveTo(this.x + this.s/2, this.y + this.s/2);
        if(this.direction === "RIGHT") this.ctx.lineTo(this.x + this.s*3/2, this.y + this.s/2);
        if(this.direction === "LEFT") this.ctx.lineTo(this.x - this.s/2, this.y + this.s/2);
        if(this.direction === "UP") this.ctx.lineTo(this.x + this.s/2, this.y - this.s/2);
        if(this.direction === "DOWN") this.ctx.lineTo(this.x + this.s/2, this.y + this.s*3/2);
        this.ctx.stroke();
        this.ctx.restore();

        if(this.laser) this.laser.draw();
    }
    
    update(){
        this.x += this.speedX;
        this.y += this.speedY;
        this.speedX *= this.friction;
        this.speedY *= this.friction;
        this.updateSpeed();
        
        if(this.canvas.width < this.x + this.s) this.x = this.canvas.width - this.s;
        if(this.x < 0) this.x = 0;
        if(this.canvas.height < this.y + this.s) this.y = this.canvas.height - this.s;
        if(this.y < 0) this.y = 0;
        
        this.updateDirection();
        this.generateLaser();
        if(this.laser){
            this.laser.update();
            this.clearLaser();
        }
    }
    
    updateDirection(){
        if(this.controller.keys.includes("ArrowRight")) this.direction = "RIGHT";
        if(this.controller.keys.includes("ArrowLeft")) this.direction = "LEFT";
        if(this.controller.keys.includes("ArrowUp")) this.direction = "UP";
        if(this.controller.keys.includes("ArrowDown")) this.direction = "DOWN";
    }

    updateSpeed(){
        if(this.controller.keys.includes("ArrowRight")) this.speedX += this.acceleration;
        if(this.controller.keys.includes("ArrowLeft")) this.speedX -= this.acceleration;
        if(this.controller.keys.includes("ArrowUp")) this.speedY -= this.acceleration;
        if(this.controller.keys.includes("ArrowDown")) this.speedY += this.acceleration;
    }

    generateLaser(){
        if(this.controller.keys.includes(' ') && !this.laser){
            if(this.direction){
                this.laser = new Laser(this.canvas, this.ctx, this.x + this.s/2, this.y + this.s/2, this.direction);
            }
        }
    }

    clearLaser(){
        if(this.laser.direction === "RIGHT" && this.canvas.width < this.laser.x) this.laser = null;
        else if(this.laser.direction === "LEFT" && this.laser.x < 0) this.laser = null;
        else if(this.laser.direction === "UP" && this.laser.y < 0) this.laser = null;
        else if(this.laser.direction === "DOWN" && this.canvas.height < this.laser.y) this.laser = null;
    }
}