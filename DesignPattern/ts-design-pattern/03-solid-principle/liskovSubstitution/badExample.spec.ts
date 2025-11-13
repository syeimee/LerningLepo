import { f, Rectangle, Square } from './badExample';

describe('Rectangle Test', () => {
  test('Rectangle getArea', () => {
    const r1 = new Rectangle();
    expect(f(r1, 3, 4)).toBe(12);
  });
  test('Square getArea', () => {
    const r1 = new Square();
    expect(f(r1, 3, 4)).toBe(12);
  });
});
