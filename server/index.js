'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.set('x-powered-by', false);

app.use(bodyParser.json());

app.get('/', (req, res, next) => {
  res.send('Hello, World!');
});

// Start the express app
if (!module.parent) {
  const port = process.env.VIRTUAL_PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line
}

module.exports = app;
