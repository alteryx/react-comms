/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-cycle */
/* eslint-disable react/static-property-placement */
import MessageApiBase from '../MessageApiBase';
import * as callback from '../Utils/callback';
import { IContext, IModel, IAyxAppContext, IDesignerConfiguration, IConfigShape, ISecretsShape } from '../Utils/types';
import { MESSAGE_TYPES } from '../Utils/constants';
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
        this.context.JsEvent(JSON.stringify({ Event: MESSAGE_TYPES.SET_CONFIGURATION }));
      },
      GetConfiguration: () => {
        const keys = Object.keys(this.model.Secrets);
        Promise.all(keys.map(this.encryptSecrets)).then(() => {
          const payload = {
            Configuration: {
              Configuration: { ...this._model.Configuration, Secrets: { ...this.model.Secrets } },
              Annotation: this._model.Annotation
            }
          };
          this.sendMessage(MESSAGE_TYPES.GET_CONFIGURATION, payload);
        });
      },
      Callbacks: {}
    };
  }

  sendMessage = (type: string, payload: object): Promise<any> => {
    return callback.JsEvent(this.context, type, payload);
  };

  encryptSecrets = (key: string): object => {
    if (!this.model.Secrets[key].text.length) {
      // only send an encrypt call if a string is present
      // protects against empty default config values
      return { text: '', encryptionMode: '' };
    }
    if (this.model.Secrets[key].encrypted) {
      return;
    }
    return Promise.resolve(
      this.sendMessage('Encrypt', {
        text: this.model.Secrets[key].text,
        encryptionMode: this.model.Secrets[key].encryptionMode || 'obfuscation'
      })
    ).then(res => {
      this.model.Secrets[key] = {
        text: res,
        encryptionMode: this.model.Secrets[key].encryptionMode,
        encrypted: true
      };
    });
  };

  decryptSecrets = (secret: ISecretsShape): object => {
    if (!secret.text.length) {
      return { text: '', encryptionMode: '' || 'obfuscation' };
    }
    return Promise.resolve(this.sendMessage('Decrypt', { text: secret.text })).then(res => {
      return { text: res, encryptionMode: secret.encryptionMode };
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
      const encryptedValueKeys = Object.keys(currentToolConfiguration.Configuration.Configuration.Secrets);
      const valuesToDecrypt = encryptedValueKeys.map(
        key => currentToolConfiguration.Configuration.Configuration.Secrets[key]
      );
      const decryptedValues = await Promise.all(valuesToDecrypt.map(this.decryptSecrets));
      for (let i = 0; i < encryptedValueKeys.length; i++) {
        decryptedSecrets[encryptedValueKeys[i]] = decryptedValues[i];
      }
      delete currentToolConfiguration.Configuration.Configuration.Secrets;
    }
    return [decryptedSecrets, currentToolConfiguration];
  };
}

export default DesignerMessageApi;
