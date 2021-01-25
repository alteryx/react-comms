import FieldInfo from './FieldInfo';
import FieldInfoJson from './FieldInfoJson';

interface IHasField {
  Field: Array<any>; // Can also be a singular object
}

type TRecordInfo = FieldList | IHasField | undefined;

export default class FieldList {
  connectionName: string;

  fieldsByName: object;

  fields: Array<any>;

  // Type safety doesn't work here as the Field coming from Designer can be an object, an array, or a FieldInfo
  // The typing is not universal and can't be made so as fallback types expect all aspects of a
  // type to be present
  Field: any;

  constructor(eRecordInfo?: TRecordInfo, connectionName?: string) {
    // ConnectionName is only populated when there is a named connection coming in (multiple input)
    this.connectionName = connectionName || '';
    this.fields = [];

    if (eRecordInfo && eRecordInfo.Field) {
      if (eRecordInfo.Field.length) {
        // Field is iterable (multiple field JSON object)
        eRecordInfo.Field.forEach(info => {
          this.addField(new FieldInfoJson(info));
        }, this);
      } else {
        // Field is not iterable (single field JSON object)
        this.addField(new FieldInfoJson(eRecordInfo.Field));
      }
    } else if (eRecordInfo instanceof FieldList) {
      // Existing field list
      this.combineFields(eRecordInfo);
    }

    this.fieldsByName = this.fields.reduce((acc, field) => {
      acc[field.name.toLowerCase()] = field;
      return acc;
    }, {});
  }

  combineFields(recordInfo: FieldList): void {
    for (const fi of recordInfo.fields) {
      this.addField(fi);
    }
  }

  addField = (fi: FieldInfo): void => {
    if (fi instanceof FieldInfo) {
      this.fields.push(fi);
    } else {
      // ignoring non-field input
      throw new Error('Attempted to add a non-field to FieldList.');
    }
  };
  
}
