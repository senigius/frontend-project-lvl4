export const getChannels = (state) => state.channels.channels;
export const getCurrentChannel = (state) => state.channels.currentChannel;
export const getChannelsNames = (state) => state.channels.channels.map(({ name }) => name);

export const getModals = (state) => state.modals.modals;
export const getModalItem = (state) => state.modals.modals.item;

export const getMessages = (state) => state.messages.messages;
