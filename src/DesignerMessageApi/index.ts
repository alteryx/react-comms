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
      Secrets: {},
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
        const encryptedSecrets = Object.keys(this.model.Secrets).reduce(this.encryptSecrets, {});
        const payload = {
          Configuration: {
            Configuration: { ...this._model.Configuration, Secrets: encryptedSecrets },
            Annotation: this._model.Annotation
          }
        };
        this.sendMessage(messageTypes.GET_CONFIGURATION, payload);
      },
      Callbacks: {}
    };
  }

  sendMessage = (type: string, payload: object): Promise<any> => {
    return callback.JsEvent(this.context, type, payload);
  };

  encryptSecrets = async (acc: object, key: string): Promise<any> => {
    acc[key] = await this.sendMessage('Encrypt', { text: this.model.Secrets[key] });
    return acc;
  };

  decryptSecrets = async (acc: object, key: string): Promise<any> => {
    acc[key] = await this.sendMessage('Decrypt', { text: acc[key] });
    return acc;
  };

  generateConfigShape = (currentToolConfiguration: IDesignerConfiguration): IConfigShape => {
    const { Annotation } = currentToolConfiguration.Configuration.Configuration;
    const [decryptedSecrets, cleanToolConfiguration] = this.cleanConfigAndDecryptSecrets(currentToolConfiguration);
    return {
      Configuration: cleanToolConfiguration.Configuration.Configuration || this.model.Configuration,
      Secrets: decryptedSecrets || this.model.Secrets,
      Annotation: Annotation || this.model.Annotation,
      Meta: new FieldListArray(currentToolConfiguration.MetaInfo),
      ToolName: currentToolConfiguration.ToolName,
      ToolId: currentToolConfiguration.ToolId,
      srcData: currentToolConfiguration
    };
  };

  cleanConfigAndDecryptSecrets = (
    currentToolConfiguration: IDesignerConfiguration
  ): [object, IDesignerConfiguration] => {
    const { Secrets, Annotation } = currentToolConfiguration.Configuration.Configuration;
    let decryptedSecrets;
    if (Secrets) {
      delete currentToolConfiguration.Configuration.Configuration.Secrets;
      decryptedSecrets = Object.keys(Secrets).reduce(this.decryptSecrets, Secrets);
    }
    if (Annotation) delete currentToolConfiguration.Configuration.Configuration.Annotation;
    return [decryptedSecrets, currentToolConfiguration];
  };
}

export default DesignerMessageApi;
