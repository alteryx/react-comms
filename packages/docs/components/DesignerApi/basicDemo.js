import React from 'react';
import { AyxAppWrapper, Button, Grid, Typography } from '@ayx/ui-core';
import { Context as UiSdkContext, DesignerApi } from '@ayx/ayx-ui-sdk';

import messages from './messages';

const DesignerApiDemo = () => {
  const Child = () => {
    const [model, handleUpdateModel] = React.useContext(UiSdkContext);

    const incrementCount = () => {
      const newModel = { ...model }; 
      newModel.Configuration.count++;
      handleUpdateModel(newModel);
    };
    return (
      <AyxAppWrapper>
        <Grid container>
          <Grid item>
            <Button id="child" onClick={incrementCount} variant="contained">
              <Typography>Click me to increment the count</Typography>
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h1">{model.Configuration.count}</Typography>
          </Grid>
        </Grid>
      </AyxAppWrapper>
    );
  };

  return (
    <DesignerApi defaultConfig={{ Configuration: { count: 0 } }} messages={messages}>
      <Child />
    </DesignerApi>
  );
};

<DesignerApiDemo />;
