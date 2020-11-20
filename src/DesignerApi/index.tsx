/* eslint-disable react/require-default-props */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState, useCallback } from 'react';
import merge from 'deepmerge';

import DesignerMessageApi from '../DesignerMessageApi';
import MicroAppMessageApi from '../MicroAppMessageApi';
import { IContext } from '../Utils/types';
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

const validUpdateKeys = ['Configuration', 'Annotation', 'Secrets'];

let messageBroker: DesignerMessageApi | MicroAppMessageApi;

const DesignerApi: React.FC = (props: IDesignerApiProps) => {
  const { messages = {}, defaultConfig = {} } = props;
  if (!messageBroker) {
    messageBroker =
      window.Alteryx && window.Alteryx.AlteryxLanguageCode
        ? new DesignerMessageApi(props.ctx || window.Alteryx)
        : new MicroAppMessageApi();
  }
  const mergedState = merge(messageBroker.model, defaultConfig);
  const [model, updateModel] = useState(mergedState);
  const [appContext, updateAppContext] = useState(messageBroker.ayxAppContext);

  const handleUpdateModel = updatedData => {
    const updatedDataKeys = Object.keys(updatedData);
    const newModel = { ...model };
    const badKeys = updatedDataKeys.filter(k => !validUpdateKeys.includes(k));

    if (badKeys.length) {
      console.warn('Only Configuration, Annotation, and Secrets support updates');
      return;
    }
    updatedDataKeys.forEach(k => {
      if (Array.isArray(updatedData[k])) newModel[k] = merge(newModel[k], updatedData[k]);
      else if (typeof updatedData[k] === 'object') newModel[k] = merge(newModel[k], updatedData[k]);
      else newModel[k] = updatedData[k];
    });
    updateModel(newModel);
    messageBroker.model = newModel;
    if (messageBroker instanceof MicroAppMessageApi) {
      messageBroker.sendMessage(SUBSCRIPTION_EVENTS.MODEL_UPDATED, newModel);
    }
  };

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
      handleUpdateModel(messageBroker.model);
    };
  }, []);

  const getContextValue = useCallback(() => [model, handleUpdateModel], [model, handleUpdateModel]);

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
