const Joi             = require('joi');
const productHandlers = require('./product-handlers');

function register(server, options) {

  server.route({
    method: 'GET',
    path: '/products',
    handler: productHandlers.findByKeyword,
    options: {
      validate: {
        query: {
          keyword: Joi.string().alphanum().min(1).max(128).required()
        }
      }
    }
  });

}

const productRoutesPlugin = {
  name: 'productRoutes',
  register
};

module.exports.plugin = productRoutesPlugin;
