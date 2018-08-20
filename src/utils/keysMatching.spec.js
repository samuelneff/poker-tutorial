import keysMatching from './keysMatching';

it('default should match positive numbers', () => {
  const obj = {
    a: 1,
    b: 2,
    z: 0
  };
  const expected = ['a', 'b'];
  const actual = keysMatching(obj);
  expect(expected).toEqual(actual);
});

it('custom predicate', () => {
  const obj = {
    a: 1,
    b: 2,
    c: 3,
    d: 4,
    e: 5
  };
  const expected = ['a', 'b', 'c'];
  const actual = keysMatching(obj, i => i <= 3);
  expect(expected).toEqual(actual);
});
