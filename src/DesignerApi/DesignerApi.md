## Overview
The DesignerApi is a required component when you create your custom application with the UI-SDK, and design the app for Alteryx Designer. Every custom application must be wrapped in a DesignerApi. This lets the app access and update the relevant information in the parent application from anywhere within the component hierarchy.

When you implement the DesignerApi, it expects to receive only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to have access to. The example below shows this in more detail. Additionally, if you plan to use UI-Core, you must wrap your custom app in an AyxAppWrapper.

## Props Example
The DesignerApi expects you to provide your own translated messages for any languages you'd like to support, in the format shown below.

``` jsx static
  import React from 'react'
  import { MessageAPI, Provider } from '@ayx/ui-sdk'
  import { AyxAppWrapper } from '@ayx/ui-core'
  const messages = {
    en: {
      'example.label': 'Super awesome string.'
    },
    fr: {
      'example.label': 'Ficelle super génial.'
    },
    de: {
      'example.label': 'Super tolle Saite.'
    },
    es: {
      'example.label': 'Cadena super impresionante.'
    },
    pt: {
      'example.label': 'Corda super incrível.'
    },
    ja: {
      'example.label': '超素晴らしい文字列'
    },
    zh: {
      'example.label': '超棒的弦'
    }
  }

  <DesignerApi messages={messages}>
    <AyxAppWrapper>
      Hello World
    </AyxAppWrapper>
  </Provider>
```

## Update Your Data (Part 1)
One of the main jobs of the DesignerApi is to expose model data and the ability to update that model in both your custom app and the parent app. To do this, the DesignerAPI leverages React Context.

The DesignerApi gives any child component access to a handleUpdateModel method as well as the model itself. You can leverage this through the useContext hook. The example below uses the handleUpdateModel callback to update the model data for the custom app (in this case, a simple incrementer). *Note:* You can only update the `Configuration` and `Annotation` keys of the model directly. Updates to any other key will fail. 

`handleModelUpdate` expects to be based on an object that contains one or both of these keys: Configuration and Annotation. Any other key will fail to cause an update.

```js { "file": "../basicDemo.js" }
```

## Update Your Data (Part 2)
Most of the time, you're not going to be working with a simple incrementer, like the above example. In this example, we manage form data across many inputs in a nested model structure.

We've provided many different onChange callback examples to help you decide what you might need to use. This will depend on the data structure and UI you've designed. 
```js { "file": "../advancedDemo.js" }

