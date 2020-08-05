/* eslint-disable no-underscore-dangle */
import * as callback from '../Utils/callback';

class DesignerMessageApi {
  constructor(ctx) {
    this.context = ctx;
    this._model = {
      configuration: {},
      annotation: ''
    };
    this.subscriptions = new Map();
    this.context.Gui.SetConfiguration = currentToolConfiguration => {
      if (this.subscriptions.has('updateModel')) {
        this.subscriptions.get('updateModel')(currentToolConfiguration);
      }
    };
    this.context.Gui.GetConfiguration = () => {
      const payload = {
        Configuration: {
          Configuration: {
            ...this._model.configuration
          },
          Annotation: this._model.annotation
        }
      };
      callback.JsEvent(this.context, 'GetConfiguration', payload);
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
