## Boot Up the Dev Harness

Once you fork the [Dev Harness](https://git.alteryx.com/ayx-ui-sdk/ui-sdk-dev-harness) project and run `npm install` inside of the project, you're ready to go. From here, use the `npm run start` command from your terminal. You will see that the dev harness is now served from localhost:3000.

## Make Changes

When you develop in the Dev Harness, you make all your changes in the `childApp` directory of the Dev Harness project. In this directory, there is an `index.tsx` file where the sample code currently lives.

While you can make changes here directly, we recommend that you structure your app for a production environment (with appropriate folder structures) and import your components as needed.

## Use the DesignerApi

The single most important component in the UI-SDK is the DesignerApi. It serves as the facilitator of communication between the Alteryx product you build for, and the custom app you create. The DesignerApi accomplishes much of this under the hood. The result is an easy experience for you to interface with. The DesignerApi requires only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to have access to.

## Messages

To support internationalization, you need to pass a `messages` object to your DesignerApi. The `messages` object should contain your translated messages.

From there, you can use the `FormattedMessage` component provided by `react-intl` to toggle the message based on your locale. The locale is managed by the communication bridge between the DesignerApi and the Alteryx product where your custom app lives.

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

Once you've created your DesignerApi, you will likely want to send updates to and from your custom application. You can do this via `React.Context`. When you open the dev harness code, you will see a simple example for a button that increments a model count. The example looks something like this:

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

As a best practice, you should not override or manipulate your model directly. That's where the `newModel` const is useful.

After you make a copy of your model and make any required updates, call the `handleUpdateModel` method provided to you by the `useContext` React hook. This updates the model state internal to your custom app and dispatches any relevant messages to the parent application.

To explore more advanced examples, visit our [DesignerApi docs](#/UI-SDK%20Components/DesignerApi).

## Build Process

Once you develop your custom tool, you can build it with our built-in `npm run build` command. This script bundles your custom app for you.

From there, you need to install it into the Designer plugins directory. You can manually copy and paste the output of the `dist` directory.