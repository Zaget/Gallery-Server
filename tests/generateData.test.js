const generateData = require('../database/generateData.js');
const fs = require('fs');
const { createCsvRestaurantRecord } = require('../database/generateCSV.js');
const createJsonRecord = require('../database/generateJSON.js');

describe ('generates restaurant data in a csv file', () => {
  let csvContent;
  let numRecords = 100;
  beforeAll ((done) => {
    generateData(fs.createWriteStream('./tests/test.csv'), 'csv', 'utf8', numRecords, createCsvRestaurantRecord, 'name,place_id\n', () => {
      fs.readFile('./tests/test.csv', (err, data) => {
        if (err) {
          console.error(err);
          done();
          return;
        }
        csvContent = data.toString().split('\n');
        done();
      });
    });
  });
  it ('should have name and place_id headers', () => {
    const headers = csvContent[0].split(',');
    expect(headers[0]).toBe('name');
    expect(headers[1]).toBe('place_id');
  });
  it ('should create the correct number of records', () => {
    const headers = csvContent[0].split(',');
    expect(csvContent.length - 1).toBe(numRecords);
  });
});

describe ('generates restaurant data in a json file', () => {
  let jsonContent;
  let numRecords = 100;
  beforeAll ((done) => {
    generateData(fs.createWriteStream('./tests/test.json'), 'json', 'utf8', numRecords, createJsonRecord, '[', () => {
      fs.readFile('./tests/test.json', (err, data) => {
        if (err) {
          console.error(err);
          done();
          return;
        }
        jsonContent = JSON.parse(data.toString());
        done();
      });
    });
  });

  it ('should have saved data', () => {
    expect(Array.isArray(jsonContent)).toBe(true);
  });

  it ('should have the correct number of records', () => {
    expect(jsonContent.length).toBe(numRecords);
  });
});
