'use strict';

const HttpError = require('@starefossen/http-error');
const redis = require('./redis');


exports.apiMiddleware = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({message: 'Unauthorized'});
  } else {
    redis.hgetall(req.session.user)
      .then((data) => {
        const user = JSON.parse(data.user);
        if (user.is_admin !== true) {
        return res.status(401).json({code: 401, message: 'Who are you?'});
        }
        next();
      })
      .catch((err) => {
        return res.status(401).json({code: 401, message: 'Who are you?'});
      });
  }
};

exports.middleware = (req, res, next) => {
  redis.hgetall(req.session.user)
    .then((data) => { // eslint-disable-line consistent-return
      const user = JSON.parse(data.user);

      // TODO(Håvard): Let user know why it was redirected to login page
      if (user.is_admin !== true) {
        return res.redirect(`/?next=${req.originalUrl}`);
      }

      next();
    })
    .catch((err) => { // eslint-disable-line arrow-body-style
      return res.redirect(`/?next=${req.originalUrl}`);
    });
};