import { actions as messagesActions } from '../slices/messagesSlice.js';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const createAPI = (socket, store) => {
  socket.on('newMessage', (message) => {
    store.dispatch(messagesActions.addMessages(message));
  });

  socket.on('newChannel', (channel) => {
    store.dispatch(channelsActions.addChannel(channel));
    store.dispatch(channelsActions.setCurrentChannel(channel.id));
  });

  socket.on('removeChannel', (channel) => {
    store.dispatch(channelsActions.removeChannel(channel));
  });

  socket.on('renameChannel', (channel) => {
    store.dispatch(channelsActions.renameChannel(channel));
  });

  const sendMessage = (message) => {
    socket.emit('newMessage', message, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Socket error', response);
      }
    });
  };

  const createChannel = (channel) => {
    socket.emit('newChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Socket error', response);
      }
    });
  };

  const removeChannel = (channel) => {
    socket.emit('removeChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Socket error', response);
      }
    });
  };

  const renameChannel = (channel) => {
    socket.emit('renameChannel', channel, (response) => {
      if (response.status !== 'ok') {
        throw new Error('Socket error', response);
      }
    });
  };

  const isConnected = () => socket.connected();

  return {
    sendMessage,
    createChannel,
    removeChannel,
    renameChannel,
    isConnected,
  };
};

export default createAPI;
