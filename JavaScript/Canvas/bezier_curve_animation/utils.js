export class Utils{




    // 2点 p0,p1をt:1-tに内部する内分点(0 <= t <= 1)
    lerp(p0, p1, t){
        const x = (1 - t) * p0.x + t *p1.x;
        const y = (1 - t) * p0.y + t *p1.y;
        return{x: x, y: y};
    }
}