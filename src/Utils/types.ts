import FieldListArray from '../MetaInfoHelpers/FieldListArray';

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
