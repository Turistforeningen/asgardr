'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('x-powered-by', false);

app.use(bodyParser.json());

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use('/assets', express.static(`/assets`));
}

const assetsUri = isProduction ? '/assets' : 'http://asgardr-client.app.dnt.local/assets';

app.get('/', (req, res, next) => {
  res.send(`<!doctype html><html><head><title>Den Norske Turistforening</title><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" /></head><body class="editor"><div id="app" data-environment="${process.env.NODE_ENV}"></div><script type="text/javascript" src="${assetsUri}/app.js"></script></body></html>`);
});

// Start the express app
if (!module.parent) {
  const port = process.env.VIRTUAL_PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line
}

module.exports = app;
