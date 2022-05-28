import React from 'react';
import { Provider } from 'react-redux';
import 'regenerator-runtime';

import App from './components/App.jsx';
import { AuthProvider } from './contexts/authContext.jsx';
import SocketContext from './contexts/socketContext.jsx';
import store from './slices/index.js';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

const init = (socket) => {
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
        <Provider store={store}>
            <AuthProvider>
                <SocketContext.Provider value={socket}>
                    <App />
                </SocketContext.Provider>
            </AuthProvider>
        </Provider>
  );
};

export default init;
