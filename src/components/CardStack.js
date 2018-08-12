import React, { Fragment } from 'react';

const CardStack = ( { cards } ) =>
  <Fragment>
    Cards: 
    {
      cards.map( ({rank, suit}) => <span>{rank} {suit} </span>)
    }
  </Fragment>;

export default CardStack;