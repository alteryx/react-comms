Now that you’ve got yourself an honest to goodness project in the making, it’s time to get your first component up and running. 

If you followed the instructions outlined for **Project Structural Expectations** found in ayx-scripts, you should have an `index.tsx` and `index.html` file. In order to get your project to actually show you something, we’re going to make some updates to that. Your `index.tsx` file should look like this:


```jsx static
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App/App';

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
```

### Importing
To import a component simply destructure it from the desired package.

```js static
import { AppBar, Button, Popover } from '@ayx/ui-core';
```
Where does app come from, you ask? We’ll get there. Your `index.html` file can look something like this to start:


```html static
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <!-- <title><%= htmlWebpackPlugin.options.title %></title> -->

  <!-- Avoid caching so that the latest asset paths are always served -->
  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
  <meta http-equiv="Pragma" content="no-cache" />
  <meta http-equiv="Expires" content="0" />

  <!-- Webpack will inject our app CSS bundle URLS below here automatically -->
</head>

<body>
  <div id="root">
    <!-- React will render into this placeholder -->
  </div>

  <!-- Webpack will inject JS bundle URLS below here automatically -->
</body>

</html>
```

Next up, let’s create a folder called App with a file called App.tsx inside of it (or index.tsx, if you prefer. Adjust your import statements accordingly). `App.tsx` will look like this: 


```jsx static
import React from 'react';
import {
  AyxAppWrapper,
  Button,
  Grid
} from '@ayx/ui-core';

const App = () => (
  <AyxAppWrapper>
    <Grid container>
      <Grid item>
        <Button>Button Label</Button>
      </Grid>
    </Grid>
  </AyxAppWrapper>
);

export default App;
```

### Theming

UI-Core provides a custom Alteryx wrapper that conforms to the Alteryx Design System for consistency across our applications. When developing an application you must wrap your application using the `AyxAppWrapper`, as seen above.
The `AyxAppWrapper` provides the application with Alteryx theming, font, and arrows usage. See the [AyxAppWrapper Demo](#/Utils/AyxAppWrapper) for more examples. 

It's worth mentioning that we don't provide the fonts themselves. Check out our [Typography demos](#/Core%20Components/Typography) page for more info on how to download the fonts.

**Note: **You’re going to want your app to support tree-shaking to get imports from ui-core to work as expected. To enable this, add the following to your `package.json`:

```js static
  "sideEffects": "false",
```

Boom. Now if you use `npm run start` (assuming you configured your ayx-scripts appropriately in your `package.json`, you should be able to head over to localhost:3000 and checkout out that super sweet button. It even changes colors if you hover over it! 

From here on out, you can checkout the documentation across the rest of the site to keep plugging and playing with new components. Enjoy!