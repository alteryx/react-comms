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
      if (model.Configuration.Annotation !== 'foo')
        handleUpdateModel({ Configuration: { Annotation: 'foo', Configuration: {} } });
      return <div id="child">{model.Annotation}</div>;
    };
    const wrapper = shallow(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('should render AyxAppWrapper with appropriate props if there is model data', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.Configuration.Annotation !== 'foo')
        handleUpdateModel({ Configuration: { Annotation: 'foo', Configuration: {} } });
      return <div id="child">{model.annotation}</div>;
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
      return <div id="child">{model.Configuration.Annotation}</div>;
    };
    const wrapper = shallow(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );
    const valueProp = wrapper.find('#sdk-provider').prop('value');
    expect(valueProp).toHaveLength(2);
    expect(valueProp[0]).toEqual({ Configuration: { Annotation: '', Configuration: {} } });
    expect(valueProp[1]).toBeInstanceOf(Function);
  });

  it('should use the context hook to update the providers model', () => {
    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model.Configuration.Annotation !== 'foo') {
        const newModel = { ...model };
        newModel.Configuration.Annotation = 'foo';
        handleUpdateModel(newModel);
      }
      return <div id="child">{model.Configuration.Annotation}</div>;
    };
    const wrapper = mount(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );

    expect(wrapper.find('#child').text()).toEqual('foo');
  });

  it('should use the current model state as the payload when GetConfiguration is called', () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const expected = {
      Configuration: {
        Annotation: 'foo',
        Configuration: {}
      }
    };

    const Child = () => {
      const [model, handleUpdateModel] = React.useContext(UiSdkContext);
      if (model && model.Configuration.Annotation !== 'foo') {
        const newModel = { ...model };
        newModel.Configuration.Annotation = 'foo';
        handleUpdateModel(newModel);
      }
      return <div id="child">{model.Configuration.Annotation}</div>;
    };
    const wrapper = mount(
      <DesignerApi ctx={window.Alteryx}>
        <Child />
      </DesignerApi>
    );
    wrapper.update();
    window.Alteryx.Gui.GetConfiguration();
    expect(spyJsEvent).toHaveBeenCalledWith(window.Alteryx, 'GetConfiguration', expected);
  });
});
