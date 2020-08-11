/* eslint-disable no-unused-expressions */
import React from 'react';

import MessageApi from '../MessageApiBase/MessageApiBase';

import Provider from './Provider';

const messageBroker = new MessageApi(window);

const ProviderDemo = () => {
  console.log('thing');
  return <Provider messageBroker={messageBroker}>Hello world</Provider>;
};

<ProviderDemo />;
