import FieldInfoJson from './FieldInfoJson.ts';
import mockData from './dummyData';

describe('FieldInfoJson', () => {
  it('should clean @ signs out of a field object', () => {
    const mockField = mockData[0].MultiMetaInfo.MetaInfo[0].RecordInfo.Field[0];
    const jsonField = new FieldInfoJson(mockField);

    expect(jsonField.name).toBeTruthy();
    expect(jsonField.name).toEqual(mockField['@name']);
  });
});
