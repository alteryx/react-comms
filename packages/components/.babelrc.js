module.exports = {
  presets: [
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'usage',
        corejs: 3,
        targets: {
          browsers: ['>0.25%', 'not dead', 'not ie 11', 'not op_mini all']
        }
      }
    ],
  ],
  env: {
    production: {
      ignore: ['**/*.test.js', '**/__test__', '**/__snapshots__', '**/messages.js', '**/__mocks__', '**/*.md']
    }
  },
  plugins: [
    ['@babel/plugin-syntax-dynamic-import'],
    ["@babel/plugin-proposal-private-methods", 
      {
        "loose": true
      }
    ],
    [
      "@babel/plugin-proposal-class-properties",
      {
        "loose": true
      }
    ],
    ['@babel/plugin-transform-classes'],
    ['@babel/transform-runtime'],
    [
      'transform-imports',
      {
        '@ayx-ui/core': {
          transform: '@ayx-ui/core/${member}',
          preventFullImport: true
        }
      }
    ]
  ]
};
