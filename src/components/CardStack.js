import React, { Fragment } from 'react';
import interpolate from '../utils/interpolate';

const CardStack = ({ cards }) =>
  <Fragment>
    Cards:
    { ' ' }
    {
      interpolate(
        cards.map(({rank, suit}) => {
          const display = `${rank}${suit}`;
          return (
            <span key={display}>{display}</span>
          );
        }),
        (card, index) => <span key={index}>, </span>
      )
    }
  </Fragment>;

export default CardStack;
