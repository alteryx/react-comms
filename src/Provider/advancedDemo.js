import React from 'react';

import MessageApi from '../MessageApiBase/MessageApiBase.ts';
import UiSdkContext from '../Context/index.tsx';
import { Button, Grid, Input, FormControl, FormHelperText, FormControlLabel, Checkbox, InputLabel } from '../Core';

import Provider from './Provider.tsx';
import messages from './messages';

const initialModelState = {
  name: '',
  values: {
    field1: '',
    field2: '',
    checked: false
  }
};
// Instantiate your message handler to pass to the provider
const messageBroker = new MessageApi(window);
// In the real world, this line won't be here. Your model will take the shape of the parent application.
messageBroker.model = initialModelState;

const ProviderDemo = () => {
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);

    const resetModel = () => {
      handleUpdateModel(initialModelState);
    };

    const submitModel = () => {
      alert(
        `This is the message that would be getting sent to your parent app: ${JSON.stringify({
          type: 'UPDATE_MODEL',
          payload: model
        })}`
      );
    };

    const handleNameChange = event => {
      const newModel = { ...model, name: event.target.value };
      handleUpdateModel(newModel);
    };

    const handleValueChange = (prop, event) => {
      const values = { ...model.values, [prop]: event.target.value };
      const newModel = { ...model, values };
      handleUpdateModel(newModel);
    };

    const handleCheckedChange = () => {
      const values = { ...model.values, checked: !model.values.checked };
      const newModel = { ...model, values };
      handleUpdateModel(newModel);
    };

    return (
      <Grid container spacing={3}>
        <Grid item md={3} sm={6} xs={12}>
          <FormControl>
            <InputLabel htmlFor="component-simple">Name</InputLabel>
            <Input id="component-simple" onChange={handleNameChange} value={model.name} />
          </FormControl>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <FormControl aria-describedby="component-helper-text">
            <InputLabel htmlFor="component-helper">Value 1</InputLabel>
            <Input id="component-helper" onChange={e => handleValueChange('field1', e)} value={model.values.field1} />
            <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item md={3} sm={6} xs={12}>
          <FormControl>
            <InputLabel htmlFor="component">Value 2</InputLabel>
            <Input id="component" onChange={e => handleValueChange('field2', e)} value={model.values.field2} />
            <FormHelperText>Some more important helper text</FormHelperText>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl component="fieldset">
            <FormControlLabel
              checked={model.values.checked}
              control={<Checkbox />}
              label="Checked"
              labelPlacement="top"
              onChange={handleCheckedChange}
              value="checked"
            />
          </FormControl>
        </Grid>
        <Grid item xs={3}>
          <Button color="primary" onClick={submitModel} variant="contained">
            Submit Model
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button onClick={resetModel} variant="contained">
            Reset Model
          </Button>
        </Grid>
      </Grid>
    );
  };

  return (
    <Provider messageBroker={messageBroker} messages={messages}>
      <Child />
    </Provider>
  );
};

<ProviderDemo />;
