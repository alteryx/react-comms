import React, { useEffect } from 'react';
import { AyxAppWrapper } from '@ayx/ui-core';
import UiSdkContext from '../Context';
import { isValidMessageType } from '../Utils/communication'


const Provider = props => {
  const [dataEnvelope, updateDataEnvelope] = useState(window.dataEnvelope);
  const [hasEventListener, setHasEventListener] = useState(false);

  const receiveMessageEnvelope = ({ data }) => {
    if (isValidMessageType(data.type)) {
      updateDataEnvelope(data.payload);
    }
  };

  useEffect(() => {
    if (!hasEventListener) {
      window.addEventListener('message', receiveMessageEnvelope);
      setHasEventListener(true);
    }

    return function removeEventListener() {
      window.removeEventListener('message', receiveMessageEnvelope);
      setHasEventListener(false);
    };
  });

  const { darkMode, productTheme, locale, model } = dataEnvelope;
  const { messages } = props
  return (
    <AyxAppWrapper
      locale={locale}
      messages={messages}
      paletteType={darkMode ? 'dark' : 'light'}
      productTheme={productTheme}
    >
      <UiSdkContext.provider model={model}>
        {props.children}
      </UiSdkContext.provider>
    </AyxAppWrapper>
  );
};

export default Provider;
