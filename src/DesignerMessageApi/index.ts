/* eslint-disable no-underscore-dangle */
/* eslint-disable react/static-property-placement */
/* eslint-disable import/no-cycle */
import MessageApiBase from '../MessageApiBase';
import * as callback from '../Utils/callback';

export interface IAyxAppContext {
  darkMode: boolean;
  productTheme: object;
  locale: string;
}

export interface IContext {
  Gui: {
    SetConfiguration?: Function;
    GetConfiguration?: Function;
    Callbacks?: object;
  };
  AlteryxLanguageCode?: string;
  JsEvent?: Function;
}

interface IModel {
  Configuration: {
    configuration: object;
    annotation: string;
  };
}

interface IMessageTypes {
  GET_CONFIGURATION: string;
}

interface ISubscriptionTypes {
  MODEL_UPDATED: string;
}

export const messageTypes: IMessageTypes = {
  GET_CONFIGURATION: 'GetConfiguration'
};

export const subscriptionEvents: ISubscriptionTypes = {
  MODEL_UPDATED: 'MODEL_UPDATED'
};

class DesignerMessageApi extends MessageApiBase<object, object, IAyxAppContext> {
  context: IContext;

  _model: IModel;

  _ayxAppContext: IAyxAppContext;

  constructor(ctx: IContext) {
    super(ctx);
    this._model = {
      Configuration: {
        configuration: {},
        annotation: ''
      }
    };
    this._ayxAppContext = {
      darkMode: false,
      productTheme: {},
      locale: this.context.AlteryxLanguageCode
    };
    this.context.Gui = {
      SetConfiguration: currentToolConfiguration => {
        if (this.subscriptions && this.subscriptions.has('MODEL_UPDATED')) {
          this.subscriptions.get('MODEL_UPDATED')(currentToolConfiguration);
        }
        this.context.JsEvent(JSON.stringify({ Event: 'SetConfiguration' }));
      },
      GetConfiguration: () => {
        const payload = {
          ...this._model
        };
        this.sendMessage(messageTypes.GET_CONFIGURATION, payload);
      },
      Callbacks: {}
    };
  }

  sendMessage = (type: string, payload: object): void => {
    callback.JsEvent(this.context, type, payload);
  };
}

export default DesignerMessageApi;
