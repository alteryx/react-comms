/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';

import DesignerMessageApi, { IContext } from '../DesignerMessageApi';
import UiSdkContext, { IContextProviderProps } from '../Context';

interface IDesignerApiProps {
  messages: object;
  ctx?: any;
  children: React.ReactElement;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    Alteryx: IContext;
  }
}

let messageBroker;

const DesignerApi: React.FC = (props: IDesignerApiProps) => {
  const { messages = {} } = props;
  if (!messageBroker) {
    messageBroker = new DesignerMessageApi(props.ctx || window.Alteryx)
  }
  const [model, updateModel] = useState(messageBroker.model);
  const [appContext, updateAppContext] = useState(messageBroker.ayxAppContext);

  const handleUpdateModel = newModel => {
    // The reason all 3 of these are here is to work in all use cases for now, DesignerMessageAPI and DevHarness.
    // TODO: Refactor this to only be dependent on one call
    updateModel(newModel);
    messageBroker.model = newModel;
  };

  useEffect(() => {
    const receiveAppContext = data => {
      updateAppContext({ ...data });
    };
    const receiveModel = data => {
      updateModel({ ...data });
    };

    messageBroker.subscribe('MODEL_UPDATED', receiveModel);
    messageBroker.subscribe('APP_CONTEXT_UPDATED', receiveAppContext);
    return function cleanUp() {
      handleUpdateModel(messageBroker.model);
    };
  }, []);

  const contextProps: IContextProviderProps = {
    id: 'sdk-provider',
    value: [model, handleUpdateModel]
  };

  const { darkMode, locale, productTheme } = appContext || {};
  const appPropsToSpread = { messages, paletteType: darkMode ? 'dark' : 'light', theme: productTheme, locale };

  return (
    <UiSdkContext.Provider {...contextProps}>
      {React.cloneElement(props.children, { ...appPropsToSpread })}
    </UiSdkContext.Provider>
  );
};

export default DesignerApi;
