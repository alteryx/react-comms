/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import AyxAppWrapper from '../Core/AyxAppWrapper';
import { subscriptionEvents } from '../DesignerMessageApi/DesignerMessageApi';
import UiSdkContext from '../Context';

const Provider = props => {
  const { messages, messageBroker } = props;
  const { darkMode = false, productTheme = {}, locale = 'en' } = messageBroker.ayxAppContext;
  const [model, updateModel] = useState(messageBroker.model);

  const handleUpdateModel = newModel => {
    updateModel(newModel);
    messageBroker.model = newModel;
  };

  useEffect(() => {
    const receiveToolConfiguration = data => {
      handleUpdateModel({ ...data });
    };
    messageBroker.subscribe(subscriptionEvents.MODEL_UPDATED, receiveToolConfiguration);

    return function cleanUp() {
      handleUpdateModel(messageBroker.model);
    };
  }, []);

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
    model: PropTypes.shape({}),
    ayxAppContext: PropTypes.shape({
      darkMode: PropTypes.bool,
      productTheme: PropTypes.object,
      locale: PropTypes.string
    }),
    subscribe: PropTypes.func
  }).isRequired,
  messages: PropTypes.objectOf(PropTypes.objectOf(PropTypes.string))
};

Provider.defaultProps = {
  messages: {}
};

export default Provider;
