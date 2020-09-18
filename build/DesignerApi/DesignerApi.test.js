"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

require("core-js/modules/es.array.filter");

require("core-js/modules/es.object.get-own-property-descriptors");

require("core-js/modules/web.dom-collections.for-each");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _index = _interopRequireDefault(require("../Context/index.tsx"));

var callback = _interopRequireWildcard(require("../Utils/callback.ts"));

var _index2 = _interopRequireDefault(require("./index.tsx"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

describe('DesignerApi', () => {
  beforeAll(() => {
    window.Alteryx = {
      AlteryxLanguageCode: 'en',
      Gui: {
        SetConfiguration: jest.fn(),
        GetConfiguration: jest.fn()
      },
      JsEvent: jest.fn()
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });
  it('should be able to render on the DOM', () => {
    const Child = () => {
      const _React$useContext = _react.default.useContext(_index.default),
            _React$useContext2 = (0, _slicedToArray2.default)(_React$useContext, 2),
            model = _React$useContext2[0],
            handleUpdateModel = _React$useContext2[1];

      if (model.Configuration.Annotation !== 'foo') handleUpdateModel({
        Configuration: {
          Annotation: 'foo',
          Configuration: {}
        }
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Annotation);
    };

    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    expect(wrapper).toMatchSnapshot();
  });
  it('should render AyxAppWrapper with appropriate props if there is model data', () => {
    const Child = () => {
      const _React$useContext3 = _react.default.useContext(_index.default),
            _React$useContext4 = (0, _slicedToArray2.default)(_React$useContext3, 2),
            model = _React$useContext4[0],
            handleUpdateModel = _React$useContext4[1];

      if (model.Configuration.Annotation !== 'foo') handleUpdateModel({
        Configuration: {
          Annotation: 'foo',
          Configuration: {}
        }
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.annotation);
    };

    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    expect(wrapper.find('#sdk-provider').children().props()).toEqual({
      paletteType: 'light',
      theme: {},
      locale: 'en',
      children: undefined,
      messages: {}
    });
  });
  it('should render the sdk-provider with a model when an event is emitted', () => {
    const Child = () => {
      const _React$useContext5 = _react.default.useContext(_index.default),
            _React$useContext6 = (0, _slicedToArray2.default)(_React$useContext5, 1),
            model = _React$useContext6[0];

      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Configuration.Annotation);
    };

    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    const valueProp = wrapper.find('#sdk-provider').prop('value');
    expect(valueProp).toHaveLength(2);
    expect(valueProp[0]).toEqual({
      Configuration: {
        Annotation: '',
        Configuration: {}
      }
    });
    expect(valueProp[1]).toBeInstanceOf(Function);
  });
  it('should use the context hook to update the providers model', () => {
    const Child = () => {
      const _React$useContext7 = _react.default.useContext(_index.default),
            _React$useContext8 = (0, _slicedToArray2.default)(_React$useContext7, 2),
            model = _React$useContext8[0],
            handleUpdateModel = _React$useContext8[1];

      if (model.Configuration.Annotation !== 'foo') {
        const newModel = _objectSpread({}, model);

        newModel.Configuration.Annotation = 'foo';
        handleUpdateModel(newModel);
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Configuration.Annotation);
    };

    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    expect(wrapper.find('#child').text()).toEqual('foo');
  });
  it('should use the current model state as the payload when GetConfiguration is called', () => {
    const spyJsEvent = jest.spyOn(callback, 'JsEvent');
    const expected = {
      Configuration: {
        Annotation: 'foo',
        Configuration: {}
      }
    };

    const Child = () => {
      const _React$useContext9 = _react.default.useContext(_index.default),
            _React$useContext10 = (0, _slicedToArray2.default)(_React$useContext9, 2),
            model = _React$useContext10[0],
            handleUpdateModel = _React$useContext10[1];

      if (model && model.Configuration.Annotation !== 'foo') {
        const newModel = _objectSpread({}, model);

        newModel.Configuration.Annotation = 'foo';
        handleUpdateModel(newModel);
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Configuration.Annotation);
    };

    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    wrapper.update();
    window.Alteryx.Gui.GetConfiguration();
    expect(spyJsEvent).toHaveBeenCalledWith(window.Alteryx, 'GetConfiguration', expected);
  });
});