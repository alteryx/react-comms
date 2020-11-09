import FieldInfo from './FieldInfo.ts';
import mockData from './dummyData';

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
