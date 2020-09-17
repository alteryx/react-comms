"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.iterator");

require("core-js/modules/web.dom-collections.iterator");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _uiCore = require("@ayx/ui-core");

var _jss = require("jss");

var _jssRtl = _interopRequireDefault(require("jss-rtl"));

var _styles = require("@material-ui/styles");

// Configure JSS
const jss = (0, _jss.create)({
  plugins: [...(0, _styles.jssPreset)().plugins, (0, _jssRtl.default)()]
});

function RTL(props) {
  return /*#__PURE__*/_react.default.createElement(_styles.StylesProvider, {
    jss: jss
  }, props.children);
}

const Wrapper = props => {
  const children = props.children; // Since there is no hooks forceUpdate...

  const _useState = (0, _react.useState)(),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        updateState = _useState2[1];

  const forceUpdate = (0, _react.useCallback)(() => updateState({}), []);
  (0, _react.useEffect)(() => {
    function handleStorageChange() {
      forceUpdate();
    }

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  });
  const themeLocalObject = JSON.parse(localStorage.getItem('themeObject')) || {};
  const paletteTypeLocal = localStorage.getItem('paletteType');
  return /*#__PURE__*/_react.default.createElement(RTL, null, /*#__PURE__*/_react.default.createElement(_uiCore.AyxAppWrapper, {
    theme: themeLocalObject,
    paletteType: paletteTypeLocal
  }, children));
};

var _default = Wrapper;
exports.default = _default;