const { createCsvRestaurantRecord, createCsvPhotoRecord } = require('../database/generateCSV');

// const createCsvRestaurantRecord = (index) => {
//   const name = faker.company.companyName();
//   return `"${name}",${index}`;
// };

// const createCsvPhotoRecord = (index) => {
//   const maxPhotos = 20;
//   const minPhotos = 10;
//   const randInt = Math.floor(Math.random() * (maxPhotos - minPhotos)) + minPhotos;
//   let photo = '';
//   const photos = generateRandomPhotos(randInt);
//   for (let i = 0; i < randInt; i += 1) {
//     photo += (i === randInt - 1) ? `${photos[i]},${index}` : `${photos[i]},${index}\n`;
//   }
//   return photo;
// };

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