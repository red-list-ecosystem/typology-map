/**
 * app.js
 *
 * This is the entry file for the application
 */

// Needed for redux-saga es6 generator support
import 'core-js/stable';
import 'regenerator-runtime/runtime';

// Import all the third party stuff
import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { HistoryRouter as Router } from 'redux-first-history/rr6';
// import history from 'utils/history';
import 'sanitize.css/sanitize.css';

// Import root app
import App from 'containers/App';

// Import Language Provider
import LanguageProvider from 'containers/LanguageProvider';
// Import i18n messages
import { translationMessages } from 'i18n';

// Import store and browserHistory
import { store, history } from 'configureStore';

// Import ThemeProvider
import { Grommet } from 'grommet';
import theme from './theme';
import GlobalStyle from 'global-styles';

const container = document.getElementById('app');
const root = createRoot(container);
const render = messages => {
  root.render(
    <Provider store={store}>
      <LanguageProvider messages={messages}>
        <Router history={history}>
          <Grommet theme={theme}>
            <GlobalStyle />
            <App />
          </Grommet>
        </Router>
      </LanguageProvider>
    </Provider>,
  );
};

if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() => Promise.all([import('intl/locale-data/jsonp/en.js')]))
    .then(() => render(translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(translationMessages);
}
