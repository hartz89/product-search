const Hapi    = require('hapi');
// const mongojs = require('mongojs');
const pino    = require('hapi-pino');

const server = new Hapi.Server({
  host: 'localhost',
  port: '3000'
});

// @todo remove this
server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {

    return 'Hello, world!';
  }
});

const init = async () => {

  await server.register({
    plugin: pino,
    options: {
      prettyPrint: true,
      logEvents: ['request', 'response']
    }
  });

  await server.start();

  console.log(`Server running at ${server.info.uri}`);
};

process.on('unhandledRejection', (error) => {

  console.log(error);
  process.exit(1);
});

init();
