/* eslint-disable no-unused-expressions */
import React from 'react';

import MessageApi from '../MessageApiBase/MessageApiBase.ts';
import UiSdkContext from '../Context/index.tsx';
import Button from '../Core/Button';

import Provider from './Provider.tsx';

const messageBroker = new MessageApi(window);

messageBroker.model = { count: 0 };

const messages = {
  en: {
    'example.label': 'super awesome string'
  },
  fr: {
    'example.label': 'ficelle super génial'
  },
  de: {
    'example.label': 'super tolle Saite'
  },
  es: {
    'example.label': 'cadena super impresionante'
  },
  pt: {
    'example.label': 'corda super incrível'
  },
  ja: {
    'example.label': '超素晴らしい文字列'
  },
  zh: {
    'example.label': '超棒的弦'
  }
};

const ProviderDemo = () => {
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);
    const updateModel = () => {
      const newModel = { ...model };
      newModel.count++;
      handleUpdateModel(newModel);
    };
    return (
      <div>
        <Button id="child" onClick={updateModel}>
          Click me to increment the count
        </Button>
        {model.count}
      </div>
    );
  };

  return (
    <Provider messageBroker={messageBroker} messages={messages}>
      <Child />
    </Provider>
  );
};

<ProviderDemo />;
