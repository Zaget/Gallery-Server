const { createCsvRestaurantRecord, createCsvPhotoRecord } = require('../database/generateCSV');

describe ('create a photo record', () => {
  let photoRecord;
  let index = 2;
  beforeAll (() => {
    photoRecord = createCsvPhotoRecord(index);
  });
  
  it ('should return a string', () => {
    expect(typeof photoRecord).toBe('string');
  });

  it ('should have a photo file name', () => {
    const photo = photoRecord.split(',')[0];
    expect(photo.split('.')[1]).toBe('jpg');
  });

  it ('should have a place_id', () => {
    const place_id = photoRecord.split(',')[1];
    expect(parseInt(place_id)).toBe(index);
  });
});

describe ('create a restaurant record', () => {
  let restaurantRecord;
  let index = 2;
  beforeAll (() => {
    restaurantRecord = createCsvRestaurantRecord(index);
  });

  it ('should return a string', () => {
    expect(typeof restaurantRecord).toBe('string');
  });

  it ('should have a name', () => {
    let name = restaurantRecord.split(',')[0];
    expect(typeof name).toBe('string');
  });

  it ('should have a place_id', () => {
    let splitString = restaurantRecord.split(',');
    let place_id = splitString[splitString.length - 1];
    expect(parseInt(place_id)).toBe(index);
  });
});