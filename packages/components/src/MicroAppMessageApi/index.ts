import MessageApi from '../MessageApiBase';
import { IMicroAppMessage, IAyxAppContext, IModel } from '../Utils/types';

let initRes: any;

const initialized = new Promise(res => {
  initRes = res;
});

class MicroAppMessageApi extends MessageApi<object, IModel, IAyxAppContext> {
  constructor() {
    super(window);
    window.addEventListener('message', this.receiveMessage);
    this.init();
  }

  sendMessage = (type: string, data: object): void => {
    window.parent.postMessage({ type, payload: { ...data } }, window.parent.origin);
  };

  receiveMessage = (message: IMicroAppMessage): void => {
    if (this.subscriptions.has(message.data.type)) {
      this.subscriptions.get(message.data.type)(message.data.payload);
    }
  };

  init = (): void => {
    this.sendMessage('INIT', null);
    window.addEventListener('message', (message: IMicroAppMessage) => {
      if (message.data.type === 'HANDSHAKE_RECEIVED') {
        initRes();
      }
    });
  };

  onReady = (): Promise<any> => {
    return initialized;
  };
}

export default MicroAppMessageApi;
