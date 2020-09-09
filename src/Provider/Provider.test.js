/* eslint-disable no-underscore-dangle */
import React from 'react';
import { shallow, mount } from 'enzyme';

import DesignerMessageApi from '../DesignerMessageApi/index.ts';
import UiSdkContext from '../Context/index.tsx';
import * as callback from '../Utils/callback.ts';

import Provider from './index.tsx';

describe('Provider', () => {
  window.Alteryx = {
    Gui: {
      SetConfiguration: jest.fn(),
      GetConfiguration: jest.fn()
    },
    JsEvent: jest.fn()
  };
  const designerMessageApi = new DesignerMessageApi(window.Alteryx);
  designerMessageApi.subscribe = jest.fn();
  beforeAll(() => {
    window.dataEnvelope = {
      darkMode: false,
      productTheme: {},
      locale: 'en',
      model: { count: 0 }
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be able to render on the DOM', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.annotation !== 'foo') handleUpdateModel({ annotation: 'foo', configuration: {} });
      return <div id="child">{model.annotation}</div>;
    };
    const wrapper = shallow(
      <Provider messageBroker={designerMessageApi}>
        <Child />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AyxAppWrapper with appropriate props if there is model data', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.annotation !== 'foo') handleUpdateModel({ annotation: 'foo', configuration: {} });
      return <div id="child">{model.annotation}</div>;
    };
    const wrapper = shallow(
      <Provider messageBroker={designerMessageApi}>
        <Child />
      </Provider>
    );
    expect(wrapper.find('#sdk-provider').children().props()).toEqual({
      paletteType: 'light',
      theme: {},
      locale: 'en',
      children: undefined,
      messages: {}
    });
  });

  it('should set subscriptions on the messageBroker for UPDATE_MODEL and UPDATE_APP_CONTEXT events after it mounts', () => {
    const Child = () => {
      const [model] = React.useContext(UiSdkContext);
      return <div id="child">{model.annotation}</div>;
    };
    mount(
      <Provider messageBroker={designerMessageApi}>
        <Child />
      </Provider>
    );
    expect(designerMessageApi.subscribe).toHaveBeenCalledTimes(2);
  });

  it('should render the sdk-provider with a model when an event is emitted', () => {
    const Child = () => {
      const [model] = React.useContext(UiSdkContext);
      return <div id="child">{model.annotation}</div>;
    };
    const wrapper = shallow(
      <Provider messageBroker={designerMessageApi}>
        <Child />
      </Provider>
    );
    const valueProp = wrapper.find('#sdk-provider').prop('value');
    expect(valueProp).toHaveLength(2);
    expect(valueProp[0]).toEqual({ annotation: '', configuration: {} });
    expect(valueProp[1]).toBeInstanceOf(Function);
  });

  it('should use the context hook to update the providers model', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.annotation !== 'foo') handleUpdateModel({ annotation: 'foo', configuration: {} });
      return <div id="child">{model.annotation}</div>;
    };
    const wrapper = mount(
      <Provider messageBroker={designerMessageApi}>
        <Child />
      </Provider>
    );

    expect(wrapper.find('#child').text()).toEqual('foo');
  });

  it('should use the current model state as the payload when GetConfiguration is called', () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const messageBroker = new DesignerMessageApi(window.Alteryx);
    const expected = {
      Configuration: {
        annotation: 'foo',
        configuration: {}
      }
    };

    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.annotation !== 'foo') handleUpdateModel({ annotation: 'foo', configuration: {} });
      return <div id="child">{model.annotation}</div>;
    };
    const wrapper = mount(
      <Provider messageBroker={messageBroker}>
        <Child />
      </Provider>
    );
    wrapper.update();
    messageBroker.context.Gui.GetConfiguration();
    expect(spyJsEvent).toHaveBeenCalledWith(messageBroker.context, 'GetConfiguration', expected);
  });
});
