const defaults = require('./defaults.json');

/**
 * Resolve a configuration value, first looking in environment
 * variables and falling back on defaults.
 * @param {string} key the config key
 * @return {any} the configuration value
 */
function resolve(key) {
  return (process.env[key] || defaults[key]);
}

/**
 * Resolve a configuration value, looking in environment variables
 * and throwing an `Error` if it's not found.
 * @param {string} key the config key
 * @return {any} the configuration value
 */
function resolveOrThrow(key) {
  const envVar = process.env[key];
  if (!envVar) {
    throw new Error(`Environment variable "${key}" must be specified`);
  }
  return envVar;
}

const config = {
  hapi: {
    host: resolve('HAPI_HOST'),
    port: resolve('HAPI_PORT')
  },
  mongo: {
    connectionString: resolve('MONGO_DB_CONNECTION_STRING')
  },
  walmart: {
    apiUrl: resolve('WALMART_API_URL'),
    apiKey: resolveOrThrow('WALMART_API_KEY')
  }
};

module.exports = config;
