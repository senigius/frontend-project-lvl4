import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import filter from 'leo-profanity';
import 'regenerator-runtime';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';

import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import APIContext from './contexts/APIContext.jsx';
import store from './slices/index.js';
import 'react-toastify/scss/main.scss';
import ru from './locales/ru.js';
import createAPI from './api/index.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  captureUncaught: true,
  captureUnhandledRejections: true,
  enviroment: 'production',
};

const init = async (socket) => {
  await i18n.init({
    lng: 'ru',
    debug: false,
    resources: {
      ru,
    },
  });

  filter.loadDictionary();
  filter.add(filter.getDictionary('ru'));

  const api = createAPI(socket, store);

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <APIContext.Provider value={api}>
                <App />
              </APIContext.Provider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
