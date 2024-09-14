export class Game{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.clickAcceptable = true;
        this.controller = controller;
        this.menuMap = [{name: "menu-0", level: 0}, {name: "menu-1", level: 1}, {name: "menu-2", level: 2}];
        this.menuIndex = 0;
        this.gameover = false;
    }

    draw(){
        this.canvas.style.backgroundColor = "#CDDDDD";
        this.ctx.save();
        this.ctx.restore();
    }

    update(){
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
    }
}