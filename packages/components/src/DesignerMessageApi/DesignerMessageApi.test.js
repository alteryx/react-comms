/* eslint-disable no-underscore-dangle */
import * as callback from '../Utils/callback.ts';

import DesignerMessageApi from './index.ts';

describe('DesignerMessageApi', () => {
  beforeAll(() => {
    window.Alteryx = {
      AlteryxLanguageCode: 'US-EN',
      Gui: {
        SetConfiguration: jest.fn(),
        GetConfiguration: jest.fn()
      },
      JsEvent: jest.fn()
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should instantiate itself with a _model, context, and subscriptions', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    expect(messageBroker.model).toMatchObject({});
    expect(messageBroker.context).toMatchObject(window.Alteryx);
    expect(messageBroker.subscriptions).toMatchObject(new Map());
  });

  it('should call JsEvent when asked to send a message', () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    messageBroker.sendMessage('Update_stuff', { data: { stuff: 'things' } });

    expect(spyJsEvent).toHaveBeenCalledWith('Update_stuff', { data: { stuff: 'things' } }, messageBroker.context);
  });

  it('should set a new subscription in its subscriptions map when called', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const func = jest.fn();
    const map = new Map();
    map.set('SetConfiguration', func);

    messageBroker.subscribe('SetConfiguration', func);

    expect(messageBroker.subscriptions).toEqual(map);
  });

  it('should invoke the SetConfiguration callback in its subscriptions through the context.Gui if it is subscribed to SetConfiguration', async () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const func = jest.fn();
    const map = new Map();
    map.set('MODEL_UPDATED', func);

    messageBroker.subscribe('MODEL_UPDATED', func);
    await messageBroker.context.Gui.SetConfiguration({
      Configuration: {
        Configuration: {
          Annotation: '',
          Count: 1
        },
        MetaInfo: [{ data: 'some data' }],
        ToolName: 'Sample Tool',
        ToolId: 1
      }
    });

    expect(func).toHaveBeenCalled();
  });

  it('should call JsEvent to Decrypt passwords on GetConfiguration if the Secrets key is present', () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');

    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const func = jest.fn();
    const map = new Map();
    map.set('MODEL_UPDATED', func);

    const expected = {
      text: 'Secret'
    };

    messageBroker.subscribe('MODEL_UPDATED', func);
    messageBroker.context.Gui.SetConfiguration({
      Configuration: {
        Configuration: {
          Annotation: '',
          Count: 1,
          Secrets: {
            Secret: { text: 'Secret', encryptionMode: 'obfuscation' }
          }
        },
        MetaInfo: [{ data: 'some data' }],
        ToolName: 'Sample Tool',
        ToolId: 1
      }
    });

    expect(spyJsEvent).toHaveBeenCalledWith('Decrypt', expected, messageBroker.context);
  });

  it('should call JsEvent to Encrypt passwords on SetConfiguration if the Secrets key is present', () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent').mockImplementationOnce(() => 'secret');

    const messageBroker = new DesignerMessageApi(window.Alteryx);
    messageBroker.model.Secrets = { secret: { text: 'secret', encryptionMode: 'obfuscation' } };
    const expected = {
      text: 'secret',
      encryptionMode: 'obfuscation'
    };

    messageBroker.context.Gui.GetConfiguration();

    expect(spyJsEvent).toHaveBeenCalledWith('Encrypt', expected, messageBroker.context);
  });

  it('should use the context GetConfiguration to invoke a jsEvent with context, GetConfiguration, and model as params', async () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const expected = {
      Configuration: {
        Configuration: {
          Secrets: {}
        },
        Annotation: ''
      }
    };

    await messageBroker.context.Gui.GetConfiguration();

    expect(spyJsEvent).toHaveBeenCalledWith('GetConfiguration', expected, messageBroker.context);
  });

  it('should use assignDecryptedSecrets to update decrypted values', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const encryptedValueKeys = ['encryptedStuffKey']
    const decryptedSecrets = { encryptedStuffKey: '' }
    const decryptedValues = ['decryptedStuff']
    messageBroker.assignDecryptedSecrets(encryptedValueKeys, decryptedSecrets, decryptedValues);

    expect(decryptedSecrets).toEqual({ encryptedStuffKey: 'decryptedStuff' })
  })

  it('should use decryptSecrets to return an empty string if there is no text present', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const secret = { text: '', encryptionMode: 'obfuscation' }
    const decryptedSecret = messageBroker.decryptSecrets(secret);
    expect(secret).toEqual(decryptedSecret);
  })

  it('should use decryptSecrets to call decryption to engine if text is present', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const secret = { text: 'stuff', encryptionMode: 'obfuscation' }
    messageBroker.decryptSecrets(secret);
    expect(spyJsEvent).toHaveBeenCalled();
  })

  it('should use the getter for alteryxAppContext to return the contexts language code', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    expect(messageBroker.ayxAppContext).toEqual({ darkMode: false, locale: 'US-EN', productTheme: {} });
  });

  it('should use the setter for model to data to set _model', () => {
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const toolConfiguration = {
      data: 'such good data'
    };

    messageBroker.model = toolConfiguration;

    expect(messageBroker.model).toEqual(toolConfiguration);
  });
});
