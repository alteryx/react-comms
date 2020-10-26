import FieldListArray from '../MetaInfoHelpers/FieldListArray';

export enum MESSAGE_TYPES {
  GET_CONFIGURATION = 'GetConfiguration',
  SET_CONFIGURATION = 'SetConfiguration'
}

export enum SUBSCRIPTION_EVENTS {
  MODEL_UPDATED = 'MODEL_UPDATED',
  AYX_APP_CONTEXT_UPDATED = 'AYX_APP_CONTEXT_UPDATED',
  INIT = 'INIT'
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

export interface IMicroAppMessage {
  data: {
    type: string;
    payload: {
      model?: object;
      darkMode?: boolean;
      locale?: string;
      productTheme?: object;
    };
  };
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
