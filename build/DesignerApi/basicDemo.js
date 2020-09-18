"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/web.dom-collections.for-each");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _uiCore = require("@ayx/ui-core");

var _index = _interopRequireDefault(require("../Context/index.tsx"));

var _index2 = _interopRequireDefault(require("./index.tsx"));

var _messages = _interopRequireDefault(require("./messages"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const DesignerApiDemo = () => {
  const Child = () => {
    const _React$useContext = _react.default.useContext(_index.default),
          _React$useContext2 = (0, _slicedToArray2.default)(_React$useContext, 2),
          model = _React$useContext2[0],
          handleUpdateModel = _React$useContext2[1];

    const incrementCount = () => {
      const newModel = _objectSpread({}, model);

      newModel.count++;
      handleUpdateModel(newModel);
    };

    return /*#__PURE__*/_react.default.createElement(_uiCore.AyxAppWrapper, null, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      container: true
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Button, {
      id: "child",
      onClick: incrementCount,
      variant: "contained"
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Typography, null, "Click me to increment the count"))), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true,
      xs: 12
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Typography, {
      variant: "h1"
    }, model.count))));
  };

  return /*#__PURE__*/_react.default.createElement(_index2.default, {
    messages: _messages.default
  }, /*#__PURE__*/_react.default.createElement(Child, null));
};

/*#__PURE__*/
_react.default.createElement(DesignerApiDemo, null);