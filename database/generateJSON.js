const faker = require('faker');
const generateRandomPhotos = require('./generatePhotoNames');

const createJsonRecord = (index) => {
  const maxPhotos = 20;
  const minPhotos = 10;
  const randInt = Math.floor(Math.random() * (maxPhotos - minPhotos)) + minPhotos;
  const obj = {};
  obj.name = faker.company.companyName();
  obj.place_id = index.toString();
  obj.photos = generateRandomPhotos(randInt);
  return JSON.stringify(obj);
};

module.exports = createJsonRecord;
