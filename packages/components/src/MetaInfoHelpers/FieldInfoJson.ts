import FieldInfo from './FieldInfo';

export default class FieldInfoJson extends FieldInfo {
  constructor(e) {
    super(e['@name'], e['@type'], e['@size'], e['@scale'], e['@source'], e['@description']);
  }
}
