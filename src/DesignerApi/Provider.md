## Overview
The Provider is a required component for creating your custom application with the UI-SDK. Every custom application must be wrapped in a Provider so that your custom app is able to access and update the relevant information from the parent application from anywhere within the component hierarchy. When implementing the Provider, it is expecting to receive two props. The first of which is your product specific MessageAPI that enables the communication between the application your custom app lives inside of and your custom app. Depending on which product within the Alteryx platform you're using, you'll need to instantiate a different instance of a MessageAPI. The second is whatever internationalized messages you're expecting your application to have access to. The examples below show this in more detail. 

## Theming and Styles
The Provider automatically wraps your application in our AyxAppWrapper.

`AyxAppWrapper` is a non-material react component that should be wrapped around all Alteryx applications. 

`AyxAppWrapper` provides the following functionality:
- Themes all UI-Core components with the Alteryx style
- Sets the font-family of all UI-Core components and html to the correct Alteryx font
- Wraps all localized strings with arrow characters (e.g. ⇚example⇛)

## Props Example
Below is an example of what instantiating a Provider with the appropriate props looks like. Depending on which MessageAPI you're using, they'll need slightly different window contexts given to it. For Designer Desktop, it's expecting to receive window.Alteryx as a parameter as seen below. The Provider is also expecting that you provide your own translated messages in the format seen below for any languages you'd like to support. 

``` jsx static
  import React from 'react'
  import { MessageAPI, Provider } from '@ayx/ui-sdk'
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
  const messageBroker = new MessageAPI(window.Alteryx)

  <Provider messages={messages} messageBroker={messageBroker}>
    Hello World
  </Provider>
```

## Updating Your Data (Part One)
One of the Provider's main jobs is exposing model data and the ability to update that model in your custom app and in the parent app. It does this through leveraging React Context. The Provider gives any child component access to a handleUpdateModel method and the model itself. This can be leveraged through the useContext hook. In the example below, the handleUpdateModel callback is being utilized to update the model data for the custom application. In this case, a simple incrementer. 

```js { "file": "../basicDemo.js" }
```

## Updating Your Data (Part Two)
Most of the time, you're not going to be dealing with such a simple incrementer. In this example, we're managing a form's data across multiple inputs in a nested model structure. We've provided a number of different onChange callback examples to help you decide what you might need to use, depending on the data structure and UI you've designed. 
```js { "file": "../advancedDemo.js" }

