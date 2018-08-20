import isFlush from './isFlush';

it('Flush should be identified', () => {

  const cards = [
    {
      rank: '2',
      suit: 'C'
    },
    {
      rank: '6',
      suit: 'C'
    },
    {
      rank: '8',
      suit: 'C'
    },
    {
      rank: 'J',
      suit: 'C'
    },
    {
      rank: 'Q',
      suit: 'C'
    }
  ];

  const actual = isFlush(cards);

  expect(actual).toBeTruthy();
});

it('Non-flush should be identified', () => {

  const cards = [
    {
      rank: '2',
      suit: 'C'
    },
    {
      rank: '6',
      suit: 'S'
    },
    {
      rank: '8',
      suit: 'C'
    },
    {
      rank: 'J',
      suit: 'C'
    },
    {
      rank: 'Q',
      suit: 'C'
    }
  ];

  const actual = isFlush(cards);

  expect(actual).toBeFalsy();
});
