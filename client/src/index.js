import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {AppContainer} from 'react-hot-loader';
import Raven from 'raven-js';

import store from './store.js';
import {getActivities} from './actions/index.js';
import App from './components/App.jsx';

const appContainer = document.getElementById('app');
const isProduction = appContainer.dataset.environment === 'production';

if (isProduction) {
  Raven.config('https://06b9fcd4ece146d7ada1f633f07c7d00@sentry.io/172560').install();
}

const render = (Component) => {
  console.log('render!');
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

