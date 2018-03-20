const db      = require('../db');
const Promise = require('bluebird');

/**
 * Handler to find products by keyword.
 * @param {object} request - the request
 * @param {object} request.query - the request query params
 * @param {string} request.query.keyword - the keyword to search by
 * @param {function} h - the response toolkit
 * @return {Promise.<array>}
 */
function findByKeyword(request, h) {
  const keyword = request.query.keyword;

  return new Promise((resolve, reject) => {
    db.products.find({
      $text: {
        $search: keyword
      }
    }, (error, found) => {
      if (error) {
        return reject(error);
      }

      resolve(found);
    });
  });
}

module.exports = {
  findByKeyword
};
