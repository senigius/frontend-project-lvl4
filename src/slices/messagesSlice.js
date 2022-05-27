/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    setMessages(state, { payload }) {
      state.messages = payload;
    },
    addMessages(state, { payload }) {
      state.messages.push(payload);
    },
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
