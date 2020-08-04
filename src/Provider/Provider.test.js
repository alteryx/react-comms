/* eslint-disable no-underscore-dangle */
import React from 'react';
import { shallow, mount } from 'enzyme';

import Adapter from '../Adapter/Adapter';

import Provider from './Provider';

describe('Provider', () => {
  window.Alteryx = {
    Gui: {
      SetConfiguration: jest.fn(),
      GetConfiguration: jest.fn()
    }
  };
  const adapter = new Adapter();
  adapter.subscribe = jest.fn();
  beforeAll(() => {
    window.dataEnvelope = {
      darkMode: false,
      productTheme: {},
      locale: 'en',
      model: { count: 0 }
    };
  });
  it('should be able to render on the DOM', () => {
    const wrapper = shallow(<Provider messageBroker={adapter} />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should not render AyxAppWrapper with appropriate props if there is no model data', () => {
    const wrapper = shallow(<Provider messageBroker={adapter} />);
    expect(wrapper.find('#app-wrapper')).toMatchObject({});
  });

  it('should render AyxAppWrapper with appropriate props if there is model data', () => {
    adapter._model = {
      data: {
        things: 'stuff'
      }
    };
    const wrapper = shallow(<Provider messageBroker={adapter} />);
    expect(wrapper.find('#app-wrapper').props()).toEqual({
      paletteType: 'light',
      productTheme: {},
      locale: 'en',
      children: undefined,
      id: 'app-wrapper',
      messages: {}
    });
  });

  it('should set subscriptions on the messageBroker for SetConfiguration events after it mounts', () => {
    mount(<Provider messageBroker={adapter} />);
    expect(adapter.subscribe).toHaveBeenCalledTimes(2);
  });
});
