import { JsEvent } from './callback.ts';
import { mergeObjects } from './mergeDeep.ts';

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

describe('mergeDeep', () => {
  it('should merge Objects and all nested Ones', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C', d: {} };
    const obj2 = { a: { a2: 'A2' }, b: { b1: 'B1' }, d: null };
    const obj3 = { a: { a1: 'A1', a2: 'A2' }, b: { b1: 'B1' }, c: 'C', d: null };
    expect(mergeObjects({}, obj1, obj2)).toEqual(obj3);
  });
  it('should behave like Object.assign on the top level', () => {
    const obj1 = { a: { a1: 'A1' }, c: 'C' };
    const obj2 = { a: undefined, b: { b1: 'B1' } };
    expect(mergeObjects({}, obj1, obj2)).toEqual({ ...obj1, ...obj2 });
  });
  it('should not merge array values, just override', () => {
    const obj1 = { a: ['A', 'B'] };
    const obj2 = { a: ['C'], b: ['D'] };
    expect(mergeObjects({}, obj1, obj2)).toEqual({ a: ['C'], b: ['D'] });
  });
});
