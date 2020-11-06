import FieldList from './FieldList';

export default class FieldListArray {
  _fields: Array<Array<FieldList>>;

  constructor(eIncomingMetaInfo: Array<any>) {
    // array of json objects
    this._fields = [];

    if (eIncomingMetaInfo != null) {
      // if null return // TODO reractor to use !== and not !=
      for (const eMetaInfo of eIncomingMetaInfo) {
        const listFieldList: Array<FieldList> = []; // array of fieldlists
        if (eMetaInfo == null) {
          // empty single input
          listFieldList.push(new FieldList());
        } else if (eMetaInfo.hasOwnProperty('MultiMetaInfo')) {
          if (eMetaInfo.MultiMetaInfo == null) {
            listFieldList.push(new FieldList());
          } else if (eMetaInfo.MultiMetaInfo.MetaInfo[Symbol.iterator] !== undefined) {
            // >1 connection to multi-input
            for (const eChildMetaInfo of eMetaInfo.MultiMetaInfo.MetaInfo) {
              listFieldList.push(new FieldList(eChildMetaInfo.RecordInfo, eChildMetaInfo['@name']));
            }
          } else {
            // 1 connection to multi-input
            listFieldList.push(
              new FieldList(eMetaInfo.MultiMetaInfo.MetaInfo.RecordInfo, eMetaInfo.MultiMetaInfo.MetaInfo['@name'])
            );
          }
        } else {
          // single input
          listFieldList.push(new FieldList(eMetaInfo.MetaInfo.RecordInfo));
        }
        this._fields.push(listFieldList);
      }
    }
  }

  getListAt = (nInput: number, nIndex: number | undefined = undefined): FieldList => {
    if (this._fields.length === 0 || typeof this._fields[nInput] === 'undefined') return;
    if (nIndex >= 0) {
      return this._fields[nInput][nIndex];
    }
    return this._fields[nInput][0];
  };

  copyListAt = (nInput: number, nIndex: number | undefined = undefined): FieldList => {
    if (this._fields.length === 0 || typeof this._fields[nInput] === 'undefined') return;
    if (nIndex >= 0) {
      const originalFieldList: FieldList = this._fields[nInput][nIndex];
      const newFieldsList = new FieldList();
      newFieldsList.connectionName = originalFieldList.connectionName;
      for (const field of originalFieldList.fields) {
        newFieldsList.addField(field);
      }
      return newFieldsList;
    }

    return this._fields[nInput][0];
  };

  getCountMultiInputs = nInput => this._fields[nInput].length;

  getMultiInputs = nInput => this._fields[nInput];

  get fields(): Array<Array<FieldList>> {
    return this._fields;
  }

  get count(): number {
    return this._fields.length;
  }
}
