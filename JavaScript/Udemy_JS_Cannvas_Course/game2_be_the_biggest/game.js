import {Player} from './player.js';
import {Ball} from './ball.js';

export class Game{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.clickAcceptable = true;
        this.controller = controller;
        this.menuMap = [{name: "Easy", speed: 3}, {name: "Medium", speed: 6}, {name: "Difficult", speed: 9}];
        this.menuIndex = 0;
        this.gameover = false;
        this.player = new Player(this.canvas, this.ctx, this.controller);
        this.balls = null;
        this.numOfBalls = 20;
        this.stage = 0;
    }

    draw(){
        this.canvas.style.backgroundColor = "#190e4f";
        this.player.draw();
        this.balls.forEach(ball => {
            ball.draw();
        })
        this.showStage();
    }
    
    update(){
        this.player.update();
        this.balls.forEach(ball => {
            ball.update();
        })
        this.checkCollision();
        this.winOrLose();
        // clickAcceptableの使用例
        // if (this.controller.isMouseInsideRect(sx, sy, w, h) && this.controller.keys.includes('mousedown') && this.clickAcceptable) {
        //     this.count++;
        //     this.clickAcceptable = false;
        // }
        // if (!this.controller.keys.includes('mousedown')) this.clickAcceptable = true;
    }

    init(){
        this.menuIndex = 0;
        this.gameover = false;
        this.clickAcceptable = true;
        this.player = new Player(this.canvas, this.ctx, this.controller);
        this.stage = 0;
        this.numOfBalls = 20;
    }

    createBalls(){
        const newBalls = [];
        for(let i = 0; i < this.numOfBalls; i++){
            const ball = new Ball(this.canvas, this.ctx);
            ball.speed = this.menuMap[this.menuIndex].speed * (1 + Math.random() + this.stage / 3);
            newBalls.push(ball);
        }
        this.balls = newBalls;
    }

    checkCollision(){
        this.balls.forEach(ball => {
            const distance = Math.sqrt((ball.x - this.player.x)**2 + (ball.y - this.player.y)**2);
            if(distance <= ball.r + this.player.r){
                if(ball.r < this.player.r){
                    this.player.r += ball.r/5;
                    ball.r = 0;
                }else{
                    this.player.r -= ball.r / 20;
                    this.player.r = Math.max(this.player.r, 0);
                }
            }
        })
        this.balls = this.balls.filter(ball => 0 < ball.r);
    }

    winOrLose(){
        if(!this.player.alive) this.gameover = true;
        if(this.balls.length === 0){
            this.stage++;
            this.numOfBalls += 4;
            this.createBalls();
            this.player = new Player(this.canvas, this.ctx, this.controller);
        }
    }

    showStage(){
        this.ctx.save();
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
        this.ctx.font = `${this.canvas.width/12}px Candara`;
        this.ctx.fillText(`Level:${this.menuMap[this.menuIndex].name}`, this.canvas.width/2, this.canvas.height*2/5);
        this.ctx.fillText(`Stage - ${this.stage + 1}`, this.canvas.width/2, this.canvas.height*3/5);
        this.ctx.restore();
    }
}