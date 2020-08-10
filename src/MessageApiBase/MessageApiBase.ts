/* eslint-disable react/static-property-placement */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */

abstract class MessageApiBase {
  subscriptions: Map<string, Function>;

  context: object;

  _model: object;

  _ayxAppContext: object;

  constructor(ctx: object) {
    this.context = ctx;
    this.subscriptions = new Map();
    this._model = {};
    this._ayxAppContext = {};
  }

  sendMessage = (type: string, payload: object): void => {};

  subscribe = (messageType: string, cb: Function): void => {
    this.subscriptions.set(messageType, cb);
  };

  get model(): object {
    return this._model;
  }

  set model(newModel: object) {
    this._model = newModel;
  }

  get ayxAppContext(): object {
    return this._ayxAppContext;
  }

  set ayxAppContext(newAppContext: object) {
    this._ayxAppContext = newAppContext;
  }
}

export default MessageApiBase;
