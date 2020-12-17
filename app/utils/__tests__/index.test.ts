import { getPercentFromTotal } from '../index';

it('should return a whole number representing a percentage', () => {
  expect(getPercentFromTotal(10, 100)).toBe(10);
  expect(getPercentFromTotal(2, 5)).toBe(40);
  expect(getPercentFromTotal(0, 100)).toBe(0);
  expect(getPercentFromTotal(10, 10)).toBe(100);
});
