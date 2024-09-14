import {Area} from './area.js';

export class Game{
    constructor(canvas, ctx, controller){
        this.canvas = canvas;
        this.ctx = ctx;
        this.clickAcceptable = true;
        this.controller = controller;
        this.menuMap = [{name: "Three Disks", numOfDisks: 3}, {name: "Four Disks", numOfDisks: 4}, {name: "Five Disks", numOfDisks: 5}];
        this.menuIndex = 0;
        this.gameover = false;
        this.areas = null;
        this.numOfDisks = null;
        this.areaFrom = null;
        this.areaTo = null;
        this.originalDisks = null;
        this.startTime = null;
        this.currentTime = null;
        this.completed = false;
    }

    draw(){
        this.canvas.style.backgroundColor = "#381d2a";
        if(this.areas){
            this.areas.forEach(area => {
                area.draw();
                if(area === this.areaFrom){
                    this.ctx.save();
                    this.ctx.fillStyle = "rgba(200, 200, 200, 0.1)";
                    this.ctx.beginPath();
                    this.ctx.fillRect(area.x, area.y, area.areaSize, area.areaSize);
                    this.ctx.restore();
                }
            })
        }
        this.showTime();
    }

    update(){
        if(this.areas){
            this.areas.forEach(area => {
                this.selectAreaFrom(area);
                this.selectAreaTo(area);
                this.moveDisk();
            })
        }

        this.checkCompletion();
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
        this.areas = null;
        this.completed = false;
    }

    createAreas(){
        const areas = [];
        for(let i = 0; i < 3; i++){
            const area = new Area(this.canvas, this.ctx, this.numOfDisks);
            area.x = this.canvas.width/8 + area.areaSize * i;
            area.y = (this.canvas.height - area.areaSize) / 2;
            area.disks = i === 0 ? this.createInitialDisks() : [];
            areas.push(area);
        }
        this.originalDisks = [...areas[0].disks];
        return areas
    }

    createInitialDisks(){
        const disks = [];
        for(let i = 0; i < this.numOfDisks; i++){
            disks.push(i);
        }
        return disks
    }

    selectAreaFrom(area){
        if(!this.areaFrom && this.controller.isMouseInsideRect(area.x, area.y, area.areaSize, area.areaSize) && this.controller.keys.includes('mousedown')){
            this.areaFrom = area;
        }
    }
    
    selectAreaTo(area){
        if(this.areaFrom && this.controller.isMouseInsideRect(area.x, area.y, area.areaSize, area.areaSize) && this.controller.keys.includes('mousedown')){
            this.areaTo = area;
        }
    }

    moveDisk(){
        if(this.areaFrom && this.areaTo && !this.controller.keys.includes('mousedown')){
            this.areaFrom.moveDiskTo(this.areaTo);
            this.areaFrom = null;
            this.areaTo = null;
        }
    }

    showTime(){
        if(!this.completed) this.currentTime = new Date();
        this.ctx.save();
        this.ctx.fillStyle = "rgba(200, 200, 200, 0.5)";
        this.ctx.textAlign = "right";
        this.ctx.textBaseline = "top";
        this.ctx.font = `${this.canvas.width/18}px monospace`;
        this.ctx.beginPath();
        this.ctx.fillText(`TIME : ${((this.currentTime - this.startTime)/1000).toFixed(2)}`, this.canvas.width * 19/20, this.canvas.height/20);
        this.ctx.restore();
    }

    checkCompletion(){
        if(JSON.stringify(this.areas[1].disks) === JSON.stringify(this.originalDisks) || JSON.stringify(this.areas[2].disks) === JSON.stringify(this.originalDisks)){
            this.gameover = true;
            this.completed = true;
        }
    }
}