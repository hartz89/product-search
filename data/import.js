const fs         = require('fs');
const path       = require('path');
const fetchItems = require('./fetch-items');

const filePath = path.join(__dirname, './items.csv');

fs.readFile(filePath, 'utf-8', (error, data) => {
  if (error) {
    console.log(error);
    process.exit(1);
  }

  handleCSV(data);
});

function handleCSV(csvText) {
  // @todo use regex that doesn't match last empty line, or move to csv-parse
  const itemIds = csvText.split(',\n');
  itemIds.pop();

  fetchItems(itemIds)
    .then((response) => {
      console.log(response);
      storeItems(response.items);
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });
}

function storeItems(items) {
  // @todo store in mongo
}
