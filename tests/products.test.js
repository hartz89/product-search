const server = require('../server');
const expect = require('chai').expect;

describe('products', () => {

  describe('search', () => {

    it('should find products by keyword', async () => {
      const keyword = 'backpack';

      const options = {
        method: 'GET',
        url: `/products?keyword=${keyword}`
      };

      const response = await server.inject(options);

      expect(response.statusCode).to.equal(200);

      const productsFound = JSON.parse(response.payload);

      expect(productsFound).to.be.an('array').with.lengthOf(3);

      const productIds = productsFound.map((product) => product.itemId);

      expect(productIds).to.have.members([35613901, 35813552, 23117408]);
    });

    it('should not return any products for keywords without matches', async () => {
      const keyword = 'foobar1234';

      const options = {
        method: 'GET',
        url: `/products?keyword=${keyword}`
      };

      const response = await server.inject(options);

      expect(response.statusCode).to.equal(200);

      const productsFound = JSON.parse(response.payload);

      expect(productsFound).to.be.an('array').that.is.empty;
    });

    it('should not match product fields other than description', async () => {
      // this is contained in all image URLs,
      // which are not part of the description field
      const keyword = 'walmartimages';

      const options = {
        method: 'GET',
        url: `/products?keyword=${keyword}`
      };

      const response = await server.inject(options);

      expect(response.statusCode).to.equal(200);

      const productsFound = JSON.parse(response.payload);

      expect(productsFound).to.be.an('array').that.is.empty;

    });

    it('should return status 400 if a keyword is not provided', async () => {
      const options = {
        method: 'GET',
        url: '/products'
      };

      const response = await server.inject(options);

      expect(response.statusCode).to.equal(400);
    });

    it('should return status 400 if an empty keyword is provided', async () => {
      const options = {
        method: 'GET',
        url: '/products?keyword='
      };

      const response = await server.inject(options);

      expect(response.statusCode).to.equal(400);
    });

    it('should return status 400 if a keyword that is too long is provided', async () => {
      const longKeyword = 'x'.repeat(150);

      const options = {
        method: 'GET',
        url: '/products?keyword=' + longKeyword
      };

      const response = await server.inject(options);

      expect(response.statusCode).to.equal(400);
    });

  });

});
