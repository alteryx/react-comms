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
} from '@alteryx/ui';
import { Context as UiSdkContext, DesignerApi } from '@alteryx/react-comms';
import messages from './messages';

const initialModelState = {
  name: '',
  password: '',
  values: {
    field1: '',
    field2: '',
    checked: false
  }
};

const DesignerApiDemo = () => {
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);
    const resetModel = () => {
      const newModel = { ...model };
      newModel.Configuration = initialModelState;
      handleUpdateModel(newModel);
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
      const newModel = { ...model };
      newModel.Configuration = { ...newModel.Configuration, name: event.target.value }
      handleUpdateModel(newModel);
    };

    const handleValueChange = (prop, event) => {
      const newModel = { ...model };
      newModel.Configuration.values = { ...newModel.Configuration.values, [prop]: event.target.value }
      handleUpdateModel(newModel);
    };

    const handleCheckedChange = () => {
      const newModel = { ...model };
      newModel.Configuration.values = { 
        ...newModel.Configuration.values, 
        checked: !newModel.Configuration.values.checked 
      };
      handleUpdateModel(newModel);
    };

    const handlePasswordChange = event => {
      const newModel = { ...model };
      newModel.Configuration = { ...newModel.Configuration, password: event.target.value }
      handleUpdateModel(newModel);
    };

    return (
      <AyxAppWrapper>
        <Grid container spacing={3}>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl>
              <InputLabel htmlFor="component-simple">Name</InputLabel>
              <Input id="component-simple" onChange={handleNameChange} value={model.Configuration.name} />
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl>
              <InputLabel htmlFor="component-password">Password</InputLabel>
              <Input id="component-password" onChange={handlePasswordChange} value={model.Configuration.password} />
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl aria-describedby="component-helper-text">
              <InputLabel htmlFor="component-helper">Value 1</InputLabel>
              <Input
                id="component-helper"
                onChange={e => handleValueChange('field1', e)}
                value={model.Configuration.values.field1}
              />
              <FormHelperText id="component-helper-text">Some important helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item md={3} sm={6} xs={12}>
            <FormControl>
              <InputLabel htmlFor="component">Value 2</InputLabel>
              <Input id="component" onChange={e => handleValueChange('field2', e)} value={model.Configuration.values.field2} />
              <FormHelperText>Some more important helper text</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              <FormControlLabel
                checked={model.Configuration.values.checked}
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
