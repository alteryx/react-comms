export default class FieldInfo {
  name: string;

  type: string;

  size: string;

  scale: string;

  source: string;

  description: string;

  constructor(name: string, type: string, size: string, scale: string, source: string, desc: string) {
    this.name = name;
    this.type = type;
    this.size = size;
    this.scale = scale;
    this.source = source;
    this.description = desc;
  }
}
