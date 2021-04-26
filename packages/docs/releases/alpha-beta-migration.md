### Introduction

This is a guide to migrating from the UI-SDK communication bridge alpha to beta. While minimal, we did introduce a breaking change to the way the model is updated from alpha to beta. 

### Model Updates Migration Guide

Previously, you updated your model by passing an object containing at least one of the following keys: `Configuration`, `Annotation`, or `Secrets`. We were managing the merging and updating of the overarching model for you, but this led to complications with certain data structures like arrays. The previous paradigm looked like the following:

```js static
  const [model, handleUpdateModel] = useContext(UiSdkContext);
  let { count } = model.Configuration;
  count++;
  handleUpdateModel({ Configuration: { count } });
```

Moving forward, you'll make updates to the model by passing the entire object back into the function. That will look like the below code:

```js static
  const [model, handleUpdateModel] = useContext(UiSdkContext);
  const newModel = { ...model };
  newModel.Configuration.count++;
  handleUpdateModel(newModel);
```

You can see live examples of this [here](#/Designer%20Api/Usage)