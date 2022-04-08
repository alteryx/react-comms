/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import merge from 'deepmerge';
import deepEqual from 'deep-equal';

import DesignerMessageApi from '../DesignerMessageApi';
import MicroAppMessageApi from '../MicroAppMessageApi';
import { IContext, IModel } from '../Utils/types';
import { SUBSCRIPTION_EVENTS } from '../Utils/constants';
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

let messageBroker: DesignerMessageApi | MicroAppMessageApi;

const DesignerApi: React.FC<IDesignerApiProps> = (props: IDesignerApiProps) => {
  const { messages = {}, defaultConfig = {} } = props;
  if (!messageBroker) {
    messageBroker =
      window.Alteryx && window.Alteryx.AlteryxLanguageCode
        ? new DesignerMessageApi(props.ctx || window.Alteryx)
        : new MicroAppMessageApi();
  }
  const mergedState: IModel = merge(messageBroker.model, defaultConfig);
  const [model, updateModel] = useState(mergedState);
  const [appContext, updateAppContext] = useState(messageBroker.ayxAppContext);

  useEffect(() => {
    const modelChanged = !deepEqual(messageBroker.model, model, { strict: true });
    if (modelChanged) {
      // Just update the messageBroker model whenever state updates.
      messageBroker.model = model;
      messageBroker instanceof MicroAppMessageApi
        ? messageBroker.sendMessage(SUBSCRIPTION_EVENTS.MODEL_UPDATED, model)
        : window.Alteryx.model = model;
    }
  }, [model])

  useEffect(() => {
    const receiveAppContext = data => {
      updateAppContext({ ...data });
    };
    const receiveModel = data => {
      updateModel(merge(model, data));
    };

    messageBroker.subscribe(SUBSCRIPTION_EVENTS.MODEL_UPDATED, receiveModel);
    messageBroker.subscribe(SUBSCRIPTION_EVENTS.AYX_APP_CONTEXT_UPDATED, receiveAppContext);
    return function cleanUp() {
      updateModel(messageBroker.model);
    };
  }, []);

  const getContextValue = useCallback(() => [model, updateModel], [model, updateModel]);
  const contextProps: IContextProviderProps = {
    id: 'sdk-provider',
    value: getContextValue()
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
