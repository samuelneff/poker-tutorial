import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import Components from './Components';
import Instructions from './Instructions';
import Menu from './Menu';

// Root cannot be a stateless component function for hot reloading to work right
// eslint-disable-next-line react/prefer-stateless-function
export default class Root extends Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <Route exact
                   path="/"
                   component={Menu} />
            <Route path="/components"
                   component={Components} />
            <Route path="/instructions"
                   component={Instructions} />
            <Route path="/game"
                   component={App} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}
