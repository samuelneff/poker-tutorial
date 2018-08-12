import React, { Fragment } from 'react';
import { CHIP_DENOMINATIONS } from '../utils/constants';

const ChipStacks = ( { chips } ) => {
  const chipList = CHIP_DENOMINATIONS.map(denomination => `${chips[denomination] || 0} x ${denomination}`);  
  return (
    <Fragment>
      Chips: 
      {
          chipList.join(', ')
      }
    </Fragment>
  );
}

export default ChipStacks;
