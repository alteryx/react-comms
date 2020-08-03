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
    wrapper.unmount();
  });

  it('should update AyxAppWrapper props when it receives a data envelope', async () => {
    const wrapper = mount(<Provider />);
    await window.postMessage({ type: 'UPDATE_DATA_ENVELOPE', payload: { darkMode: true } }, '*');
    wrapper.update();
    expect(wrapper.find('#app-wrapper').at(0).props()).toEqual({
      paletteType: 'dark',
      productTheme: {},
      locale: 'en',
      children: undefined,
      id: 'app-wrapper',
      messages: {}
    });
  });
});
