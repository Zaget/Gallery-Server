require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const dbHelpers = require('./postgresQueries');
const pgp = require('pg-promise')();

const connection = {
  user: 'steve',
  host: 'localhost',
  database: 'zaget-gallery',
  port: 5432,
};

const db = pgp(connection);

const app = express();
const PORT = 3002;
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/restaurants/', express.static(`${__dirname}/../client/dist`));

app.get('/restaurants/:id', (req, res) => {
  res.sendFile(path.join(`${__dirname}/../client/dist/index.html`));
});

app.get('/api/restaurants/:id/gallery', (req, res) => {
  dbHelpers.getPhotos(req, res, db);
});

// search Functionality in header
app.get('/:searchValue', (req, res) => {
  dbHelpers.search(req, res, db);
});


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
