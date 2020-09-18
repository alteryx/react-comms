"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _deepmerge = _interopRequireDefault(require("deepmerge"));

var _uiCore = require("@ayx/ui-core");

var _AppRenderer = _interopRequireDefault(require("./components/AppRenderer"));

const LOCAL_STORAGE_KEYS = {
  direction: "paletteDirection",
  paletteType: "paletteType",
  productName: "productName",
  productTheme: "productTheme"
};
const PRODUCT_THEMES = {
  default: {},
  d1: {},
  dx: {},
  aep: {}
};

const simulateStorageChangeEvent = () => {
  var event = document.createEvent("Event");
  event.initEvent("storage", true, true);
  window.dispatchEvent(event);
};

const App = props => {
  // Direction
  const _useState = (0, _react.useState)(localStorage.getItem(LOCAL_STORAGE_KEYS.direction) || "ltr"),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        direction = _useState2[0],
        setDirection = _useState2[1];

  (0, _react.useEffect)(() => {
    document.body.setAttribute("dir", direction);
    localStorage.setItem("productTheme", JSON.stringify(productThemeWithDirection));
    localStorage.setItem(LOCAL_STORAGE_KEYS.direction, direction);
    simulateStorageChangeEvent();
  }, [direction]); // Palette Type

  const _useState3 = (0, _react.useState)(localStorage.getItem(LOCAL_STORAGE_KEYS.paletteType) || "light"),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        paletteType = _useState4[0],
        setPaletteType = _useState4[1];

  (0, _react.useEffect)(() => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.paletteType, paletteType);
    simulateStorageChangeEvent();
  }, [paletteType]); // Product theme

  const _useState5 = (0, _react.useState)(localStorage.getItem(LOCAL_STORAGE_KEYS.productName) || "default"),
        _useState6 = (0, _slicedToArray2.default)(_useState5, 2),
        productName = _useState6[0],
        setProductName = _useState6[1];

  (0, _react.useEffect)(() => {
    // Creating the Alteryx global will simulate running in Designer Desktop
    window.Alteryx = {
      AlteryxLanguageCode: productName === "d1" ? "en" : undefined
    };
    localStorage.setItem(LOCAL_STORAGE_KEYS.productTheme, JSON.stringify(productThemeWithDirection));
    localStorage.setItem(LOCAL_STORAGE_KEYS.productName, productName);
    simulateStorageChangeEvent();
  }, [productName]);
  const productThemeWithDirection = (0, _deepmerge.default)(PRODUCT_THEMES[productName], {
    direction
  });
  return /*#__PURE__*/_react.default.createElement(_uiCore.AyxAppWrapper, {
    theme: productThemeWithDirection,
    paletteType: paletteType
  }, /*#__PURE__*/_react.default.createElement(_AppRenderer.default, (0, _extends2.default)({}, props, {
    productThemeName: productName,
    toggleDirection: () => setDirection(direction === "rtl" ? "ltr" : "rtl"),
    togglePaletteType: () => setPaletteType(paletteType === "dark" ? "light" : "dark"),
    handleProductNameChange: setProductName
  })));
};

App.propTypes = {
  title: _propTypes.default.string.isRequired,
  version: _propTypes.default.string,
  homepageUrl: _propTypes.default.string.isRequired,
  children: _propTypes.default.node.isRequired,
  toc: _propTypes.default.node.isRequired
};
var _default = App;
exports.default = _default;