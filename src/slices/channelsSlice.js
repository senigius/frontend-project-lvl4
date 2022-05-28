/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const defaultChannelId = 1;

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
});

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
