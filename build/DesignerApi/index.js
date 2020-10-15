"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.includes");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/web.dom-collections.for-each");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireWildcard(require("react"));

var _DesignerMessageApi = _interopRequireWildcard(require("../DesignerMessageApi"));

var _Context = _interopRequireDefault(require("../Context"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const validUpdateKeys = ['Configuration', 'Annotation'];
let messageBroker;

const DesignerApi = props => {
  const _props$messages = props.messages,
        messages = _props$messages === void 0 ? {} : _props$messages;

  if (!messageBroker) {
    messageBroker = new _DesignerMessageApi.default(props.ctx || window.Alteryx);
  }

  const _useState = (0, _react.useState)(messageBroker.model),
        _useState2 = (0, _slicedToArray2.default)(_useState, 2),
        model = _useState2[0],
        updateModel = _useState2[1];

  const _useState3 = (0, _react.useState)(messageBroker.ayxAppContext),
        _useState4 = (0, _slicedToArray2.default)(_useState3, 2),
        appContext = _useState4[0],
        updateAppContext = _useState4[1];

  const handleUpdateModel = updatedData => {
    const badKeys = Object.keys(updatedData).filter(k => !validUpdateKeys.includes(k));

    if (badKeys.length) {
      // eslint-disable-next-line no-console
      console.warn('Only Configuration and Annotation support updates');
      return;
    }

    const newModel = _objectSpread(_objectSpread({}, model), updatedData); // The reason all 3 of these are here is to work in all use cases for now, DesignerMessageAPI and DevHarness.
    // TODO: Refactor this to only be dependent on one call


    updateModel(newModel);
    messageBroker.model = newModel;
  };

  (0, _react.useEffect)(() => {
    const receiveAppContext = data => {
      updateAppContext(_objectSpread({}, data));
    };

    const receiveModel = data => {
      updateModel(_objectSpread({}, data));
    };

    messageBroker.subscribe(_DesignerMessageApi.subscriptionEvents.MODEL_UPDATED, receiveModel);
    messageBroker.subscribe(_DesignerMessageApi.subscriptionEvents.AYX_APP_CONTEXT_UPDATED, receiveAppContext);
    return function cleanUp() {
      handleUpdateModel(messageBroker.model);
    };
  }, []);
  const contextProps = {
    id: 'sdk-provider',
    value: [model, handleUpdateModel]
  };

  const _ref = appContext || {},
        darkMode = _ref.darkMode,
        locale = _ref.locale,
        productTheme = _ref.productTheme;

  const appPropsToSpread = {
    messages,
    paletteType: darkMode ? 'dark' : 'light',
    theme: productTheme,
    locale
  };
  return /*#__PURE__*/_react.default.createElement(_Context.default.Provider, contextProps, /*#__PURE__*/_react.default.cloneElement(props.children, _objectSpread({}, appPropsToSpread)));
};

var _default = DesignerApi;
exports.default = _default;