const request = require('request-promise');
const config  = require('../config');

const params = `format=json&apiKey=${config.walmart.apiKey}`;

function fetchItems(itemIds) {
  const itemIdString = itemIds.join(',');

  return request(
    `${config.walmart.apiUrl}/items?ids=${itemIdString}&${params}`
  );
}

module.exports = fetchItems;
