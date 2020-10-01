## Boot Up the Dev Harness

Once you fork the [Dev Harness](https://git.alteryx.com/ayx-ui-sdk/ui-sdk-dev-harness) project and run `npm install` inside of the project, you're ready to go. From here, use the `npm run start` command from your terminal. You will see that the dev harness is now served from localhost:3000.

## Make Changes

When you develop in the Dev Harness, you make all your changes in the `childApp` directory of the Dev Harness project. In this directory, there is an `index.tsx` file where the sample code currently lives.

While you can make changes here directly, we recommend that you structure your app for a production environment (with appropriate folder structures) and import your components as needed.

## Use the DesignerApi

The single most important component in the UI-SDK is the DesignerApi. It serves as the facilitator of communication between the Alteryx product you build for, and the custom app you create. The DesignerApi accomplishes much of this under the hood. The result is an easy experience for you to interface with. The DesignerApi requires only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to have access to.

## Messages

To support internationalization, you need to pass a `messages` object to your DesignerApi. The `messages` object should contain your translated messages.

From there, you can use the FormattedMessage component provided by `react-intl` to toggle the message based on your locale. The locale is managed by the communication bridge between the DesignerApi and the Alteryx product your custom app lives in.

``` jsx static
  import React from 'react'
  import { Provider } from 'ayx-ui-sdk'
  import { FormattedMessage } from 'react-intl'
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
  }

  <Provider messages={messages}>
    <FormattedMessage id="example.label">
  </Provider>
```

## Context

Once you've created your provider, you're probably going to want to send updates to and from your custom application. This can be handled through `React.Context`. When you open up the dev harness code, you'll already see a simple example for a button that increments a model count. That looks something like this:

```jsx static
import React, { useContext } from 'react';
import { Button } from '@ayx/ui-core';
import { UiSdkContext } from '@ayx/ui-sdk';

const SampleButton = () => {
  const [model, handleUpdateModel] = useContext(UiSdkContext);
  const updateModel = () => {
    const newModel = { ...model };
    newModel.count++;
    handleUpdateModel({ model: { ...newModel } });
  };
  return <Button onClick={updateModel}> Click this to update my count </Button>;
};
```

It is best practice not to override or manipulate your model directly. That's where the `newModel` const is useful. After you've made a copy of your model and made any updates required to it, you simply call the handleUpdateModel method provided to you by the useContext React hook. This will update the model state internal to your custom application as well as dispatch any relevant messages to the parent application. To see more advanced examples, check out our `<Provider />` docs [here](#/UI-SDK%20Components/Provider).

## Build Process

Once you've developed your custom tool, you can build it using our built in `npm run build` command. This script will bundle your custom application for you. From there, it just needs to be installed into the Designer plugins directory. You can simply manually copy and paste the output of the `dist` directory. 
(TO DO: Update this to reflect once no part of this process is manual).