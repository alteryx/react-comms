/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';

import DesignerMessageApi from '../DesignerMessageApi';
import { IContext, SUBSCRIPTION_EVENTS } from '../Utils/types';
import UiSdkContext, { IContextProviderProps } from '../Context';

interface IDesignerApiProps {
  messages: object;
  ctx?: IContext;
  defaultConfig?: object;
  children: React.ReactElement;
}

declare global {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  interface Window {
    Alteryx: IContext;
  }
}

const validUpdateKeys = ['Configuration', 'Annotation', 'Secrets'];

let messageBroker;

const DesignerApi: React.FC = (props: IDesignerApiProps) => {
  const { messages = {}, defaultConfig } = props;
  if (!messageBroker) {
    messageBroker = new DesignerMessageApi(props.ctx || window.Alteryx);
  }
  const [model, updateModel] = useState({ ...messageBroker.model, ...defaultConfig });
  const [appContext, updateAppContext] = useState(messageBroker.ayxAppContext);

  const handleUpdateModel = updatedData => {
    const badKeys = Object.keys(updatedData).filter(k => !validUpdateKeys.includes(k));
    if (badKeys.length) {
      // eslint-disable-next-line no-console
      console.warn('Only Configuration and Annotation support updates');
      return;
    }
    const newModel = { ...model, ...updatedData };

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

    messageBroker.subscribe(SUBSCRIPTION_EVENTS.MODEL_UPDATED, receiveModel);
    messageBroker.subscribe(SUBSCRIPTION_EVENTS.AYX_APP_CONTEXT_UPDATED, receiveAppContext);
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
