import { IContext } from './types';

declare const JsEvent: (Event: string, item: object, context?: IContext) => Promise<unknown>;

export default JsEvent;
