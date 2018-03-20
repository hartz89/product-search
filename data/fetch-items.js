const request = require('request-promise');

const baseUrl = 'http://api.walmartlabs.com/v1/items';
const params  = `format=json&apiKey=${process.env.WALMART_API_KEY}`;

function fetchItems(itemIds) {
  const itemIdString = itemIds.join(',');

  return request(
    `${baseUrl}?ids=${itemIdString}&${params}`
  );
}

module.exports = fetchItems;
