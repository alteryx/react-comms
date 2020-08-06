import { v4 as uuidv4 } from 'uuid';

import { IContext } from '../MessageApiBase/MessageApiBase';

export const JsEvent = (context: IContext, Event: string, item: object = {}): Promise<unknown> => {
  const callbackRegistrationId = uuidv4();
  const callbackPromise = new Promise(res => {
    context.Gui.Callbacks[callbackRegistrationId] = (...theArgs) => {
      res.apply({}, theArgs);
    };
  });

  const actualObjectToSend = {
    Event,
    callback: `window.Alteryx.Gui.Callbacks['${callbackRegistrationId}']`,
    Callback: `window.Alteryx.Gui.Callbacks['${callbackRegistrationId}']`,
    ...item
  };

  context.JsEvent(JSON.stringify(actualObjectToSend));
  return callbackPromise;
};
