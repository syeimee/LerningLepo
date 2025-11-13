export {};

// スーパータイプ
export class Rectangle {
  width = 0;
  height = 0;

  setWidth(width: number) {
    this.width = width;
  }

  setHight(height: number) {
    this.height = height;
  }

  getArea(): number {
    return this.width * this.height;
  }
}

// サブタイプ
export class Square extends Rectangle {
  setWidth(width: number) {
    super.setWidth(width);
    super.setHight(width);
  }

  setHight(height: number) {
    super.setWidth(height);
    super.setHight(height);
  }
}

export function f(r: Rectangle, width: number, height: number): number {
  r.setWidth(width);
  r.setHight(height);
  return r.getArea();
}

function run() {
  const r1: Rectangle = new Rectangle();
  const r2: Rectangle = new Square();

  console.log(f(r1, 3, 4));
  console.log(f(r2, 3, 4));
}

run();
