"use strict";

require("core-js/modules/es.promise");

var _callback = require("./callback.ts");

describe('JsEvent', () => {
  window.Alteryx = {
    AlteryxLanguageCode: 'en',
    Gui: {
      SetConfiguration: jest.fn(),
      GetConfiguration: jest.fn()
    },
    JsEvent: jest.fn()
  };
  it('should return a promise', () => {
    const callbackPromise = (0, _callback.JsEvent)(window.Alteryx, 'test', {
      payload: 'data'
    });
    expect(callbackPromise).toBeInstanceOf(Promise);
  });
  it('should call JsEvent on the window context', () => {
    (0, _callback.JsEvent)(window.Alteryx, 'test', {
      payload: 'data'
    });
    expect(window.Alteryx.JsEvent).toHaveBeenCalled();
  });
});