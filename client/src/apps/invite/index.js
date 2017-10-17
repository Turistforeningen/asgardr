import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import Raven from 'raven-js';

import 'semantic-ui-css/semantic.min.css';

import store from './store.js';
import {fetchUser} from './actions/index.js';
import App from './App.jsx';

const appContainer = document.getElementById('app');
const isProduction = appContainer.dataset.environment === 'production';

if (isProduction) {
  Raven.config('https://39837588ca2444d4813af4fb16931594@sentry.io/222695').install();
}

store.dispatch(fetchUser());

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      {React.createElement(Provider, {store}, React.createElement(Component))}
    </AppContainer>,
    appContainer
  );
};

render(App);

if (module.hot) {
  module.hot.accept();
}

