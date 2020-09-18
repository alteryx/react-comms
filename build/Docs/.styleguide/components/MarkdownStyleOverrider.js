"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

require("core-js/modules/es.array.from");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.array.map");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _uiCore = require("@ayx/ui-core");

const STYLEGUIDIST_CLASSES = ["rsg--sectionName", "rsg--text", "rsg--heading", "rsg--para", "rsg--list", "rsg--pre", "rsg--li-", "rsg--code", "rsg--pathline", "rsg--th", "rsg--td"];

const StyleguidistStyleOverrider = ({
  children
}) => {
  const _useTheme = (0, _uiCore.useTheme)(),
        palette = _useTheme.palette;

  const paletteType = palette.type;

  const setPre = paletteType => {
    const elements = Array.from(document.querySelectorAll("[class^=lang]"));

    const setColor = color => elements.forEach(element => {
      element.style.backgroundColor = color;
    });

    const type = {
      dark: () => setColor(palette.background.paper),
      light: () => setColor(palette.grey[800])
    }[paletteType]();
  };

  const setBlockQuotes = paletteType => {
    const blockQuotes = Array.from(document.querySelectorAll("[class^=rsg--blockquote]"));

    const setColor = color => blockQuotes.forEach(element => {
      element.style.backgroundColor = color;
    });

    const type = {
      dark: () => setColor(palette.background.default),
      light: () => setColor(palette.background.default)
    }[paletteType]();
  };

  const applyOverrides = (paletteType = "light") => {
    const elements = STYLEGUIDIST_CLASSES.map(sgClass => Array.from(document.querySelectorAll("[class^=".concat(sgClass, "]")))).reduce((acc, next) => [...acc, ...next], []);
    elements.forEach(el => {
      el.style.color = palette.text.primary;
      setBlockQuotes(paletteType);
    });
    setPre(paletteType);
  };

  (0, _react.useEffect)(() => {
    applyOverrides(paletteType);
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, children);
};

var _default = StyleguidistStyleOverrider;
exports.default = _default;