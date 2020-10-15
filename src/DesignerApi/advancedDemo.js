import React from 'react';
import {
  AyxAppWrapper,
  Button,
  Grid,
  Input,
  FormControl,
  FormHelperText,
  FormControlLabel,
  Checkbox,
  InputLabel
} from '@ayx/ui-core';

import UiSdkContext from '../Context/index.tsx';

import DesignerApi from './index.tsx';
import messages from './messages';

const initialModelState = {
  name: '',
  values: {
    field1: '',
    field2: '',
    checked: false
  }
};

const DesignerApiDemo = () => {
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);
    // Example of maintaing local state seperate from context state
    // Also allows us to "fake" having a model since there is no parent child app relationship here
    // In the real world, you'd likely only maintain state in one or the other.
    const [formData, updateForm] = React.useState(initialModelState);
    const resetModel = () => {
      updateForm(initialModelState);
      handleUpdateModel({ Configuration: { ...initialModelState } });
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
      const newModel = { ...formData, name: event.target.value };
      updateForm(newModel);
      handleUpdateModel({ Configuration: { ...newModel } });
    };

    const handleValueChange = (prop, event) => {
      const values = { ...formData.values, [prop]: event.target.value };
      const newModel = { ...formData, values };
      updateForm(newModel);
      handleUpdateModel({ Configuration: { ...newModel } });
    };

    const handleCheckedChange = () => {
      const values = { ...formData.values, checked: !formData.values.checked };
      const newModel = { ...formData, values };
      updateForm(newModel);
      handleUpdateModel({ Configuration: { ...newModel } });
    };

    return (
      <AyxAppWrapper>
        <Grid container spacing={3}>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl>
              <InputLabel htmlFor="component-simple">Name</InputLabel>
              <Input id="component-simple" onChange={handleNameChange} value={formData.name} />
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl aria-describedby="component-helper-text">
              <InputLabel htmlFor="component-helper">Value 1</InputLabel>
              <Input
                id="component-helper"
                onChange={e => handleValueChange('field1', e)}
                value={formData.values.field1}
              />
              <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl>
              <InputLabel htmlFor="component">Value 2</InputLabel>
              <Input id="component" onChange={e => handleValueChange('field2', e)} value={formData.values.field2} />
              <FormHelperText>Some more important helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <FormControlLabel
                checked={formData.values.checked}
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
      </AyxAppWrapper>
    );
  };

  return (
    <DesignerApi defaultConfig={{ Configuration: { ...initialModelState } }} messages={messages}>
      <Child />
    </DesignerApi>
  );
};

<DesignerApiDemo />;
