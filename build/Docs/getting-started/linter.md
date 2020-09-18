
Alteryx's standard for linting is based off airbnb styleguide with customizations. For a list of rules and to see the project details in Gitlab: [eslint-config-ayx-ui](https://git.alteryx.com/ayx-ui/eslint-config-ayx-ui).

If you are only using JavaScript then install the base package:

```js static
// JavaScript only
npm install eslint-config-ayx-ui-base --save-dev
yarn add eslint-config-ayx-ui-base -D
```

If you are using React then install the this package:

```js static
// React and JavaScript
npm install eslint-config-ayx-ui --save-dev
yarn add eslint-config-ayx-ui -D
```

### Visual Studio Code Setup
1. Install EsLint extension: [ESLint by Dirk Baeumer](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
2. Install Prettier extension: [Prettier - Code formatter by Esben Petersen](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
3. Update your settings in Visual Studio Code:

```js static
"eslint.format.enable": true,
"eslint.validate": [
  "javascript",
  "javascriptreact",
  { "language": "typescript", "autoFix": true },
  { "language": "typescriptreact", "autoFix": true }
]
```

4. Optionally, you can set `eslint.autoFixOnSave` to `true`.

### Extending the rules
Teams that want to add additional rules can do so by extending the config. See the linting project for details: [eslint-config-ayx-ui](https://git.alteryx.com/ayx-ui/eslint-config-ayx-ui).

