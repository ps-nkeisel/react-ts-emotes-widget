/**
 * index.ts
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */

import './polyfills';
import 'url-search-params-polyfill';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'redux-zero/react';
import { ThemeProvider } from 'styled-components';

import { generateGlobalStyles, generateTheme } from '@vuukle/widget-theme';
import articleConfig from 'config/article.config';
import { TranslationProvider } from 'contexts/TranslationContext';
import App from 'modules/App';
import WatchHeight from 'services/WatchHeight';
import store from 'store';

/* ========================================================
 * 💅 Global Styles
======================================================== */
const theme = generateTheme(articleConfig.theme, false);
const GlobalStyles = generateGlobalStyles(theme);

/* ========================================================
 * 🏞️ Render React App
======================================================== */
const MOUNT_NODE = document.getElementById('app');

import Communication from './services/Communication';
Communication.init();

const render = () =>
  ReactDOM.render(
    <TranslationProvider>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <div>
            <GlobalStyles />
            <App />
          </div>
        </ThemeProvider>
      </Provider>
    </TranslationProvider>,
    MOUNT_NODE
  );

if ((module as any).hot && MOUNT_NODE instanceof HTMLElement) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  (module as any).hot.accept('./modules/App', () => {
    ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    render();
  });
}

render();

/* ========================================================
 Ohh!😱 And one more... we need to watch height of app since
 we will be rendered inside iframe
======================================================== */
if (MOUNT_NODE !== null) {
  WatchHeight.init(MOUNT_NODE);
}

/* ========================================================
* and one more... 😃 Log Vuukle Initialization
======================================================== */
// tslint:disable-next-line
console.log(
  `%c[VUUKLE] Emotes widget initialized! Version: ${process.env.VERSION}. Need help? Reach us at support[at]vuukle[dot]com`,
  'color:#039BE5;'
);
