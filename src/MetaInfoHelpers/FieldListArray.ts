import FieldList from './FieldList';

export default class FieldListArray {
  fields: Array<Array<FieldList>>;

  constructor(eIncomingMetaInfo: Array<any>) {
    // array of json objects
    this.fields = [];

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
        this.fields.push(listFieldList);
      }
    }
  }

  getListAt = (nInput: number, nIndex: number | undefined = undefined): FieldList => {
    if (this.fields.length === 0 || typeof this.fields[nInput] === 'undefined') return;
    if (nIndex >= 0) {
      return this.fields[nInput][nIndex];
    }
    return this.fields[nInput][0];
  };

  copyListAt = (nInput: number, nIndex: number | undefined = undefined): FieldList => {
    if (this.fields.length === 0 || typeof this.fields[nInput] === 'undefined') return;
    if (nIndex >= 0) {
      const originalFieldList: FieldList = this.fields[nInput][nIndex];
      const newFieldsList = new FieldList();
      newFieldsList.connectionName = originalFieldList.connectionName;
      for (const field of originalFieldList.fields) {
        newFieldsList.addField(field);
      }
      return newFieldsList;
    }

    return this.fields[nInput][0];
  };

  getCountMultiInputs = nInput => this.fields[nInput].length;

  getMultiInputs = nInput => this.fields[nInput];
}
