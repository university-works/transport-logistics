const YAML = require('yamljs');
const swaggerUI = require('swagger-ui-express');

const config = require('../../config/config.service');

/** @: serveOpenapi :: path -> ...args */
const serveOpenapi = (filePath) => {
  const swaggerDocument = YAML.load(filePath);
  const docs = config.get('API_DOCS');
  return [docs, swaggerUI.serve, swaggerUI.setup(swaggerDocument)];
};

module.exports = serveOpenapi;
