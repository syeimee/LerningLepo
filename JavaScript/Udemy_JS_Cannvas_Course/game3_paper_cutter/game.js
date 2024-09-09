import {Player} from './player.js';
import {Paper} from './paper.js';
import {Effect} from './effect.js';

export class Game{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.clickAcceptable = true;
        this.controller = controller;
        this.menuMap = [{name: "Easy", speed: 2}, {name: "Medium", speed: 4}, {name: "Difficult", speed: 6}];
        this.menuIndex = 0;
        this.gameover = false;
        this.player = new Player(this.canvas, this.ctx, this.controller);
        this.papers = [];
        this.createFirstPaper();
        this.speed = null;
        this.minArea = 20000;
        this.effects = [];
        this.playing = true;
        this.stage = 0;
    }

    draw(){
        this.canvas.style.backgroundColor = "#CDDDDD";
        this.player.draw();
        this.papers.forEach(paper => {
            paper.draw(this.minArea);
        })
        this.drawLifeAndMinArea();
    }
    
    update(){
        this.player.update();
        this.papers.forEach(paper => {
            paper.update();
            this.papers.forEach(anotherPaper => {
                paper.checkCollisionWithAnotherPaper(anotherPaper);
            })
        })
        this.cutPaper();
        this.effects.forEach((effect, index) => {
            effect.draw();
            effect.update();
            if(effect.alpha < 0.01){
                this.effects.splice(index, 1);
            }
        })
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
        this.papers = [];
        this.createFirstPaper();
        this.speed = 5;
        this.minArea = 20000;
        this.effects = [];
        this.playing = true;
        this.stage = 0;
    }

    createFirstPaper(){
        const firstPaper = new Paper(this.canvas, this.ctx, this.canvas.width/4, this.canvas.height/4, this.canvas.width/2, this.canvas.height/2);
        this.papers.push(firstPaper);
    }

    cutPaper(){
        if(this.player.laser){
            let upPaper, downPaper, rightPaper, leftPaper;
            this.papers.forEach(paper => {
                if(((this.player.laser.direction === "RIGHT" && this.player.x < paper.x) || (this.player.laser.direction === "LEFT" && paper.x < this.player.x)) && paper.y < this.player.laser.y && this.player.laser.y < paper.y + paper.h){
                    upPaper = new Paper(this.canvas, this.ctx, paper.x, paper.y, paper.w, this.player.laser.y - paper.y);
                    downPaper = new Paper(this.canvas, this.ctx, paper.x, this.player.laser.y, paper.w, (paper.y + paper.h) - this.player.laser.y);
                    upPaper.speedX = this.speed * (Math.random() * 2 - 1);
                    upPaper.speedY = -this.speed * Math.random();
                    downPaper.speedX = this.speed * (Math.random() * 2 - 1);
                    downPaper.speedY = this.speed * Math.random();
                    this.papers.push(upPaper, downPaper);
                    paper.w = 0;
                    upPaper = null;
                    downPaper = null;
                }
                
                if(((this.player.laser.direction === "DOWN" && this.player.y < paper.y) || (this.player.laser.direction === "UP" && paper.y < this.player.y)) && paper.x < this.player.laser.x && this.player.laser.x < paper.x + paper.w){
                    leftPaper = new Paper(this.canvas, this.ctx, paper.x, paper.y, this.player.laser.x - paper.x, paper.h);
                    rightPaper = new Paper(this.canvas, this.ctx, this.player.laser.x, paper.y, (paper.x + paper.w) - this.player.laser.x, paper.h);
                    leftPaper.speedY = this.speed * (Math.random() * 2 - 1);
                    leftPaper.speedX = -this.speed * Math.random();
                    rightPaper.speedY = this.speed * (Math.random() * 2 - 1);
                    rightPaper.speedX = this.speed * Math.random();
                    this.papers.push(leftPaper, rightPaper);
                    paper.w = 0;
                    leftPaper = null;
                    rightPaper = null;
                }
            })
            this.papers = this.papers.filter(paper => paper.w !== 0);
            this.papers.forEach(paper => {
                if(paper.w * paper.h < this.minArea){
                    this.effects.push(new Effect(this.canvas, this.ctx, paper.centerX, paper.centerY))
                }
            })
            this.papers = this.papers.filter(paper => this.minArea < paper.w * paper.h);
        }
    }

    winOrLose(){
        this.papers.forEach(paper => {
            if(Math.abs(this.player.x + this.player.s/2 - paper.centerX) < this.player.s/2 + paper.w/2 && Math.abs(this.player.y + this.player.s/2 - paper.centerY) < this.player.s/2 + paper.h/2){
                this.player.life--;
            }
            if(this.player.life <= 0){
                this.player.life = 0;
                this.canvas.style.backgroundColor = "#900";
                this.gameover = true;
            }else if(this.player.life <= 20){
                this.canvas.style.backgroundColor = "#955";
            }
        }) 
        if(this.papers.length === 0 && this.playing){
            this.playing = false;
            if(this.minArea <= 4000) this.gameover = true;
            setTimeout(() => {
                this.stage++;
                this.minArea = 20000 - 4000 * this.stage;
                this.player = new Player(this.canvas, this.ctx, this.controller);
                this.createFirstPaper();
                this.playing = true;
            }, 1000)
        }
    }

    drawLifeAndMinArea(){
        this.ctx.save();
        this.ctx.textAlign = "left";
        this.ctx.textBaseline = "top";
        this.ctx.font = `${this.canvas.width/30}px Candara`;
        this.ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
        this.ctx.beginPath();
        this.ctx.fillText(`Life : ${this.player.life}   minArea : ${this.minArea}`, this.canvas.width/20, this.canvas.height/20);
        this.ctx.restore();
    }
}