import { Link } from 'react-router-dom';
import React from 'react';

const Menu = () => (
  <div>
    <h1>
      <Link to="/">
        Home
      </Link>
    </h1>
    <h1>
      <Link to="/instructions">
        How to play
      </Link>
    </h1>
    <h1>
      <Link to="/game">
        Play Poker!
      </Link>
    </h1>
  </div>
);

export default Menu;
