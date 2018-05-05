const fs = require('fs');
const generateData = require('./generateData');
const { createCsvRestaurantRecord, createCsvPhotoRecord } = require('./generateCSV');
const createJsonRecord = require('./generateJSON');

const type = process.argv[2];
const count = process.argv[3] || 0;

if (type === 'json' && count !== 0) {
  generateData(fs.createWriteStream('./database/photoData.json'), type, 'utf8', count, createJsonRecord, '[', () => {
    console.log('json file done');
  });
} else if (type === 'csv' && count !== 0) {
  generateData(fs.createWriteStream('./database/restaurantData.csv'), type, 'utf8', count, createCsvRestaurantRecord, 'name,place_id\n', () => {
    console.log('csv restaurant file done. Writing photo file.');
    generateData(fs.createWriteStream('./database/photoData.csv'), type, 'utf8', count, createCsvPhotoRecord, 'url,place_id\n', () => {
      console.log('done');
    });
  });
} else {
  console.log('error: no type specified');
}
