import { getTemplate } from './PageBuilder.ts';
import { isValidMessageType } from './Communication.ts';

describe('pageBuilder', () => {
  it('should return an HTML template when passed valid parameters', () => {
    const dataEnvelope = { theme: {}, paletteType: 'dark', model: {} };
    const vendorPath = '/public/dist/vendors~main.bundle.js';
    const mainPath = '/public/dist/bundle.js';
    const template = getTemplate(dataEnvelope, vendorPath, mainPath);
    const expected = `
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
      <script type="text/javascript" src="${vendorPath}"></script>
      <script type="text/javascript" src="${mainPath}"></script>
      </body>
    </html>`;

    expect(template).toEqual(expected);
  });

  it('should throw an error if it does not receive any parameters', () => {
    expect(() => {
      getTemplate();
    }).toThrowError('All parameters are required');
  });

  it('should throw an error if it only receives a dataEnvelope', () => {
    const dataEnvelope = { theme: {}, paletteType: 'dark', model: {} };

    expect(() => {
      getTemplate(dataEnvelope);
    }).toThrowError('All parameters are required');
  });

  it('should throw an error if it only receives a dataEnvelope and a vendorPath', () => {
    const dataEnvelope = { theme: {}, paletteType: 'dark', model: {} };
    const vendorPath = 'great-path.bundle.js';
    expect(() => {
      getTemplate(dataEnvelope, vendorPath);
    }).toThrowError('All parameters are required');
  });
});

describe('isValidMessageType', () => {
  it('should return true if the provided type is one of the supported message types', () => {
    const data = { type: 'UPDATE_MODEL' };
    const result = isValidMessageType(data.type);
    expect(result).toBeTruthy();
  });

  it('should return false if the provided type is one of the supported message types', () => {
    const data = { type: 'NOT_REAL' };
    const result = isValidMessageType(data.type);
    expect(result).toBeFalsy();
  });
});
