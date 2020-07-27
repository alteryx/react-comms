import React, { Children, cloneElement, isValidElement } from 'react';
import { FormattedMessage } from 'react-intl';
import { AyxAppWrapper, Button, Typography, Grid, Card } from '@ayx/ui-core'
import { validateMessageType } from '../Utils/Communication'

export default class Provider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateEnvelope: {},
    };
  }

  postMessageToParent = (data) => {
    if (validateMessageType(data.type)) {
      window.parent.postMessage(data)
    }
  }

  receiveMessageEnvelope = ({ data }) => {
    if (validateMessageType(data.type)) {
      this.setState({
        ...data.payload
      })
    }
  }

  componentDidMount() {
    const dataEnvelope = window.dataEnvelope
    this.setState({ ...dataEnvelope })
    window.addEventListener('message', this.receiveMessageEnvelope)
  }

  componentWillUnmount() {
    window.removeEventListener('message', this.receiveMessageEnvelope)
  }

  render() {
    const { dataEnvelope } = this.state
    const { locale, messages, productTheme, darkMode, model } = dataEnvelope

    const childrenWithProps = Children.map(this.props.children, child => {
      // Checking isValidElement is the safe way and avoids a TS error too.
      if (isValidElement(child)) {
        return cloneElement(child, { ...child.props, model, onMessage: this.postMessageToParent })
      }

      return child;
    });

    return (
      <AyxAppWrapper locale={locale} messages={messages} theme={productTheme} paletteType={darkMode ? 'dark' : 'light'}>
         {childrenWithProps}
      </AyxAppWrapper>
    );
  }
}