/* eslint-disable no-underscore-dangle */
import * as callback from '../Utils/callback';

class DesignerMessageApi {
  constructor(ctx) {
    this.context = ctx;
    this._model = {};
    this.subscriptions = new Map();
    this.context.Gui.SetConfiguration = currentToolConfiguration => {
      if (this.subscriptions.has('SetConfiguration')) {
        this.subscriptions.get('SetConfiguration')(currentToolConfiguration);
      }
    };
    this.context.Gui.GetConfiguration = () => {
      callback.JsEvent(this.context, 'GetConfiguration', this._model);
    };
  }

  sendMessage = (type, payload) => {
    callback.JsEvent(this.context, type, payload);
  };

  subscribe = (messageType, cb) => {
    this.subscriptions.set(messageType, cb);
  };

  get languageCode() {
    return this.context.AlteryxLanguageCode;
  }

  set model(toolConfiguration) {
    this._model = toolConfiguration;
  }
}

export default DesignerMessageApi;
