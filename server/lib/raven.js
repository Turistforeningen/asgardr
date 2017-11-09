'use strict';

const Raven = require('raven');

const secrets = require('./secrets');

Raven.config(secrets.SENTRY_DSN);

module.exports = Raven;
