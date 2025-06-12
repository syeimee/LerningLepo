import { Lint } from "./lint.js";
let canvas, ctx,lints;


window.addEventListener('resize', () => {
    setup();
    draw();
})

window.addEventListener('click',e =>{
    erase(e.clientX,e.clientY);
    lints.forEach((lint,index) => {
        const dist = Math.sprt((e.clientX - lint.x) **2 +(e.clientY - lint.y ** 2));
        if(dist < 50){
            lints.splice(index,1);
        }
    })
})


function setup(){
    canvas = document.querySelector('#canvas');
    ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.backgroundColor ="black";
    lints = createLints(10);
    // console.log(lints);
}

function draw(){
    lints.forEach(lint => {
        lint.draw();
    });

    
}

const createLints = (n) => {
    const lints = [];
    for(let i = 0; i < n; i++){
        const lint = new Lint(canvas,ctx);
        lints.push(lint);
    }
    return lints;
}

const erase = (x,y) =>{
    ctx.clearRect(x,y,50,50);
}


setInterval(()=>{
    setup();
    draw();
},2000)