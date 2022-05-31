import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import filter from 'leo-profanity';
import 'regenerator-runtime';
import { ErrorBoundary, Provider as RollbarProvider } from '@rollbar/react';

import App from './components/App.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.jsx';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import 'react-toastify/scss/main.scss';
import ru from './locales/ru.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const rollbarConfig = {
  accessToken: '6f9cd66044fa4a3db520d660139df37f',
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

  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessages(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
  });

  socket.on('removeChannel', (channel) => {
    store.dispatch(channelsActions.removeChannel(channel));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsActions.renameChannel(channel));
  });

  return (
    <RollbarProvider config={rollbarConfig}>
      <ErrorBoundary>
        <Provider store={store}>
          <I18nextProvider i18n={i18n}>
            <AuthProvider>
              <SocketContext.Provider value={socket}>
                <App />
              </SocketContext.Provider>
            </AuthProvider>
          </I18nextProvider>
        </Provider>
      </ErrorBoundary>
    </RollbarProvider>
  );
};

export default init;
