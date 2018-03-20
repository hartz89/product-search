const defaults = require('./defaults.json');

const config = {
  hapi: {
    host: getConfig('HAPI_HOST'),
    port: getConfig('HAPI_PORT')
  },
  mongo: {
    connectionString: getConfig('MONGO_CONNECTION_STRING')
  }
};

/**
 * Resolve a configuration value, first looking in environment
 * variables and falling back on defaults.
 * @param {string} key the config key
 * @return {any} the configuration value
 */
function getConfig(key) {
  return (process.env[key] || defaults[key]);
}

module.exports = config;
