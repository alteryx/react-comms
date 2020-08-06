const messageTypes: string[] = [
  'UPDATE_PALETTE_TYPE',
  'UPDATE_DATA_ENVELOPE',
  'UPDATE_THEME',
  'UPDATE_LOCALE',
  'UPDATE_MODEL'
];

export const isValidMessageType: object = (type: string) => {
  return messageTypes.find(t => t === type);
};
