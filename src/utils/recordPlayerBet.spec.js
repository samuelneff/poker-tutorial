import recordPlayerBet from './recordPlayerBet';

it('undefined bet returns original object', () => {
  const expected = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const actual = recordPlayerBet(expected, undefined);
  expect(actual).toBe(expected); // Note use of `toBe()` which is strict equality
});

it('null bet returns original object', () => {
  const expected = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const actual = recordPlayerBet(expected, null);
  expect(actual).toBe(expected); // Note use of `toBe()` which is strict equality
});

it('zero bet returns original object', () => {
  const expected = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const actual = recordPlayerBet(expected, 0);
  expect(actual).toBe(expected); // Note use of `toBe()` which is strict equality
});

it('Non-zero bet returns new object', () => {
  const expected = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const actual = recordPlayerBet(expected, 15);
  expect(actual).not.toBe(expected); // Note use of `toBe()` which is strict equality
});

it('Non-zero bet returns new object', () => {
  const expected = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const actual = recordPlayerBet(expected, 15);
  expect(actual).not.toBe(expected); // Note use of `toBe()` which is strict equality
});

it('Non-zero bet returns correctly modified player', () => {
  const original = {
    playerName: 'Sam',
    playerBank: 100,
    playerBet: 0
  };
  const expected = {
    playerName: 'Sam',
    playerBank: 85,
    playerBet: 15
  };
  const actual = recordPlayerBet(original, 15);
  expect(actual).toEqual(expected); // Note use of `toEqual()` which is deep comparison
});
