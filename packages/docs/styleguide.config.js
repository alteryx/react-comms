/* eslint-disable global-require */

const fs = require('fs');
const path = require('path');

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, './public/.styleguide/Wrapper.js'),
    ComponentsListRenderer: path.join(__dirname, './public/.styleguide/components/SidebarList.js'),
    TableOfContentsRenderer: path.join(__dirname, './public/.styleguide/components/Sidebar.js'),
    StyleGuideRenderer: path.join(__dirname, './public/.styleguide/App.js')
  },
  title: 'UI-SDK',
  // eslint-disable-next-line global-require
  webpackConfig: {
    module: {
      rules: [
        // Babel loader, will use your project’s .babelrc
        {
          test: /\.jsx?$/,
          exclude: [/node_modules/],
          include: [
            path.join(__dirname, '../src'),
            path.join(__dirname, './public/.styleguide'),
            path.join(__dirname, './public/static'),
            path.join(__dirname, './components/DesignerApi'),
            path.join(__dirname, 'public')
          ],
          loader: 'babel-loader',
          options: {
            babelrc: true
          }
        },
        {
          test: [/\.tsx?$/],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
              }
            },
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true
              }
            },
          ]
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
              options: {
                injectType: 'styleTag'
              }
            },
            {
              loader: 'css-loader',
              options: {
                esModule: false
              }
            }
          ]
        },
        {
          test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
          use: {
            loader: 'url-loader',
            options: {
              // Limit at 50k. Above that it emits separate files
              limit: 50000,
              // url-loader sets mimetype if it's passed.
              // Without this it derives it from the file extension
              mimetype: 'application/font-woff'
              // Output below fonts directory
            }
          }
        },
        {
          test: /\.jsx?$/,
          include: /node_modules\/(?=(acorn-jsx|regexpu-core|unicode-match-property-ecmascript|estree-walker|react-spring|unicode-match-property-value-ecmascript|react-dev-utils|ansi-styles|ansi-regex|chalk|react-intl|strip-ansi)\/).*/,
          use: {
            loader: 'babel-loader',
            options: {
              babelrc: true
            }
          }
        }
      ]
    }
  },  
  theme: {
    borderRadius: 4,
    color: {
      border: 'rgba(134, 152, 186, 0.3)',
      link: '#0A71D0',
      linkHover: '#3B8DD9',
      codeBackground: '#222',

      // Based on Prism okaidia theme
      codeBase: '#f8f8f2',
      codeComment: 'slategray',
      codePunctuation: '#f8f8f2',
      codeProperty: 'rgb(252, 146, 158)', // Change from okaidia (#f92672)
      codeDeleted: 'rgb(252, 146, 158)', // Change from okaidia (#f92672)
      codeString: '#a6e22e',
      codeInserted: '#a6e22e',
      codeOperator: '#f8f8f2',
      codeKeyword: '#66d9ef',
      codeFunction: '#e6db74',
      codeVariable: '#f8f8f2'
    },
    fontFamily: {
      base: [
        '"Lato"',
        '"Segoe UI"',
        '"Roboto"',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Oxygen"',
        '"Ubuntu"',
        '"Cantarell"',
        '"Fira Sans"',
        '"Droid Sans"',
        '"Helvetica Neue"',
        'sans-serif'
      ]
    }
  },
  styles: {
    Heading: {
      heading1: {
        fontWeight: 700,
        fontSize: 28
      },
      heading2: {
        fontWeight: 600,
        fontSize: 24
      },
      heading3: {
        fontSize: 20,
        fontWeight: 600
      }
    },
    Playground: {
      root: {
        marginBottom: 16
      }
    },
    Code: {
      code: {
        fontSize: 14,
        paddingLeft: '.3rem',
        paddingRight: '.3rem',
        borderRadius: '.2rem',
        backgroundColor: 'rgba(255,229,100,0.1)'
      }
    },
    Para: {
      para: {
        fontSize: 16
      }
    },
    List: {
      li: {
        fontSize: '16px'
      }
    },
    ReactComponent: {
      header: {
        marginBottom: 0
      }
    },
    Blockquote: {
      blockquote: {
        borderRadius: 4,
        margin: '12px 12px 20px 12px',
        padding: 12,
        '& p': {
          marginBottom: 0
        }
      }
    },
    StyleGuide: {
      '@global body': {
        fontFamily: 'Lato'
      },
      '@font-face': [
        {
          fontFamily: 'Lato',
          src:
            "url(public/static/font/lato/lato-regular.woff2) format('woff2'), url(public/static/font/lato/lato-regular.woff) format('woff')",
          fontWeight: '100 400'
        },
        {
          fontFamily: 'Lato',
          src:
            "url(public/static/font/lato/lato-bold.woff2) format('woff2'), url(public/static/font/lato/lato-bold.woff) format('woff')",
          fontWeight: '500 700'
        },
        {
          fontFamily: 'Lato',
          src:
            "url(public/static/font/lato/lato-black.woff2) format('woff2'), url(public/static/font/lato/lato-black.woff) format('woff')",
          fontWeight: '800 900'
        }
      ]
    }
  },
  sections: [
    {
      name: 'Getting Started',
      content: './index.md',
      sections: [
        {
          name: 'Installation',
          content: './getting-started/index.md'
        },
        {
          name: 'Usage',
          content: './getting-started/usage.md'
        }
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
      sectionDepth: 1
    },
    {
      name: 'Releases',
      content: './releases/index.md',
      sections: [
        {
          name: 'Changelog',
          content: './releases/changelog.md'
        },
        {
          name: 'Beta Migration Guide',
          content: './releases/alpha-beta-migration.md'
        }
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
      sectionDepth: 1
    },
    {
      name: 'Designer Api',
      content: './components/DesignerApi/index.md', 
      sections: [
        {
          name: 'Usage',
          content: './components/DesignerApi/DesignerApi.md',
        }
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
      sectionDepth: 1
    }
  ],
  pagePerSection: true,
  version: require('../components/package.json').version,
  skipComponentsWithoutExample: true,
  getComponentPathLine(componentPath) {
    const name = path.basename(componentPath, '.tsx');
    const dir = path.dirname(componentPath);

    if (dir.includes('src')) {
      const delimiter = dir.includes('/') ? '/' : '\\';
      const componentName = dir.split(delimiter)[1];
      const path = `import { ${componentName} } from '@ayx/react-comms';`;

      return path;
    }
    return `import {${name}} from '${dir}';`;
  },
  updateExample(props, exampleFilePath) {
    // props.settings are passed by any fenced code block, in this case
    const { settings, lang } = props;
    if (settings && settings.file && typeof settings.file === 'string') {
      const filepath = path.resolve(exampleFilePath, settings.file);
      delete settings.file;
      return {
        content: fs.readFileSync(filepath, 'utf8'),
        settings,
        lang
      };
    }
    return props;
  }
};
