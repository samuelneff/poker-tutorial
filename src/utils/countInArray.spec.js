import countInArray from './countInArray';

it('count without predicate returns simple count', () => {
  const items = [1, 2, 3, 4];
  const actual = countInArray(items);
  expect(actual).toBe(4);
});

it('count without predicate skips undefined', () => {
  const items = [1, 2, 3, undefined, 4];
  const actual = countInArray(items);
  expect(actual).toBe(4);
});

it('count without predicate skips zero', () => {
  const items = [0, 1, 2, 3, 4];
  const actual = countInArray(items);
  expect(actual).toBe(4);
});

it('count with isNaN predicate skips numbers', () => {
  const items = [1, undefined, 'test'];
  const actual = countInArray(items, isNaN);
  expect(actual).toBe(2);
});

it('counts with predicate', () => {
  const items = [1, 2, 3, 4, 5, 6, 7];
  const actual = countInArray(items, i => (i > 5));
  expect(actual).toBe(2);
});
