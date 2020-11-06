export default class FieldInfo {
  _name: string;

  _type: string;

  _size: string;

  _scale: string;

  _source: string;

  _description: string;

  constructor(_name: string, _type: string, _size: string, _scale: string, _source: string, _desc: string) {
    this._name = _name;
    this._type = _type;
    this._size = _size;
    this._scale = _scale;
    this._source = _source;
    this._description = _desc;
  }

  get size(): string {
    if (this._type === 'FixedDecimal') {
      return `${this._size.toString()}.${this._scale.toString()}`;
    }
    return this._size.toString();
  }

  get type(): string {
    return this._type;
  }

  get scale(): string {
    return this._scale;
  }

  get source(): string {
    return this._source;
  }

  get description(): string {
    return this._description;
  }

  get name(): string {
    return this._name;
  }
}
