/* eslint-disable no-underscore-dangle */
import React from 'react';
import { shallow, mount } from 'enzyme';

import UiSdkContext from '../Context/index.tsx';
import * as callback from '../Utils/callback.ts';

import DesignerApi from './index.tsx';

describe('DesignerApi', () => {
  beforeAll(() => {
    window.Alteryx = {
      AlteryxLanguageCode: 'en',
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
  it('should be able to render on the DOM', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.Annotation !== 'foo') {
        const newModel = { ...model };
        newModel.Annotation = 'foo';
        handleUpdateModel(newModel);
      }
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = shallow(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should be able to render on the DOM with a defaultConfig', async () => {
    const Child = () => {
      const [model] = React.useContext(UiSdkContext);
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = await shallow(
      <DesignerApi ctx={window.Alteryx} defaultConfig={{ Annotation: 'foo' }}>
        <Child />
      </DesignerApi>
    );

    const valueProp = wrapper.find('#sdk-provider').prop('value');
    expect(valueProp[0]).toEqual({
      ToolName: '',
      ToolId: undefined,
      Annotation: 'foo',
      Configuration: {},
      Secrets: {},
      Meta: [],
      srcData: {}
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AyxAppWrapper with appropriate props if there is model data', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.Annotation !== 'foo') {
        const newModel = { ...model };
        newModel.Annotation = 'foo';
        handleUpdateModel(newModel);
      }
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = shallow(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );
    expect(wrapper.find('#sdk-provider').children().props()).toEqual({
      paletteType: 'light',
      theme: {},
      locale: 'en',
      children: undefined,
      messages: {}
    });
  });

  it('should render the sdk-provider with a model when an event is emitted', () => {
    const Child = () => {
      const [model] = React.useContext(UiSdkContext);
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = shallow(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );
    const valueProp = wrapper.find('#sdk-provider').prop('value');
    expect(valueProp).toHaveLength(2);
    expect(valueProp[0]).toEqual({
      ToolName: '',
      ToolId: undefined,
      Annotation: '',
      Configuration: {},
      Secrets: {},
      Meta: [],
      srcData: {}
    });
    expect(valueProp[1]).toBeInstanceOf(Function);
  });

  it('should use the context hook to update the providers model', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.Annotation !== 'foo') {
        const newModel = { ...model };
        newModel.Annotation = 'foo';
        handleUpdateModel(newModel);
      }
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = mount(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );

    expect(wrapper.find('#child').text()).toEqual('foo');
  });

  it('should use the current model state as the payload when GetConfiguration is called', async () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const expected = {
      Configuration: {
        Configuration: {
          Secrets: {}
        },
        Annotation: 'foo'
      }
    };

    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model && model.Annotation !== 'foo') {
        const newModel = { ...model };
        newModel.Annotation = 'foo';
        handleUpdateModel(newModel);
      }
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = shallow(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );
    wrapper.update();
    await window.Alteryx.Gui.GetConfiguration();
    expect(spyJsEvent).toHaveBeenCalledWith('GetConfiguration', expected, window.Alteryx);
  });

  it('should handle updates to the secrets key for both the secret itself and its encryptionMode', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (!model.Secrets.password1.text) {
        const newModel = { ...model };
        newModel.Secrets = { ...newModel.Secrets, password1: { text: 'secret', encryptionMode: 'machine' } };
        handleUpdateModel(newModel);
      }
      return (
        <div>
          <div id="child-1">{model.Secrets.password1.text || ''}</div>
          <div id="child-2">{model.Secrets.password1.encryptionMode || ''}</div>
        </div>
      );
    };

    const wrapper = mount(
      <DesignerApi
        ctx={window.Alteryx}
        defaultConfig={{ Secrets: { password1: { text: null, encryptionMode: 'obfuscation' } } }}
      >
        <Child />
      </DesignerApi>
    );
    expect(wrapper.find('#child-1').text()).toEqual('secret');
    expect(wrapper.find('#child-2').text()).toEqual('machine');
  });

  it('should handle updates to the correct secrets object if there are multiple secret keys for both the secret itself and its encryptionMode', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (!model.Secrets.password2.text) {
        const newModel = { ...model };
        newModel.Secrets = { 
          ...newModel.Secrets, 
          password2: { text: 'secret3', encryptionMode: 'user' },
          password1: { text: 'secret2', encryptionMode: 'machine' }
        }
        handleUpdateModel(newModel);
      }
      return (
        <div>
          <div id="child-1">{model.Secrets.password2.text}</div>
          <div id="child-2">{model.Secrets.password2.encryptionMode}</div>
          <div id="child-3">{model.Secrets.password1.text}</div>
          <div id="child-4">{model.Secrets.password1.encryptionMode}</div>
        </div>
      );
    };

    const wrapper = mount(
      <DesignerApi
        ctx={window.Alteryx}
        defaultConfig={{
          Secrets: {
            password1: { text: null, encryptionMode: 'obfuscation' },
            password2: { text: null, encryptionMode: 'obfuscation' }
          }
        }}
      >
        <Child />
      </DesignerApi>
    );
    expect(wrapper.find('#child-1').text()).toEqual('secret3');
    expect(wrapper.find('#child-2').text()).toEqual('user');
    expect(wrapper.find('#child-3').text()).toEqual('secret2');
    expect(wrapper.find('#child-4').text()).toEqual('machine');
  });
});
