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
      SetConfiguration: async currentToolConfiguration => {
        if (this.subscriptions && this.subscriptions.has('MODEL_UPDATED')) {
          this.model = await this.generateConfigShape(currentToolConfiguration);
          this.subscriptions.get('MODEL_UPDATED')(this.model);
        }
        this.context.JsEvent(JSON.stringify({ Event: 'SetConfiguration' }));
      },
      GetConfiguration: () => {
        const keys = Object.keys(this.model.Secrets);
        Promise.all(keys.map(this.encryptSecrets)).then(values => {
          values.forEach(secret => {
            keys.forEach(key => {
              this.model.Secrets[key] = secret;
            });
          });
          const payload = {
            Configuration: {
              Configuration: { ...this._model.Configuration, Secrets: this.model.Secrets },
              Annotation: this._model.Annotation
            }
          };
          this.sendMessage(messageTypes.GET_CONFIGURATION, payload);
        });
      },
      Callbacks: {}
    };
  }

  sendMessage = (type: string, payload: object): Promise<any> => {
    return callback.JsEvent(this.context, type, payload);
  };

  encryptSecrets = (key: string): object => {
    return Promise.resolve(this.sendMessage('Encrypt', { text: this.model.Secrets[key] })).then(res => {
      return res;
    });
  };

  decryptSecrets = (value: string): object => {
    return Promise.resolve(this.sendMessage('Decrypt', { text: value })).then(res => {
      return res;
    });
  };

  generateConfigShape = async (currentToolConfiguration: IDesignerConfiguration): Promise<IConfigShape> => {
    const { Annotation } = currentToolConfiguration.Configuration.Configuration || this.model;
    const [decryptedSecrets, cleanToolConfiguration] = await this.cleanConfigAndDecryptSecrets(
      currentToolConfiguration
    );
    return {
      Configuration: cleanToolConfiguration.Configuration.Configuration || this.model.Configuration,
      Secrets: decryptedSecrets || this.model.Secrets,
      Annotation,
      Meta: new FieldListArray(currentToolConfiguration.MetaInfo),
      ToolName: currentToolConfiguration.ToolName,
      ToolId: currentToolConfiguration.ToolId,
      srcData: currentToolConfiguration
    };
  };

  cleanConfigAndDecryptSecrets = async (
    currentToolConfiguration: IDesignerConfiguration
  ): Promise<[object, IDesignerConfiguration]> => {
    const decryptedSecrets = {};
    if (
      currentToolConfiguration.Configuration.Configuration &&
      currentToolConfiguration.Configuration.Configuration.Annotation
    ) {
      delete currentToolConfiguration.Configuration.Configuration.Annotation;
    }
    if (
      currentToolConfiguration.Configuration.Configuration &&
      currentToolConfiguration.Configuration.Configuration.Secrets
    ) {
      const encryptedValues = Object.values(currentToolConfiguration.Configuration.Configuration.Secrets);
      const decryptedValues = await Promise.all(encryptedValues.map(this.decryptSecrets));
      decryptedValues.forEach(secret => {
        Object.keys(currentToolConfiguration.Configuration.Configuration.Secrets).forEach(key => {
          decryptedSecrets[key] = secret;
        });
      });
      delete currentToolConfiguration.Configuration.Configuration.Secrets;
    }
    return [decryptedSecrets, currentToolConfiguration];
  };
}

export default DesignerMessageApi;
