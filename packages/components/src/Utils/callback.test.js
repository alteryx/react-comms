import { JsEvent } from './callback.ts';

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
    const callbackPromise = JsEvent(window.Alteryx, 'test', { payload: 'data' });
    expect(callbackPromise).toBeInstanceOf(Promise);
  });

  it('should call JsEvent on the window context', () => {
    JsEvent(window.Alteryx, 'test', { payload: 'data' });
    expect(window.Alteryx.JsEvent).toHaveBeenCalled();
  });
});
