const fs         = require('fs');
const path       = require('path');
const fetchItems = require('./fetch-items');
const db         = require('../db');

const filePath = path.join(__dirname, './items.csv');

fs.readFile(filePath, 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  handleCSV(data);
});

function handleCSV(csvText) {
  const itemIds = csvText.split(',\n');
  itemIds.pop(); // last elem will be empty

  fetchItems(itemIds)
    .then((response) => {

      const payload = JSON.parse(response);
      storeItems(payload.items);
    })
    .catch((error) => {

      console.log(error);
      process.exit(1);
    });
}

function storeItems(items) {
  const bulk = db.products.initializeOrderedBulkOp();

  items.forEach((item) => {

    bulk.insert(item);
  });

  bulk.execute((error, res) => {

    if (error) {
      console.log(error);
      process.exit(1);
    }

    console.log(`Imported ${items.length} items into products collection`);
    process.exit(0);
  });
}
