import FieldList from './FieldList.ts';
import FieldListArray from './FieldListArray.ts';
import FieldInfoJson from './FieldInfoJson.ts';
import mockData from './dummyData';

describe('FieldList', () => {
  let fieldList;
  beforeEach(() => {
    fieldList = new FieldList(
      mockData[0].MultiMetaInfo.MetaInfo[0].RecordInfo,
      mockData[0].MultiMetaInfo.MetaInfo[0]['@connection']
    );
  });

  it('should be able to create a list of fields', () => {
    expect(fieldList.fields.length).toEqual(7);
  });

  it('should be able to return its connection name via the getter', () => {
    expect(fieldList.connectionName).toMatch('Output');
  });

  it('should create a record of its fields by name', () => {
    expect(fieldList.fieldsByName).toBeInstanceOf(Object);
    expect(fieldList.fieldsByName.stringfield).toBeInstanceOf(FieldInfoJson);
    expect(fieldList.fieldsByName.stringfield.name).toMatch('stringfield');
  });

  it('should be able to create a list for noniterable fields', () => {
    const fieldList2 = new FieldList(mockData[2].MetaInfo.RecordInfo);

    expect(fieldList2.fields[0]).toBeInstanceOf(FieldInfoJson);
  });

  it('should be able to parse an existing field list', () => {
    const fieldListArray = new FieldListArray(mockData);
    const fieldList2 = new FieldList(fieldListArray.getListAt(0));

    expect(fieldList2).toBeInstanceOf(FieldList);
    expect(fieldList2.fields).toMatchObject(fieldListArray.getListAt(0).fields);
  });
});
