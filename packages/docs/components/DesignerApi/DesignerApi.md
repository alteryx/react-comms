## Overview
When you implement the DesignerApi, it requires only one prop: `messages`. The messages prop is an object that includes any internationalized messages that you expect your app to access. The example below shows this in more detail. It also supports the `defaultConfig` prop, which is optional. It allows you to ensure a particular default state for your application before you've received your current tool configuration from Designer. Additionally, if you plan to use Alteryx UI Components, you must wrap your custom app in an AyxAppWrapper.

## Props Example
The DesignerApi expects you to provide your own translated messages for any languages you want to support, in the format shown below. It also supports a defaultConfig prop. This allows you to ensure a particular default state before you've received your current tool configuration from Designer.

``` jsx static
  import React from 'react'
  import { MessageAPI, DesignerApi } from '@alteryx/react-comms'
  import { AyxAppWrapper } from '@alteryx/ui'
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

  <DesignerApi defaultConfig={ { Configuration: { count: 0 } }} messages={messages}>
    <AyxAppWrapper>
      Hello World
    </AyxAppWrapper>
  </DesignerApi>
```

## Default Configuration

In order to allow you to ensure a consistent state of the world on tool initialization, we've provided a defaultConfig prop. As mentioned above, this allows you to set a consistent starting configuration for your tool. You're able to provide data to the `Configuration`, `Annotation`, `Secrets`, and `Meta` keys. Beyond enabling a consistent starting experience, this also lets you avoid null checking or any type coalescing in your react renders. 

```jsx static
  import React from 'react'
  import { MessageAPI, DesignerApi } from '@alteryx/react-comms'
  import { AyxAppWrapper } from '@alteryx/ui'

  const sampleMetaFields = [
    [
      [
        {
          connectionName:"",
          fieldsByName: {
            streetName: {
              "name":"Street Name","type":"V_String","size":"21","source":"Formula: [_CurrentField_]"
            }
          },
          fields:[
            {"name":"Street Name","type":"V_String","size":"21","source":"Formula: [_CurrentField_]"},
          ]
        }
      ]
    ]
  ]

  const SampleDefaultConfig = () => {
    <DesignerApi defaultConfig={{ 
      Configuration: { 
        count: 0 
      }, 
      Meta: { 
        fields: sampleMetaFields 
      },
      Secrets: {
        password1: {
          text: event.target.value, 
          encryptionMode: 'obfuscation' 
        }
      }
    }}>
      <AyxAppWrapper>
        Hello World
      </AyxAppWrapper>
    </DesignerApi>
  }
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

The below snippet is an example of the meta data that came in from a Text Input tool. In practice, most of your meta data will take this basic shape: 

```jsx static
[
  [
    {
      connectionName:"",
      fieldsByName: {
        streetName: {
          "name":"Street Name","type":"V_String","size":"21","source":"Formula: [_CurrentField_]"
        },
        city: {
          "name":"City","type":"V_String","size":"27","source":"Formula: [_CurrentField_]"
        },
        state: {
          "name":"State","type":"String","size":"16","source":"Formula: [_CurrentField_]"
        },
        country: {
          "name":"Country","type":"V_String","size":"27","source":"Formula: [_CurrentField_]"
        },
        zipCode: {
          "name":"Zip Code","type":"V_String","size":"27","source":"Formula: [_CurrentField_]"
        },
      },
      fields:[
        {"name":"Street Name","type":"V_String","size":"21","source":"Formula: [_CurrentField_]"},
        {"name":"City","type":"V_String","size":"27","source":"Formula: [_CurrentField_]"},
        {"name":"State","type":"String","size":"16","source":"Formula: [_CurrentField_]"},
        {"name":"Country","type":"String","size":"16","source":"Formula: [_CurrentField_]"},
        {"name":"Zip Code","type":"String","size":"16","source":"Formula: [_CurrentField_]"}
      ]
    }
  ]
]
```

Following that structure, in order to get the name of the first field, you'd access it with:

```jsx static
const [model, handleUpdateModel] = getContext(UiSdkContext);
const field1Name = model.Meta.fields[0][0].fields[0].name;
```

If you'd like to debug the meta data in more depth as it comes to you from Designer, you can access the current state of your model and Meta directly on the HTML Developer Tools by typing `window.Alteryx.model` into the javascript console. Additionally, you can add a `console.log(model.Meta)` from any component in your application where the model is accessible via context to see the state of the Meta in that component. 

## Secrets

If your UI has password fields or other information that you'd consider sensitive, you can ensure it is obfuscated when stored in your XML by placing it in the `Secrets` key of the model. This key resolves to an object that you can place any key inside of. Each key should also be an object, with keys of `encryptionMode` and `text`. `text` references the secret value you'd like to have encoded and `encryptionMode` represents the obfuscation type you'd like to use: `obfuscation`, `machine`, or `user`. The default encryptionMode is `obfuscation` if it is not specified. When the tool configuration is saved off, anything you place into this Secrets key will automatically be obfuscated and unobfuscated upon the set and get configuration calls. See below: 

```jsx static
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);
    const { Secrets } = model;

    const handleChange = event => {
      const newModel = { ...model };
      newModel.Secrets = { 
        ...newModel.Secrets, 
        password: { 
          text: event.target.value, 
          encryptionMode: 'obfuscation' 
        }
      };
      handleUpdateModel(newModel);
    }; 

    return (
      <input value={Secrets.password.text} onChange={handleChange}/>
    )
  }; 
```


