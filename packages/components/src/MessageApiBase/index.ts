/* eslint-disable react/static-property-placement */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable no-underscore-dangle */

abstract class MessageApiBase<T, TU, TV> {
  subscriptions: Map<string, Function>;

  context: T;

  model: TU;

  ayxAppContext: TV;

  constructor(ctx: T) {
    this.context = ctx;
    this.subscriptions = new Map();
  }

  sendMessage = (type: string, payload: object): void => {};

  subscribe = (messageType: string, cb: Function): void => {
    this.subscriptions.set(messageType, cb);
  };
}

export default MessageApiBase;
