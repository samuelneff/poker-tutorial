import 'babel-polyfill';
import './favicon.ico';

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './components/Root';
import store from './redux/appStore';
import configureStore, { history } from './redux/configureStore';
import './styles/global.scss';


render(
  <AppContainer>
    <Root store={store}
          history={history} />
  </AppContainer>,
  document.getElementById('app'),
);

if (module.hot) {
  module.hot.accept('./components/Root', () => {
    // eslint-disable-next-line global-require
    const NewRoot = require('./components/Root').default;
    render(
      <AppContainer>
        <NewRoot store={store}
                 history={history} />
      </AppContainer>,
      document.getElementById('app'),
    );
  });
}
