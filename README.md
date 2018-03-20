# Description
Walmart product search API using [hapi](https://hapijs.com) and [mongo](https://mongodb.com).

# Pre-requisites
You should have Node 8+ installed and a local MongoDB server running, or have a remote server specified via the `MONGO_CONNECTION_STRING` environment variable.

# Installation
```bash
npm install
```

# Importing data
Before starting the API, you must import product data from the Walmart API into your Mongo database. The `./data/import.js` script will achieve this. The `WALMART_API_KEY` environment variable *must* be specified. For example:
```shell
WALMART_API_KEY={yourApiKey} node ./data/import.js
```

# Startup
```shell
npm start
```

## Environment variables
Defaults can be found in `./config/defaults.json`.
- `HAPI_HOST` (optional) - Host on which to run the API.
- `HAPI_PORT` (optional) - Port on which to run the API.
- `MONGO_CONNECTION_STRING` (optional) - MongoDB connection string

# Usage
The API has a single endpoint, which returns JSON array of products with descriptions containing the provided `keyword`. Assuming default configuration, usage is as follows:
```
GET localhost:3000/products?keyword={yourSearchKeyword}
```


## Keyword constraints
The `keyword` query parameter must be provided. It must be at least 1 character, and no more than 128 characters. All characters must be alphanumeric.

# Linting
```shell
npm run lint
```

# Testing
```shell
npm test
```
