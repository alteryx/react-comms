export const messageTypes = [
  'UPDATE_PALETTE_TYPE',
  'UPDATE_DATA_ENVELOPE',
  'UPDATE_THEME',
  'UPDATE_LOCALE',
  'UPDATE_MODEL'
];

export const isValidMessageType = type => {
  return messageTypes.find(t => t === type);
};

export const postMessage = (parentWindow, data) => {
  parentWindow.postMessage(data);
};
