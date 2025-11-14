import { f, Rectangle, Square } from './goodExample';

describe('Rectangle Test', () => {
  test('Rectangle getArea', () => {
    const r1 = new Rectangle();
    r1.setWidth(3);
    r1.setHeight(4);
    expect(f(r1)).toBe(12);
  });
  test('Square getArea', () => {
    const r1 = new Square();
    r1.setlength(3);
    expect(f(r1)).toBe(9);
  });
});
