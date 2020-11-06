import FieldListArray from './FieldListArray.ts';
import FieldList from './FieldList.ts';
import FieldInfoJson from './FieldInfoJson.ts';
import FieldInfo from './FieldInfo.ts';
import mockData from './dummyData';

describe('FieldListArray', () => {
  let fieldListArray;
  beforeEach(() => {
    fieldListArray = new FieldListArray(mockData);
  });
  it('should create return a properly formed FieldListArray structure from sample data', () => {
    expect(fieldListArray).toBeInstanceOf(FieldListArray);
  });

  it('should be able to retrieve the count of field lists in the array', () => {
    expect(fieldListArray.count).toEqual(3);
  });

  it('should be able to retrieve its own fields via the getter', () => {
    expect(fieldListArray.fields).toBeInstanceOf(Array);
    expect(fieldListArray.fields.length).toEqual(3);
  });

  it('should be able to use its get function to retrieve a nested FieldList at a specific index', () => {
    expect(fieldListArray.getListAt(0, 0)).toBeInstanceOf(FieldList);

    expect(fieldListArray.getListAt(0)).toBeInstanceOf(FieldList);
  });

  it('should be able to use its copyListAt function to return a copy of a FieldList from a specific index', () => {
    const initialData = fieldListArray.getListAt(0);
    const copy = fieldListArray.copyListAt(0);

    expect(copy).toBeInstanceOf(FieldList);
    expect(copy).toMatchObject(initialData);
  });

  it('should be able to use its copyListAt function to return a copy of a nested FieldList from a specific index', () => {
    const initialData = fieldListArray.getListAt(0, 1);
    const copy = fieldListArray.copyListAt(0, 1);

    expect(copy).toBeInstanceOf(FieldList);
    expect(copy.fields).toEqual(initialData.fields);
  });

  it('should create a blank FieldList if the metaInfo is null', () => {
    const blankMeta = [null];
    const fieldListArray = new FieldListArray(blankMeta);

    expect(fieldListArray.getListAt(0, 0)).toBeInstanceOf(FieldList);
    expect(fieldListArray.getListAt(0, 0).fields).toEqual([]);
  });

  it('should handle a single MetaInfo object', () => {
    const fieldListArray = new FieldListArray([mockData[1]]);
    const fakeField = new FieldInfoJson(mockData[1].MetaInfo.RecordInfo.Field[0]);

    expect(fieldListArray.getListAt(0, 0)).toBeInstanceOf(FieldList);
    expect(fieldListArray.getListAt(0, 0).fields[0]).toEqual(fakeField);
  });
});

describe('FieldInfoJson', () => {
  it('should clean @ signs out of a field object', () => {
    const mockField = mockData[0].MultiMetaInfo.MetaInfo[0].RecordInfo.Field[0];
    const jsonField = new FieldInfoJson(mockField);

    expect(jsonField.name).toBeTruthy();
    expect(jsonField.name).toEqual(mockField['@name']);
  });
});

describe('FieldInfo', () => {
  let mockField;
  let jsonField;
  beforeEach(() => {
    // eslint-disable-next-line prefer-destructuring
    mockField = mockData[0].MultiMetaInfo.MetaInfo[0].RecordInfo.Field[0];
    jsonField = new FieldInfo(
      mockField['@name'],
      mockField['@type'],
      mockField['@size'],
      mockField['@scale'],
      mockField['@source'],
      mockField['@desc']
    );
  });

  it('should be able to access the name property', () => {
    expect(jsonField.name).toEqual(mockField['@name']);
  });
  it('should be able to access the type property', () => {
    expect(jsonField.type).toEqual(mockField['@type']);
  });
  it('should be able to access the size property', () => {
    expect(jsonField.size).toEqual(mockField['@size']);
  });
  it('should be able to access the scale property', () => {
    expect(jsonField.scale).toEqual(mockField['@scale']);
  });
  it('should be able to access the source property', () => {
    expect(jsonField.source).toEqual(mockField['@source']);
  });
  it('should be able to access the description property', () => {
    expect(jsonField.description).toEqual(mockField['@description']);
  });
});

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
