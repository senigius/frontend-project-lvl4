/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import routes from '../routes.js';

const defaultChannelId = 1;

export const fetchChannels = createAsyncThunk(
  'channels/fetchChannels',
  async (authHeader) => {
    const { data } = await axios.get(routes.usersPath(), { headers: authHeader });
    return data;
  },
);

const initialState = {
  channels: [],
  currentChannel: defaultChannelId,
};

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels(state, { payload }) {
      state.channels = payload;
    },
    setCurrentChannel(state, { payload }) {
      state.currentChannel = payload;
    },
    addChannel(state, { payload }) {
      state.channels.push(payload);
    },
    renameChannel(state, { payload }) {
      const channel = state.channels.find((ch) => ch.id === payload.id);
      channel.name = payload.name;
    },
    removeChannel(state, { payload }) {
      state.channels = state.channels.filter((ch) => ch.id !== payload.id);
      if (payload.id === state.currentChannel) {
        state.currentChannel = defaultChannelId;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannels.fulfilled, (state, { payload }) => {
        state.channels = payload.channels;
        state.currentChannel = payload.currentChannelId;
      })
      .addCase(fetchChannels.rejected, (_state, action) => {
        console.log(action.error);
      });
  },
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
