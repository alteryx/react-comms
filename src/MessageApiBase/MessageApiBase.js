/* eslint-disable no-underscore-dangle */
class MessageApiBase {
  constructor(ctx) {
    this.context = ctx;
    this.subscriptions = new Map();
    this._model = {};
    this._ayxAppContext = {};
  }

  // eslint-disable-next-line no-unused-vars
  sendMessage = (type = '', payload = {}) => {};

  subscribe = (messageType, cb) => {
    this.subscriptions.set(messageType, cb);
  };

  get model() {
    return this._model;
  }

  set model(newModel) {
    this._model = newModel;
  }

  get ayxAppContext() {
    return this._ayxAppContext;
  }

  set ayxAppContext(newAppContext) {
    this._ayxAppContext = newAppContext;
  }
}

export default MessageApiBase;
