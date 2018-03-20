const mongojs = require('mongojs');
const config  = require('../config');

const database = mongojs(
  config.mongo.connectionString,
  ['products']
);

database.products.createIndex({
  longDescription: 'text'
});

module.exports = database;
