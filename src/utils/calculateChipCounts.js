/* eslint-disable no-param-reassign */

import countInArray from './countInArray';

export default function calculateChipCounts(amount) {
  const chips = {};
  let running = amount;
  running = extractChips(running, 100, chips);
  running = extractChips(running, 25, chips);
  running = extractChips(running, 10, chips);
  running = extractChips(running, 5, chips);

  if (running !== 0) {
    console.error(
      'Calculated chips but something left over ?!?',
      {
        amount,
        leftOver: running,
        chips
      });
  }

  chips.denominationCount = countInArray(Object.values(chips));
  return chips;
}

function extractChips(total, denomination, chips) {
  const amount = Math.trunc(total / denomination);
  chips[denomination] = amount || null;
  return total - (amount * denomination);
}
