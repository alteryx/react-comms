import { SUBSCRIPTION_EVENTS } from '../Utils/constants.ts';

import MicroAppMessageApi from './index.ts';

describe('MicroAppMessageApi', () => {
  beforeAll(() => {
    window.parent = {
      postMessage: jest.fn()
    };
  });
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('should exist', () => {
    const messageBroker = new MicroAppMessageApi();

    expect(messageBroker).toBeTruthy();
  });

  it('should send an init message after creation', () => {
    jest.spyOn(window.parent, 'postMessage');
    const messageBroker = new MicroAppMessageApi();

    expect(messageBroker).toBeTruthy();
    expect(window.parent.postMessage).toHaveBeenNthCalledWith(
      1,
      {
        type: SUBSCRIPTION_EVENTS.INIT,
        payload: {}
      },
      'http://localhost'
    );
  });

  it('should use sendMessage to call postMessage on its parent', () => {
    jest.spyOn(window.parent, 'postMessage');
    const messageBroker = new MicroAppMessageApi();

    messageBroker.sendMessage(SUBSCRIPTION_EVENTS.MODEL_UPDATED, { stuff: 'things' });

    expect(window.parent.postMessage).toHaveBeenNthCalledWith(
      2,
      {
        type: SUBSCRIPTION_EVENTS.MODEL_UPDATED,
        payload: { stuff: 'things' }
      },
      'http://localhost'
    );
  });

  it('should be able to receive a message if it has a subcription', () => {
    const messageBroker = new MicroAppMessageApi();
    const func = jest.fn();
    const message = {
      data: {
        type: SUBSCRIPTION_EVENTS.MODEL_UPDATED,
        payload: { stuff: 'things' }
      }
    };
    messageBroker.subscribe(SUBSCRIPTION_EVENTS.MODEL_UPDATED, func);
    messageBroker.receiveMessage(message);

    expect(messageBroker.subscriptions.get(message.data.type)).toHaveBeenCalled();
  });

  it('should return a promise from its onReady function', () => {
    const messageBroker = new MicroAppMessageApi();
    const promise = messageBroker.onReady();

    expect(promise).toBeInstanceOf(Promise);
  });
});
