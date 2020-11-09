import FieldListArray from './FieldListArray.ts';
import FieldInfoJson from './FieldInfoJson.ts';
import FieldList from './FieldList.ts';
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
