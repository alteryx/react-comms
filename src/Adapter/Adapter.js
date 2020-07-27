import React, { Component } from 'react';
import { Container } from '@ayx/ui-core';
import { withStyles } from '@ayx/ui-core/styles';
import Frame from 'react-frame-component';

import { getTemplate } from '../Utils/PageBuilder';
import { validateMessageType } from '../Utils/Communication';

export default class Adapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialContent: '',
      darkMode: false,
      model: { },
      productTheme: {},
      locale: 'en'
    };
  }

  handleRef = ref => {
    this.contentWindow = ref ? ref.node.contentWindow : null;
  };

  receiveMessageEnvelope = ({ data }) => {
    if (validateMessageType(data.type)) {
      this.setState({
        ...data.payload
      });
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state || prevProps !== this.props) {
      this.contentWindow.postMessage({ type: 'UPDATE_DATA_ENVELOPE', payload: { ...this.state } });
    }
  }

  componentDidMount() {
    const { productTheme, model, darkMode, locale } = this.state
    this.setState({
      initialContent: getTemplate({ productTheme, model, darkMode, locale }, 'public/path/vendor', 'public/path/main')
    });
    window.addEventListener('message', this.receiveMessageEnvelope);
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessageEnvelope);
  }

  render() {
    return (
      <Frame
        initialContent={this.state.initialContent}
        ref={this.handleRef}
        style={{ border: 0, height: '100%', width: '100%' }}
        sandbox
      />
    );
  }
}