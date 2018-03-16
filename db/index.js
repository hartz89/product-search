const mongojs = require('mongojs');
const config  = require('./config');

const database = mongojs(
  config.mongo.connectionString,
  ['products']
);

module.exports = database;
