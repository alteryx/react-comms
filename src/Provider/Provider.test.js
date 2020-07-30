import React from 'react';
import { shallow, mount } from 'enzyme';

import Provider from './Provider';

describe('Provider', () => {
  beforeAll(() => {
    window.dataEnvelope = {
      darkMode: false,
      productTheme: {},
      locale: 'en',
      model: { count: 0 }
    };
  });
  it('should be able to render on the DOM', () => {
    const wrapper = shallow(<Provider />);

    expect(wrapper).toMatchSnapshot();
  });

  it('should render AyxAppWrapper with appropriate props', () => {
    const wrapper = shallow(<Provider />);
    expect(wrapper.find('#app-wrapper').props()).toEqual({
      paletteType: 'light',
      productTheme: {},
      locale: 'en',
      children: undefined,
      id: 'app-wrapper',
      messages: {}
    });
  });

  it('should update its dataEnvelope when a message is posted to it and thus props on App Wrapper', () => {
    const wrapper = mount(<Provider />);
    window.postMessage({ type: 'UPDATE_DATA_ENVELOPE', payload: { darkMode: true } }, window.origin);

    expect(wrapper.find('#app-wrapper').props()).toEqual({
      paletteType: 'dark',
      productTheme: {},
      locale: 'en',
      children: undefined,
      id: 'app-wrapper',
      messages: {}
    });
  });
});
