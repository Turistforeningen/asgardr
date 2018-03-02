'use strict';

const sendgrid = require('@sendgrid/mail');
const {Router} = require('express');

const secrets = require('../lib/secrets');

sendgrid.setApiKey(secrets.SENDGRID_API_KEY);

const router = new Router();

router.post('/send', (req, res, next) => {
  const email = {
    to: req.body.to,
    cc: req.body.cc,
    from: req.body.from,
    subject: req.body.subject,
    html: req.body.html,
  };

  return sendgrid.send(email)
    .then((response) => {
      const result = response[0];
      const json = result.toJSON();

      return res.status(json.statusCode).send();
    })
    .catch(err => res.status(500).json({message: err.message}));
});

module.exports = router;
