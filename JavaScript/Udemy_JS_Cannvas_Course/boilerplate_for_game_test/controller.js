export class Controller{
    constructor(){
        this.keys = [];
        this.mouse = {x: null, y: null};
        this.availableKeys = ['ArrowUp', 'ArrowDown', 'ArrowRight', 'ArrowLeft', ' ', 'Enter', 'p', 'o'];
        this.pause = false;
    }

    getMousePosition(){
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        })
    }

    isMouseInsideRect(sx, sy, w, h) {
        if (sx < this.mouse.x && this.mouse.x < sx + w && sy < this.mouse.y && this.mouse.y < sy + h) return true;
        return false;
    }

    addKeys(){
        window.addEventListener('keydown', e => {
            if(this.availableKeys.includes(e.key)){
                if(!this.keys.includes(e.key)){
                    this.keys.push(e.key);
                }
            }
        })
    }

    addMouseDown(){
        window.addEventListener('mousedown', () => {
            if (!this.keys.includes('mousedown')) {
                this.keys.push('mousedown');
            }
        })
    }
    
    clearKeys(){
        window.addEventListener('mouseup', () => {
            this.keys.length = 0;
        })

        window.addEventListener('keyup', () => {
            this.keys.length = 0;
        })

    }
}