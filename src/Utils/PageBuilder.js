export const getTemplate = (dataEnvelope, vendorBundlePath, mainBundlePath) => {
  if (!dataEnvelope || !vendorBundlePath || !mainBundlePath) {
    throw new Error('All parameters are required');
  }

  return `
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
      <script type="text/javascript">
      var dataEnvelope = ${JSON.stringify(dataEnvelope)}
      </script>
      <div id="app"></div>       
      <script type="text/javascript" src="${vendorBundlePath}"></script>
      <script type="text/javascript" src="${mainBundlePath}"></script>
      </body>
    </html>`;
};
