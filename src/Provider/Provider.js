/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import isValidMessageType from '../Utils/communication';
import AyxAppWrapper from '../Core/AyxAppWrapper';
import UiSdkContext from '../Context';

const Provider = props => {
  const { messages, messageBroker } = props;
  const [dataEnvelope, updateDataEnvelope] = useState({});
  const [model, updateModel] = useState(messageBroker._model);

  const setModel = newModel => {
    updateModel(newModel);
    messageBroker._model = newModel;
  };

  useEffect(() => {
    const receiveDataEnvelope = ({ data }) => {
      if (isValidMessageType(data.type)) updateDataEnvelope({ ...data.payload });
    };
    const receiveToolConfiguration = data => {
      updateModel({ ...data });
    };
    messageBroker.subscribe('SetConfiguration', receiveToolConfiguration);
    messageBroker.subscribe('onReady', receiveDataEnvelope);
  }, []);

  const { darkMode = false, productTheme = {}, locale = 'en' } = dataEnvelope;
  if (!model.data) {
    return null;
  }
  return (
    <UiSdkContext.Provider model={model} setModel={setModel}>
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
    _model: PropTypes.object,
    subscribe: PropTypes.func
  }).isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
};

Provider.defaultProps = {
  messages: {}
};

export default Provider;
