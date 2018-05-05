const faker = require('faker');
const generateRandomPhotos = require('./generatePhotoNames');

const createCsvRestaurantRecord = (index) => {
  const name = faker.company.companyName();
  return `"${name}",${index}`;
};

const createCsvPhotoRecord = (index) => {
  const maxPhotos = 20;
  const minPhotos = 10;
  const randInt = Math.floor(Math.random() * (maxPhotos - minPhotos)) + minPhotos;
  let photo = '';
  const photos = generateRandomPhotos(randInt);
  for (let i = 0; i < randInt; i += 1) {
    photo += (i === randInt - 1) ? `${photos[i]},${index}` : `${photos[i]},${index}\n`;
  }
  return photo;
};

module.exports.createCsvPhotoRecord = createCsvPhotoRecord;
module.exports.createCsvRestaurantRecord = createCsvRestaurantRecord;
