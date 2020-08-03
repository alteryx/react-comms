import JsEvent from '../Utils/callback';

class MessageBroker {
  constructor() {
    this.context = window.Alteryx;
    this.model = {};
    this.subscriptions = new Map();
    this.context.Gui.SetConfiguration = currentToolConfiguration => {
      if (this.subscriptions.has('SetConfiguration')) {
        this.subscriptions.get('SetConfiguration')(currentToolConfiguration);
      }
    };
    this.context.Gui.GetConfiguration = () => {
      JsEvent(this.context, 'GetConfiguration', this.model);
    };
  }

  sendMessage = (type, payload) => {
    JsEvent(this.context, type, payload);
  };

  subscribe = (messageType, cb) => {
    this.subscriptions.set(messageType, cb);
  };

  get languageCode() {
    return this.context.AlteryxLanguageCode;
  }

  set model(toolConfiguration) {
    this.model = toolConfiguration;
  }
}

export default MessageBroker;
