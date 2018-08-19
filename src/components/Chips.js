import React from 'react';
import calculateChipCounts from '../utils/calculateChipCounts';
import repeat from '../utils/repeat';
import * as images from '../images';

const Chips = ({ className, amount }) => {
  const counts = calculateChipCounts(amount);
  let stackIndex = 0;
  return (
    <div className={`chip-stacks chip-denomination-count-${counts.denominationCount} ${className}`}>
      {
        [100, 25, 10, 5].map(
          denomination => {
            const Chip = images[`Chip${denomination.toString().padStart(3, '0')}`];
            return (
              counts[denomination] &&
              <div className={`chip-stack chips-denomination-${denomination} chips-${stackIndex++} ${className}`}
                   key={`chips-${denomination}`}>
                {
                  repeat(
                    counts[denomination],
                    chipIndex =>
                      <Chip className={`chip chip-${denomination} chip-${chipIndex}`}
                            key={`chip-${denomination}-${chipIndex}`} />
                  )
                }
              </div>
            );
          }
        )
      }
    </div>
  );
};

export default Chips;
