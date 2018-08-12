import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import CommunityCards from './CommunityCards';
import PlayersDisplay from './PlayersDisplay';
import PlayInputs from './PlayInputs';
import PotDisplay from './PotDisplay';

// App root must be stateful component for hot reloading to work
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <div className="root-container">
        <div>App</div>
        <div>&nbsp;</div>

        <PlayersDisplay />
        <div>&nbsp;</div>

        <CommunityCards />
        <PotDisplay />
        
        <div>&nbsp;</div>
        <PlayInputs />
      </div>
    );
  }
}

export default hot(module)(App);
