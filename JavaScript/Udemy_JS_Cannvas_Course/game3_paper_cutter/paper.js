export class Paper{
    constructor(canvas, ctx, x, y, w, h){
        this.canvas = canvas;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speedX = 0;
        this.speedY = 0;
        this.centerX = this.x + this.w/2;
        this.centerY = this.y + this.h/2;
    }

    draw(minArea){
        this.ctx.save();
        this.ctx.fillStyle = "rgba(130, 219, 216, 0.85)";
        if(this.w * this.h < minArea * 2){
            this.ctx.fillStyle = "rgba(151, 114, 251, 0.85)";
        }
        this.ctx.beginPath();
        this.ctx.rect(this.x, this.y, this.w, this.h);
        this.ctx.fill();
        this.ctx.restore();
    }

    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if((0 < this.speedX && this.canvas.width < this.x + this.w) || (this.speedX < 0 && this.x < 0)) this.speedX *= -1;
        if((0 < this.speedY && this.canvas.height < this.y + this.h) || (this.speedY < 0 && this.y < 0)) this.speedY *= -1;

        this.centerX = this.x + this.w / 2;
        this.centerY = this.y + this.h / 2;
    }

    checkCollisionWithAnotherPaper(anotherPaper){
        if (Math.abs(this.centerX - anotherPaper.centerX) < this.w / 2 + anotherPaper.w / 2 && Math.abs(this.centerY - anotherPaper.centerY) < this.h / 2 + anotherPaper.h / 2){
            const collideVertically = Math.abs(this.centerX - anotherPaper.centerX) / (this.w/2 + anotherPaper.w/2) < Math.abs(this.centerY - anotherPaper.centerY) / (this.h/2 + anotherPaper.h/2);
            const collideHorizontally = Math.abs(this.centerY - anotherPaper.centerY) / (this.h/2 + anotherPaper.h/2) < Math.abs(this.centerX - anotherPaper.centerX) / (this.w/2 + anotherPaper.w/2);

            if(collideVertically && this.centerY < anotherPaper.centerY){
                this.speedY = -Math.abs(this.speedY);
            }
            if(collideVertically && anotherPaper.centerY < this.centerY){
                this.speedY = Math.abs(this.speedY);
            }
            if(collideHorizontally && this.centerX < anotherPaper.centerX){
                this.speedX = -Math.abs(this.speedX);
            }
            if(collideHorizontally && anotherPaper.centerX < this.centerX){
                this.speedX = Math.abs(this.speedX);
            }
        }
    }
}