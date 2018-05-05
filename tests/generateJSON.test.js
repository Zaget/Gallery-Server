const createJsonRecord = require('../database/generateJSON');

describe ('Create a json record', () => {
  let jsonRecord;
  let stringRecord;
  beforeAll(() => {
    stringRecord = createJsonRecord(2);
    jsonRecord = JSON.parse(stringRecord);
  });

  it ('Should return a string', () => {
    expect(typeof stringRecord).toBe('string');
  });

  it ('Should have a name', () => {
    expect(jsonRecord.name).not.toBe(undefined);
  });

  it ('Should have a place_id', () => {
    expect(jsonRecord.place_id).not.toBe(undefined);
  });

  it ('Should have a photos array', () => {
    expect(Array.isArray(jsonRecord.photos)).toBe(true);
  });
});