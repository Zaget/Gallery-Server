const mongoose = require('mongoose');

const mongoUri = 'mongodb://localhost/zaget-gallery';

const db = mongoose.connect(mongoUri);

module.exports = db;
