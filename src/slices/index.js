import { configureStore } from '@reduxjs/toolkit';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

export default configureStore({
  reducer: {
    channelsReducer,
    messagesReducer,
  },
});
