import { sum } from './utils';

function compileAndroidCode() {
  throw new Error('you are using the wrong JDK!');
}

describe('utils', () => {
  describe('sum', () => {
    it('should return 3 when 2 and 1 is passed', () => {
      const result = sum(1, 2);
      expect(result).toBe(3);
    });

    it('should return -4 when -2 and -2 is passed', () => {
      const result = sum(-2, -2);
      expect(result).toBe(-4);
    });

    it('test', () => {
      const array = [1, 2];

      const obj1 = { name: 'Test' };
      const obj2 = obj1;
      obj1.name = 'Test2';
      expect(obj2.name).toBe('Test2');
    });
  });
});
