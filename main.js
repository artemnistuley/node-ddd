'use strict';

const fsp = require('node:fs').promises;
const path = require('node:path');
const staticServer = require('./lib/static.js');
const logger = require('./lib/logger.js');
const common = require('./lib/common.js');
const config = require('./config.js');
const load = require('./lib/load.js')(config.sandbox);
const transport = require(`./transport/${config.api.transport}.js`);

const sandbox = {
  api: Object.freeze({}),
  console: Object.freeze(logger),
  common: Object.freeze(common),
};

const apiPath = path.join(process.cwd(), './api');
const routing = {};

(async () => {
  const files = await fsp.readdir(apiPath);
  for (const fileName of files) {
    if (!fileName.endsWith('.js')) continue;
    const filePath = path.join(apiPath, fileName);
    const serviceName = path.basename(fileName, '.js');
    routing[serviceName] = require(filePath);
    // Or custom loader can be used here, but for this 
    // the modules inside "./api" folder should be changed.
    // routing[serviceName] = await load(filePath, sandbox);
  }

  staticServer('./static', config.static.port, logger);
  transport(routing, config.api.port, logger);
})();
