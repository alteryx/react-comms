import FieldListArray from '../MetaInfoHelpers/FieldListArray';

interface IMessageTypes {
  GET_CONFIGURATION: string;
}

export interface ISubscriptionTypes {
  MODEL_UPDATED: string;
  AYX_APP_CONTEXT_UPDATED: string;
}

export const subscriptionEvents: ISubscriptionTypes = {
  MODEL_UPDATED: 'MODEL_UPDATED',
  AYX_APP_CONTEXT_UPDATED: 'AYX_APP_CONTEXT_UPDATED'
};

export enum SUBSCRIPTION_EVENTS {
  MODEL_UPDATED = 'MODEL_UPDATED',
  AYX_APP_CONTEXT_UPDATED = 'AYX_APP_CONTEXT_UPDATED'
}

export interface IModelUpdatedEvent {
  type: SUBSCRIPTION_EVENTS.MODEL_UPDATED;
  model: object;
}
export interface IAppContextUpdatedEvent {
  type: SUBSCRIPTION_EVENTS.AYX_APP_CONTEXT_UPDATED;
  model: object;
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

export interface IAyxAppContext {
  darkMode: boolean;
  productTheme: object;
  locale: string;
}

export interface IDesignerConfiguration {
  Configuration: {
    Configuration?: {
      Secrets?: object;
      Annotation?: string;
    };
  };
  Annotation: string;
  MetaInfo: Array<any>;
  ToolName: string;
  ToolId: number;
}

export interface IConfigShape {
  Configuration: object;
  Annotation: string;
  Meta: FieldListArray;
  ToolName: string;
  ToolId: number;
  Secrets?: object;
  srcData: IDesignerConfiguration;
}

export interface IModel {
  Configuration: object;
  Annotation: string;
  Meta: FieldListArray | Array<any>;
  ToolName: string;
  Secrets?: object;
  ToolId: number;
  srcData: object;
}

export const messageTypes: IMessageTypes = {
  GET_CONFIGURATION: 'GetConfiguration'
};
