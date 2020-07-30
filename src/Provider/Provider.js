import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AyxAppWrapper from '../Core/AyxAppWrapper';
import UiSdkContext from '../Context';
import { isValidMessageType } from '../Utils/communication';

const Provider = props => {
  const envelope = window.dataEnvelope ? window.dataEnvelope : {};
  const [dataEnvelope, updateDataEnvelope] = useState(envelope);

  useEffect(() => {
    const receiveMessageEnvelope = ({ data }) => {
      if (isValidMessageType(data.type)) {
        updateDataEnvelope(data.payload);
      }
    };
    window.addEventListener('message', receiveMessageEnvelope);

    return function removeEventListener() {
      window.removeEventListener('message', receiveMessageEnvelope);
    };
  }, []);

  const { darkMode = false, productTheme = {}, locale = 'en', model = {} } = dataEnvelope;
  const { messages } = props;
  return (
    <UiSdkContext.Provider model={model}>
      <AyxAppWrapper
        id="app-wrapper"
        locale={locale}
        messages={messages}
        paletteType={darkMode ? 'dark' : 'light'}
        productTheme={productTheme}
      >
        {props.children}
      </AyxAppWrapper>
    </UiSdkContext.Provider>
  );
};

Provider.propTypes = {
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
};

Provider.defaultProps = {
  messages: {}
};

export default Provider;
