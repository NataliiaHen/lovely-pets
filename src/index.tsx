import './index.scss';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Root } from './Root';
import { PageSizeProvider } from './storage/PageSizeContext';
import { FavProvider } from './storage/FavContext';
import { store } from './app/store';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PageSizeProvider>
          <FavProvider>
            <Root />
          </FavProvider>
        </PageSizeProvider>
      </Router>
    </Provider>
  </React.StrictMode>,
);
