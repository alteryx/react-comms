## Use the DesignerApi

The single most important component in the UI-SDK is the DesignerApi. It serves as the facilitator of communication between the Alteryx product you build for, and the custom app you create. The DesignerApi accomplishes much of this under the hood. The result is an easy experience for you to interface with. The DesignerApi requires only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to access. The DesignerApi also supports the `defaultConfig` prop, which is an optional prop that allows you to establish your default model state for your application.

## Messages

To support internationalization, you need to pass a `messages` object to your DesignerApi. The `messages` object should contain your translated messages.

From there, you can use the `FormattedMessage` component provided by `react-intl` to toggle the message based on your locale. The locale is managed by the communication bridge between the DesignerApi and the Alteryx product where your custom app lives.

``` jsx static
  import React from 'react'
  import { DesignerApi } from '@ayx/ayx-ui-sdk'
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

  <DesignerApi messages={messages}>
    <FormattedMessage id="example.label">
  </DesignerApi>
```

## Context

Once you've created your DesignerApi, you will likely want to send updates to and from your custom application. You can do this via `React.Context`. When you open the dev harness code, you will see a simple example for a button that increments a model count. The example looks something like this:

```jsx static
import React, { useContext } from 'react';
import { Button } from '@ayx/eclipse-components';
import { UiSdkContext } from '@ayx/ui-sdk';

const SampleButton = () => {
  const [model, handleUpdateModel] = React.useContext(UiSdkContext);

  const incrementCount = () => {
    let { count } = model.Configuration;
    count++;
    handleUpdateModel({ Configuration: { count } });
  }
  return <Button onClick={updateModel}> Click this to update my count </Button>;
};
```

As a best practice, you should not override or manipulate your model directly. Additionally, `handleUpdateModel` only supports updates to the `Configuration`, `Secrets`, and `Annotation` keys. Sending your entire model back without specifying which of these keys you'd like to update will cause a failure and won't persist your changes.

After you make a copy of your model and make any required updates, call the `handleUpdateModel` method provided to you by the `useContext` React hook. This updates the model state internal to your custom app and dispatches any relevant messages to the parent application.

To explore more advanced examples, visit our [DesignerApi docs](#/UI-SDK%20Components/DesignerApi).

## Build Process

If you're building a custom tool for Designer, you'll need to bundle it and install it upon completion. If you're using the Dev Harness, you can use our built in `npm run build` command. From there, you can manually copy and paste the output of the `build` directory into the respective Plugin Folder in Designer. More [here](https://help.alteryx.com/current/developer-help/quick-start-custom-tools)