/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';
import { actions as channelsActions } from './channelsSlice.js';

export const fetchMessages = createAsyncThunk(
  'channels/fetchMessages',
  async (authHeader) => {
    const { data } = await axios.get(routes.usersPath(), { headers: authHeader });
    return data;
  },
);

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
  extraReducers: (builder) => {
    builder
      .addCase(channelsActions.removeChannel, (state, { payload }) => {
        state.messages = state.messages.filter((m) => m.channelId !== payload.id);
      })
      .addCase(fetchMessages.fulfilled, (state, { payload }) => {
        state.messages = payload.messages;
      })
      .addCase(fetchMessages.rejected, (_state, action) => {
        console.log(action.error);
      });
  },
});

export const { actions } = messagesSlice;
export default messagesSlice.reducer;
