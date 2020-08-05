/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import isValidMessageType from '../Utils/Communication';
import AyxAppWrapper from '../Core/AyxAppWrapper';
import UiSdkContext from '../Context';

const Provider = props => {
  const { messages, messageBroker } = props;
  const [dataEnvelope, updateDataEnvelope] = useState({});
  const [model, updateModel] = useState(messageBroker._model);

  const handleUpdateModel = newModel => {
    updateModel(newModel);
    messageBroker._model = newModel;
  };

  useEffect(() => {
    const receiveDataEnvelope = ({ data }) => {
      if (isValidMessageType(data.type)) updateDataEnvelope({ ...data.payload });
    };
    const receiveToolConfiguration = data => {
      handleUpdateModel({ ...data });
    };
    messageBroker.subscribe('updateModel', receiveToolConfiguration);
    messageBroker.subscribe('updateDataEnvelope', receiveDataEnvelope);

    return function cleanUp() {
      handleUpdateModel(messageBroker._model);
    };
  }, []);

  const { darkMode = false, productTheme = {}, locale = messageBroker.languageCode || 'en' } = dataEnvelope;

  return (
    <UiSdkContext.Provider id="sdk-provider" value={[model, handleUpdateModel]}>
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
