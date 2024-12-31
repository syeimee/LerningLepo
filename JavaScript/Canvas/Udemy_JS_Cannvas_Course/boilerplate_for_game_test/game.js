export class Game{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.clickAcceptable = true;
        this.controller = controller;
        this.menus = ["menu-0", "menu-1", "menu-2"];
        this.menuIndex = 0;
        this.menu = this.menus[this.menuIndex];
        this.gameover = false;
        this.count = 0;
    }

    draw(){
        this.canvas.style.backgroundColor = "#CDDDDD";
        this.ctx.save();
        this.ctx.fillStyle = "#2E2F2F";
        this.ctx.font = `italic ${this.canvas.width/30}px Candara`;
        this.ctx.fillText(`Click!  COUNT : ${this.count}`, this.canvas.width / 2, this.canvas.height / 3);
        this.ctx.fillStyle = '#5aa2f5';
        const sx = this.canvas.width * 4 / 9;
        const sy = this.canvas.height * 4 / 9;
        const w = this.canvas.width * 1 / 9;
        const h = this.canvas.height * 1 / 9;
        this.ctx.beginPath();
        this.ctx.rect(sx, sy, w, h);
        this.ctx.fill();
        this.ctx.restore();
    }

    update(){
        const sx = this.canvas.width * 4 / 9;
        const sy = this.canvas.height * 4 / 9;
        const w = this.canvas.width * 1 / 9;
        const h = this.canvas.height * 1 / 9;
        if (this.controller.isMouseInsideRect(sx, sy, w, h) && this.controller.keys.includes('mousedown') && this.clickAcceptable) {
            this.count++;
            this.clickAcceptable = false;
        }
        if (!this.controller.keys.includes('mousedown')) this.clickAcceptable = true;

        if(this.menu === this.menus[0] && 2 <= this.count){
            this.gameover = true;
            this.clickAcceptable = false;
        }
        if(this.menu === this.menus[1] && 4 <= this.count){
            this.gameover = true;
            this.clickAcceptable = false;
        }
        if(this.menu === this.menus[2] && 6 <= this.count){
            this.gameover = true;
            this.clickAcceptable = false;
        }
    }

    init(){
        this.menuIndex = 0;
        this.gameover = false;
        this.menu = this.menus[this.menuIndex];
        this.clickAcceptable = true;
        this.count = 0;
    }
}