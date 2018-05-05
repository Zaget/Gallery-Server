const fs = require('fs');
const { createCsvRestaurantRecord, createCsvPhotoRecord } = require('./generateCSV');
const createJsonRecord = require('./generateJSON');

const type = process.argv[2];
const count = process.argv[3] || 0;

const generateData = (writer, encoding, numRecords, createRecord, header, callback) => {
  let recordsLeft = numRecords;
  writer.write(`${header}\n`);
  function write() {
    let ok = true;
    do {
      recordsLeft -= 1;
      const data = createRecord(recordsLeft);
      if (recordsLeft === 0) {
        writer.write(`${data}${type === 'json' ? ']' : ''}`, encoding, callback);
      } else {
        ok = writer.write(`${data}${type === 'json' ? ',' : '\n'}`, encoding);
      }
    } while (recordsLeft > 0 && ok);
    if (recordsLeft > 0) {
      writer.once('drain', write);
    }
  }
  write();
};

if (type === 'json' && count !== 0) {
  generateData(fs.createWriteStream('./database/photoData.json'), 'utf8', count, createJsonRecord, '[', () => {
    console.log('json file done');
  });
} else if (type === 'csv' && count !== 0) {
  generateData(fs.createWriteStream('./database/restaurantData.csv'), 'utf8', count, createCsvRestaurantRecord, 'name,place_id', () => {
    console.log('csv restaurant file done. Writing photo file.');
    generateData(fs.createWriteStream('./database/photoData.csv'), 'utf8', count, createCsvPhotoRecord, 'url,place_id', () => {
      console.log('done');
    });
  });
} else {
  console.log('error: no type specified');
}

module.exports = generateData;
