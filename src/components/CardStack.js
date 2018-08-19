import React from 'react';
import * as images from '../images';

const CardStack = ({ cards, className }) =>
  <div className={`card-stack ${className}`}>
    {
      cards.map(({rank, suit}, index) => {
        const cardName = `${rank}${suit}`;
        const Card = images[`Card${cardName}`];
        return (
          <Card key={cardName}
                className={`card card-${index} ${className}`} />
        );
      })
    }
  </div>;

export default CardStack;
