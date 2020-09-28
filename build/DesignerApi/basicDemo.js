"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _uiCore = require("@ayx/ui-core");

var _index = _interopRequireDefault(require("../Context/index.tsx"));

var _index2 = _interopRequireDefault(require("./index.tsx"));

var _messages = _interopRequireDefault(require("./messages"));

const DesignerApiDemo = () => {
  const Child = () => {
    const _React$useContext = _react.default.useContext(_index.default),
          _React$useContext2 = (0, _slicedToArray2.default)(_React$useContext, 2),
          model = _React$useContext2[0],
          handleUpdateModel = _React$useContext2[1]; // This is just to force data to be in the model. This isn't a real world use case


    if (!model.Configuration.count) {
      handleUpdateModel({
        Configuration: {
          count: 1
        }
      });
    }

    const incrementCount = () => {
      let count = model.Configuration.count;
      count++;
      handleUpdateModel({
        Configuration: {
          count
        }
      });
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
    }, model.Configuration.count))));
  };

  return /*#__PURE__*/_react.default.createElement(_index2.default, {
    messages: _messages.default
  }, /*#__PURE__*/_react.default.createElement(Child, null));
};

/*#__PURE__*/
_react.default.createElement(DesignerApiDemo, null);