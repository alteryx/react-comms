/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import isValidMessageType from '../Utils/communication';
import AyxAppWrapper from '../Core/AyxAppWrapper';
import UiSdkContext from '../Context';

const Provider = props => {
  const { messages, messageBroker } = props;
  // Save for d.next implementation where application values might change
  const windowData = window.dataEnvelope ? window.dataEnvelope : {};
  const [dataEnvelope, updateDataEnvelope] = useState(windowData);

  const [model, updateModel] = useState(messageBroker.model);

  const setModel = () => {
    messageBroker.model = model;
  };

  useEffect(() => {
    const receiveDataEnvelope = ({ data }) => {
      if (isValidMessageType(data.type)) updateDataEnvelope({ ...dataEnvelope, ...data.payload });
    };
    const receiveToolConfiguration = data => {
      updateModel({ ...data });
    };
    window.addEventListener('message', receiveDataEnvelope);
    messageBroker.subscribe('SetConfiguration', receiveToolConfiguration);

    return function removeEventListener() {
      window.removeEventListener('message', receiveDataEnvelope);
    };
  }, []);

  const { darkMode = false, productTheme = {}, locale = 'en' } = dataEnvelope;
  return (
    <UiSdkContext.Provider model={messageBroker.model} setModel={setModel}>
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
  messageBroker: PropTypes.shape({
    model: PropTypes.object(),
    subscribe: PropTypes.func()
  }).isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
};

Provider.defaultProps = {
  messages: {}
};

export default Provider;
