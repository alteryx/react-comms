/* eslint-disable no-underscore-dangle */
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
  Configuration: object;
  Annotation?: string;
  Meta?: Array<any>;
  ToolName: string;
  ToolId: number;
  srcData: object;
}

interface IMessageTypes {
  GET_CONFIGURATION: string;
}

interface ISubscriptionTypes {
  MODEL_UPDATED: string;
  AYX_APP_CONTEXT_UPDATED: string;
}

export const messageTypes: IMessageTypes = {
  GET_CONFIGURATION: 'GetConfiguration'
};

export const subscriptionEvents: ISubscriptionTypes = {
  MODEL_UPDATED: 'MODEL_UPDATED',
  AYX_APP_CONTEXT_UPDATED: 'AYX_APP_CONTEXT_UPDATED'
};

class DesignerMessageApi extends MessageApiBase<IContext, IModel, IAyxAppContext> {
  constructor(ctx: IContext) {
    super(ctx);
    this._model = {
      Configuration: {},
      Annotation: '',
      Meta: [],
      ToolName: '',
      ToolId: undefined,
      srcData: {}
    };
    this._ayxAppContext = {
      darkMode: false,
      productTheme: {},
      locale: this.context.AlteryxLanguageCode
    };
    this.context.Gui = {
      SetConfiguration: currentToolConfiguration => {
        if (this.subscriptions && this.subscriptions.has('MODEL_UPDATED')) {
          const modifiedConfigShape = {
            Configuration: currentToolConfiguration.Configuration.Configuration || this.model.Configuration,
            Annotation: currentToolConfiguration.Annotation || this.model.Annotation,
            Meta:
              typeof currentToolConfiguration.MetaInfo === 'object'
                ? [currentToolConfiguration.MetaInfo]
                : currentToolConfiguration.MetaInfo,
            ToolName: currentToolConfiguration.ToolName,
            ToolId: currentToolConfiguration.ToolId,
            srcData: currentToolConfiguration
          };
          this.model = modifiedConfigShape;
          this.subscriptions.get('MODEL_UPDATED')(modifiedConfigShape);
        }
        this.context.JsEvent(JSON.stringify({ Event: 'SetConfiguration' }));
      },
      GetConfiguration: () => {
        const payload = {
          Configuration: {
            Configuration: this._model.Configuration,
            Annotation: this._model.Annotation
          }
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
