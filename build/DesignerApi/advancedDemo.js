"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.array.iterator");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/web.dom-collections.for-each");

require("core-js/modules/web.dom-collections.iterator");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _uiCore = require("@ayx/ui-core");

var _index = _interopRequireDefault(require("../Context/index.tsx"));

var _index2 = _interopRequireDefault(require("./index.tsx"));

var _messages = _interopRequireDefault(require("./messages"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

const initialModelState = {
  name: '',
  values: {
    field1: '',
    field2: '',
    checked: false
  }
};

const DesignerApiDemo = () => {
  const Child = () => {
    const _React$useContext = _react.default.useContext(_index.default),
          _React$useContext2 = (0, _slicedToArray2.default)(_React$useContext, 2),
          model = _React$useContext2[0],
          handleUpdateModel = _React$useContext2[1];

    const resetModel = () => {
      handleUpdateModel(initialModelState);
    };

    const submitModel = () => {
      alert("This is the message that would be getting sent to your parent app: ".concat(JSON.stringify({
        type: 'UPDATE_MODEL',
        payload: model
      })));
    };

    const handleNameChange = event => {
      const newModel = _objectSpread(_objectSpread({}, model), {}, {
        name: event.target.value
      });

      handleUpdateModel(newModel);
    };

    const handleValueChange = (prop, event) => {
      const values = _objectSpread(_objectSpread({}, model.values), {}, {
        [prop]: event.target.value
      });

      const newModel = _objectSpread(_objectSpread({}, model), {}, {
        values
      });

      handleUpdateModel(newModel);
    };

    const handleCheckedChange = () => {
      const values = _objectSpread(_objectSpread({}, model.values), {}, {
        checked: !model.values.checked
      });

      const newModel = _objectSpread(_objectSpread({}, model), {}, {
        values
      });

      handleUpdateModel(newModel);
    };

    return /*#__PURE__*/_react.default.createElement(_uiCore.AyxAppWrapper, null, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      container: true,
      spacing: 3
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12
    }, /*#__PURE__*/_react.default.createElement(_uiCore.FormControl, null, /*#__PURE__*/_react.default.createElement(_uiCore.InputLabel, {
      htmlFor: "component-simple"
    }, "Name"), /*#__PURE__*/_react.default.createElement(_uiCore.Input, {
      id: "component-simple",
      onChange: handleNameChange,
      value: model.name
    }))), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12
    }, /*#__PURE__*/_react.default.createElement(_uiCore.FormControl, {
      "aria-describedby": "component-helper-text"
    }, /*#__PURE__*/_react.default.createElement(_uiCore.InputLabel, {
      htmlFor: "component-helper"
    }, "Value 1"), /*#__PURE__*/_react.default.createElement(_uiCore.Input, {
      id: "component-helper",
      onChange: e => handleValueChange('field1', e),
      value: model.values.field1
    }), /*#__PURE__*/_react.default.createElement(_uiCore.FormHelperText, {
      id: "component-helper-text"
    }, "Some important helper text"))), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true,
      md: 3,
      sm: 6,
      xs: 12
    }, /*#__PURE__*/_react.default.createElement(_uiCore.FormControl, null, /*#__PURE__*/_react.default.createElement(_uiCore.InputLabel, {
      htmlFor: "component"
    }, "Value 2"), /*#__PURE__*/_react.default.createElement(_uiCore.Input, {
      id: "component",
      onChange: e => handleValueChange('field2', e),
      value: model.values.field2
    }), /*#__PURE__*/_react.default.createElement(_uiCore.FormHelperText, null, "Some more important helper text"))), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true
    }, /*#__PURE__*/_react.default.createElement(_uiCore.FormControl, {
      component: "fieldset"
    }, /*#__PURE__*/_react.default.createElement(_uiCore.FormControlLabel, {
      checked: model.values.checked,
      control: /*#__PURE__*/_react.default.createElement(_uiCore.Checkbox, null),
      label: "Checked",
      labelPlacement: "top",
      onChange: handleCheckedChange,
      value: "checked"
    }))), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Button, {
      color: "primary",
      onClick: submitModel,
      variant: "contained"
    }, "Submit Model")), /*#__PURE__*/_react.default.createElement(_uiCore.Grid, {
      item: true,
      xs: 3
    }, /*#__PURE__*/_react.default.createElement(_uiCore.Button, {
      onClick: resetModel,
      variant: "contained"
    }, "Reset Model"))));
  };

  return /*#__PURE__*/_react.default.createElement(_index2.default, {
    messages: _messages.default
  }, /*#__PURE__*/_react.default.createElement(Child, null));
};

/*#__PURE__*/
_react.default.createElement(DesignerApiDemo, null);