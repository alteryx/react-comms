## Overview
The DesignerApi is a required component when you create your custom application with the UI-SDK, and design the app for Alteryx Designer. Every custom application must be wrapped in a DesignerApi. This lets the app access and update the relevant information in the parent application from anywhere within the component hierarchy.

When you implement the DesignerApi, it requires only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to access. The example below shows this in more detail. It also supports the `defaultConfig` prop, which is optional. It allows you to ensure a particular default state for your application before you've received your current tool configuration from Designer. Additionally, if you plan to use Eclipse Components, you must wrap your custom app in an AyxAppWrapper.

## Props Example
The DesignerApi expects you to provide your own translated messages for any languages you want to support, in the format shown below. It also supports a defaultConfig prop. This allows you to ensure a particular default state before you've received your current tool configuration from Designer.

``` jsx static
  import React from 'react'
  import { MessageAPI, DesignerApi } from '@ayx/react-comms'
  import { AyxAppWrapper } from '@ayx/eclipse-components'
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

  <DesignerApi defaultConfig={{ Configuration: { count: 0 } }} messages={messages}>
    <AyxAppWrapper>
      Hello World
    </AyxAppWrapper>
  </DesignerApi>
```

## Update Your Data (Part 1)
The main roles of the DesignerApi are to expose model data and to update that model in both your custom app and the parent app. To do this, the DesignerAPI leverages React Context.

The DesignerApi gives any child component access to a `handleUpdateModel` method as well as the model itself. You can leverage this via the `useContext` hook. The example below uses the `handleUpdateModel` callback to update the model data for the custom app (in this case, a simple incrementer).

`handleUpdateModel` expects to be based on an object that contains one or all of the following keys: `Configuration`, `Secrets` and `Annotation`. Any other key will cause the update to fail and changes won't be persisted.

```js { "file": "../basicDemo.js" }
```

## Update Your Data (Part 2)
Most of the time, you're not going to be working with a simple incrementer, like the above example. In this example, we manage form data across many inputs in a nested model structure.

We've provided many different `onChange` callback examples to help you decide what you need to use. This will depend on the data structure and UI you've designed.  
```js { "file": "../advancedDemo.js" }
```

## Accessing Meta

The `DesignerApi` does some really nice cleanup for you when it comes to accessing your meta data. Meta will always be an array. Each index of the array represents a different list of fields from an input anchor. Accessing model.Meta[0] will give you the list of fields from the first input. If you wanted to access the 2nd field in that list, you'd chain an index of 1 to the fields property on the Meta. See below for an example:
```jsx static
const Child = () => {
  const [model, handleUpdateModel] = React.useContext(UiSdkContext);
  const greatMetaInfo = model.Meta[0].fields[1];
})
```

If you'd like to debug the meta data in more depth as it comes to you from Designer, simply add a `console.log(model.Meta)` from any component in your application where the model is accessible via context.

## Secrets

If your UI has password fields or other information that you'd consider sensitive, you can ensure it is obfuscated when stored in your XML by placing it in the `Secrets` key of the model. This key resolves to an object that you can place any key inside of. Each key should also be an object, with keys of `encryptionMode` and `text`. `text` references the secret value you'd like to have encoded and `encryptionMode` represents the obfuscation type you'd like to use: `obfuscation`, `machine`, or `user`. The default encryptionMode is `obfuscation` if it is not specified. When the tool configuration is saved off, anything you place into this Secrets key will automatically be obfuscated and unobfuscated upon the set and get configuration calls. See below: 

```jsx static
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);
    const { Secrets } = model;

    const handleChange = event => {
      handleUpdateModel({ Secrets: { password: { text: event.target.value, encryptionMode: 'obfuscation' }});
    }; 

    return (
      <input value={Secrets.password.text} onChange={handleChange}/>
    )
  }; 
```


