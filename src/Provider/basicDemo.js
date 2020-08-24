import React from 'react';

import MessageApi from '../MessageApiBase/MessageApiBase.ts';
import UiSdkContext from '../Context/index.tsx';
import { Button, Grid, Typography } from '../Core';

import Provider from './Provider.tsx';
import messages from './messages';

// Instantiate your message handler to pass to the provider
const messageBroker = new MessageApi(window);
// In the real world, this line won't be here. Your model will take the shape of the parent application.
messageBroker.model = { count: 0 };

const ProviderDemo = () => {
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);
    const incrementCount = () => {
      const newModel = { ...model };
      newModel.count++;
      handleUpdateModel(newModel);
    };
    return (
      <Grid container>
        <Grid item>
          <Button id="child" onClick={incrementCount} variant="contained">
            <Typography>Click me to increment the count</Typography>
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h1">{model.count}</Typography>
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
