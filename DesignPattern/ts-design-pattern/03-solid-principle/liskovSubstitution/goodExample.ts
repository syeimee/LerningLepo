export {};

interface Shape {
    getArea(): number;
}

export class Rectangle implements Shape {
    private width= 0;
    private height= 0;

    setWidth(width: number) {
        this.width = width;
    }

    setHeight(height: number) {
        this.height = height;
    }

    getArea():number {
        return this.width * this.height;
    }
}

export class Square implements Shape {
    private length= 0;

    setlength(length: number){
        this.length = length;
    }

    getArea(): number {
        return this.length * this.length;
    }
}

export function f (shape: Shape){
    return shape.getArea();
}