import React, { Component } from 'react';
import CardStack from './CardStack';
import Chips from './Chips';
import {
  RANK_TEN,
  RANK_JACK,
  RANK_QUEEN,
  RANK_KING,
  RANK_ACE,
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES
} from '../utils/constants';

const testCards = [
  {
    rank: RANK_TEN,
    suit: SUIT_CLUBS
  },
  {
    rank: RANK_JACK,
    suit: SUIT_DIAMONDS
  },
  {
    rank: RANK_QUEEN,
    suit: SUIT_HEARTS
  },
  {
    rank: RANK_KING,
    suit: SUIT_SPADES
  },
  {
    rank: RANK_ACE,
    suit: SUIT_CLUBS
  }
];

class Components extends Component {
  render() {
    console.log('Components');
    return (
      <div>
        <h1>Chips</h1>
        <Chips amount={990} />
        <h1>CardStack</h1>
        <CardStack cards={testCards}
                   className="flat"/>
      </div>
    );
  };
}

export default Components;
