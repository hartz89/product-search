const Hapi          = require('hapi');
const pino          = require('hapi-pino');
const config        = require('./config');
const productRoutes = require('./products/product-routes');

const server = new Hapi.Server(config.hapi);

const init = async () => {
  // plugins
  await server.register({ plugin: pino });
  await server.register(productRoutes);

  await server.start();

  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {
  console.log(error);
  process.exit(1);
});

init();

module.exports = server;
