/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  modals: {
    type: null,
    item: null,
  },
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    showModal(state, { payload }) {
      state.modals.type = payload.type;
      state.modals.item = payload.item || null;
    },
    hideModal(state) {
      state.modals.type = null;
      state.modals.item = null;
    },
  },
});

export const { actions } = modalSlice;
export default modalSlice.reducer;
