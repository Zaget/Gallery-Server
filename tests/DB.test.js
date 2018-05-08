const db = require('../database/list.js');

test('the data is an array', () => {
  expect.assertions(1);
  return db.find({ 'place_id': '0' }).then((data) => {
    expect(Array.isArray(data)).toBe(true);
  });
});

test('the photos data is an array with a length between 10 and 20', () => {
  expect.assertions(1);
  return db.findOne({ 'place_id': '0' }).then((data) => {
    expect(data.photos.length >= 10 && data.photos.length <= 20).toBe(true);
  });
});

test('the data has a place_id', () => {
  expect.assertions(1);
  return db.findOne({ 'place_id': '0' }).then(data => {
    expect(!!data.place_id).toBe(true);
  });
});

