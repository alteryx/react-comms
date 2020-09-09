/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';

import { IAyxAppContext } from '../DesignerMessageApi';
import UiSdkContext, { IContextProviderProps } from '../Context';

interface IProviderProps {
  messages: object;
  messageBroker: {
    ayxAppContext: IAyxAppContext;
    model: object;
    subscribe: Function;
    sendMessage: Function;
  };
  children: React.ReactElement;
}

const Provider: React.FC = (props: IProviderProps) => {
  const { messages = {}, messageBroker } = props;
  const [model, updateModel] = useState(messageBroker.model);
  const [appContext, updateAppContext] = useState(messageBroker.ayxAppContext);

  const handleUpdateModel = newModel => {
    // The reason all 3 of these are here is to work in all use cases for now, DesignerMessageAPI and DevHarness.
    // TODO: Refactor this to only be dependent on one call
    updateModel(newModel);
    messageBroker.model = newModel;
    messageBroker.sendMessage('UPDATE_MODEL', newModel);
  };

  useEffect(() => {
    const receiveAppContext = data => {
      updateAppContext({ ...data });
    };
    const receiveModel = data => {
      updateModel({ ...data });
    };

    messageBroker.subscribe('UPDATE_MODEL', receiveModel);
    messageBroker.subscribe('UPDATE_APP_CONTEXT', receiveAppContext);
    return function cleanUp() {
      handleUpdateModel(messageBroker.model);
    };
  }, []);

  const providerProps: IContextProviderProps = {
    id: 'sdk-provider',
    value: [model, handleUpdateModel]
  };

  const { darkMode, locale, productTheme } = appContext || {};
  const appPropsToSpread = { messages, paletteType: darkMode ? 'dark' : 'light', theme: productTheme, locale };

  return (
    <UiSdkContext.Provider {...providerProps}>
      {React.cloneElement(props.children, { ...appPropsToSpread })}
    </UiSdkContext.Provider>
  );
};

export default Provider;
