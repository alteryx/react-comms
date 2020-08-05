/* eslint-disable no-underscore-dangle */
import MessageApiBase from '../MessageApiBase/MessageApiBase';
import * as callback from '../Utils/callback';

export const messageTypes = {
  GET_CONFIGURATION: 'GetConfiguration'
};

export const subscriptionEvents = {
  MODEL_UPDATED: 'MODEL_UPDATED'
};

class DesignerMessageApi extends MessageApiBase {
  constructor(ctx) {
    super(ctx);
    this._model = {
      configuration: {},
      annotation: ''
    };
    this._ayxAppContext = {
      darkMode: false,
      productTheme: {},
      locale: this.context.AlteryxLanguageCode
    };
    this.context.Gui.SetConfiguration = currentToolConfiguration => {
      if (this.subscriptions.has('MODEL_UPDATED')) {
        this.subscriptions.get('MODEL_UPDATED')(currentToolConfiguration);
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
      this.sendMessage(messageTypes.GET_CONFIGURATION, payload);
    };
  }

  sendMessage = (type, payload) => {
    callback.JsEvent(this.context, type, payload);
  };
}

export default DesignerMessageApi;
