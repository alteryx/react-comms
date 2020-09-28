"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _react = _interopRequireDefault(require("react"));

var _enzyme = require("enzyme");

var _index = _interopRequireDefault(require("../Context/index.tsx"));

var callback = _interopRequireWildcard(require("../Utils/callback.ts"));

var _index2 = _interopRequireDefault(require("./index.tsx"));

/* eslint-disable no-underscore-dangle */
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

      if (model.Annotation !== 'foo') handleUpdateModel({
        Annotation: 'foo'
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

      if (model.Annotation !== 'foo') handleUpdateModel({
        Annotation: 'foo'
      });
      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Annotation);
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
      }, model.Annotation);
    };

    const wrapper = (0, _enzyme.shallow)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    const valueProp = wrapper.find('#sdk-provider').prop('value');
    expect(valueProp).toHaveLength(2);
    expect(valueProp[0]).toEqual({
      ToolName: '',
      ToolId: undefined,
      Annotation: '',
      Configuration: {},
      Meta: [],
      srcData: {}
    });
    expect(valueProp[1]).toBeInstanceOf(Function);
  });
  it('should use the context hook to update the providers model', () => {
    const Child = () => {
      const _React$useContext7 = _react.default.useContext(_index.default),
            _React$useContext8 = (0, _slicedToArray2.default)(_React$useContext7, 2),
            model = _React$useContext8[0],
            handleUpdateModel = _React$useContext8[1];

      if (model.Annotation !== 'foo') {
        handleUpdateModel({
          Annotation: 'foo'
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Annotation);
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

      if (model && model.Annotation !== 'foo') {
        handleUpdateModel({
          Annotation: 'foo'
        });
      }

      return /*#__PURE__*/_react.default.createElement("div", {
        id: "child"
      }, model.Annotation);
    };

    const wrapper = (0, _enzyme.mount)( /*#__PURE__*/_react.default.createElement(_index2.default, {
      ctx: window.Alteryx
    }, /*#__PURE__*/_react.default.createElement(Child, null)));
    wrapper.update();
    window.Alteryx.Gui.GetConfiguration();
    expect(spyJsEvent).toHaveBeenCalledWith(window.Alteryx, 'GetConfiguration', expected);
  });
});