const Hapi   = require('hapi');
const pino   = require('hapi-pino');
const config = require('./config');
const db     = require('./db');


const server = new Hapi.Server(config.hapi);

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
