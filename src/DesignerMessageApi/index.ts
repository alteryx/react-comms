/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable react/static-property-placement */
import MessageApiBase from '../MessageApiBase';
import * as callback from '../Utils/callback';
import { IContext, messageTypes, IModel, IAyxAppContext, IDesignerConfiguration, IConfigShape } from '../Utils/types';
import FieldListArray from '../MetaInfoHelpers/FieldListArray';

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
          this.model = this.generateConfigShape(currentToolConfiguration);
          this.subscriptions.get('MODEL_UPDATED')(this.model);
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

  generateConfigShape = (currentToolConfiguration: IDesignerConfiguration): IConfigShape => {
    return {
      Configuration: currentToolConfiguration.Configuration.Configuration || this.model.Configuration,
      Annotation: currentToolConfiguration.Annotation || this.model.Annotation,
      Meta: new FieldListArray(currentToolConfiguration.MetaInfo),
      ToolName: currentToolConfiguration.ToolName,
      ToolId: currentToolConfiguration.ToolId,
      srcData: currentToolConfiguration
    };
  };
}

export default DesignerMessageApi;
