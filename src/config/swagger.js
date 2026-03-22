const path = require('path');
const yaml = require('yamljs');

// Charger le fichier yaml OpenAPI
const swaggerDocument = yaml.load(path.join(__dirname, '../../docs/openapi.yaml'));

module.exports = swaggerDocument;
