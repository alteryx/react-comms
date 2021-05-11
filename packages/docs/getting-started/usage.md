## Use the DesignerApi

The single most important component in the React Comms package is the DesignerApi. It serves as the facilitator of communication between the Alteryx product you build for, and the custom app you create. The DesignerApi accomplishes much of this under the hood. The result is an easy experience for you to interface with. The DesignerApi requires only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to access. The DesignerApi also supports the `defaultConfig` prop, which is an optional prop that allows you to establish your default model state for your application.

## Messages

To support internationalization, you need to pass a `messages` object to your DesignerApi. The `messages` object should contain your translated messages.

From there, you can use the `FormattedMessage` component provided by `react-intl` to toggle the message based on your locale. The locale is managed by the communication bridge between the DesignerApi and the Alteryx product where your custom app lives.

``` jsx static
  import React from 'react'
  import { DesignerApi } from '@alteryx/react-comms'
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

Once you've created your DesignerApi, you will likely want to send updates to and from your custom application. You can do this via `React.Context`. Your implementation could look something like this:

```jsx static
import React, { useContext } from 'react';
import { Button } from '@alteryx/ui';
import { UiSdkContext } from '@alteryx/react-comms';

const SampleButton = () => {
  const [model, handleUpdateModel] = React.useContext(UiSdkContext);

  const incrementCount = () => {
    const newModel = { ...model }; // copy your model
    newModel.Configuration.count++
    handleUpdateModel(newModel);
  }
  return <Button onClick={updateModel}> Click this to update my count </Button>;
};
```

As a best practice, you should not override or manipulate your model directly. This can be accomplished as seen in the above example. If you are in need of more complicated or deeper cloning, we recommend checking out [deepmerge](https://lodash.com/docs/#cloneDeep) or [lodash.cloneDeep](https://lodash.com/docs/#cloneDeep) In order to make updates to your model, the `handleUpdateModel` function is expecting to receive your entire model object as a parameter.

After you make a copy of your model and make any required updates, call the `handleUpdateModel` method provided to you by the `useContext` React hook. This updates the model state internal to your custom app and dispatches any relevant messages to the parent application.

To explore more advanced examples, visit our DesignerApi docs located in the side bar to the left.

## Build Process

If you're building a custom tool for Designer, you'll need to bundle it and install it upon completion. More [here](https://help.alteryx.com/current/developer-help/quick-start-custom-tools)