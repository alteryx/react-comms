const fs = require('fs');
const path = require('path');

module.exports = {
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'src/Docs/.styleguide/Wrapper.js'),
    ComponentsListRenderer: path.join(__dirname, 'src/Docs/.styleguide/components/SidebarList.js'),
    TableOfContentsRenderer: path.join(__dirname, 'src/Docs/.styleguide/components/Sidebar.js'),
    StyleGuideRenderer: path.join(__dirname, 'src/Docs/.styleguide/App.js')
  },
  // eslint-disable-next-line global-require
  webpackConfig: require('./node_modules/@ayx/ayx-scripts/config/webpack.dev'),
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
        border: '1px solid rgba(128, 128, 128, 0.5)',
        borderRadius: 4,
        margin: '12px 12px 20px 12px',
        padding: 12,
        backgroundColor: '#f7faff',
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
      content: './src/Docs/index.md',
      sections: [
        {
          name: 'Installation',
          content: './src/Docs/getting-started/index.md'
        },
        {
          name: 'Usage',
          content: './src/Docs/getting-started/usage.md'
        },
        {
          name: 'Linter',
          content: './src/Docs/getting-started/linter.md'
        },
        {
          name: 'Toolchain',
          content: './src/Docs/getting-started/toolchain.md'
        }
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
      sectionDepth: 1
    },
    {
      name: 'UI-SDK Components',
      components: './src/**/*.{js,jsx,ts,tsx}',
      ignore: [
        './src/Core/**/*{js,jsx,ts,tsx}',
        './src/**/demo.js',
        './src/Utils/*{js,jsx,ts,tsx}',
        './src/DesignerMessageApi/DesignerMessageApi.js',
        './src/MessageApiBase/MessageApiBase.js'
      ],
      exampleMode: 'collapse',
      usageMode: 'collapse',
      sectionDepth: 1
    },
    {
      name: 'UI-Core Components',
      components: './src/Core/**/*.{js,jsx,ts,tsx}',
      exampleMode: 'collapse',
      usageMode: 'collapse',
      sectionDepth: 1
    }
  ],
  pagePerSection: true,
  updateExample(props, exampleFilePath) {
    // props.settings are passed by any fenced code block, in this case
    const { settings, lang } = props;
    if (typeof settings.file === 'string') {
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
