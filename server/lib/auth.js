'use strict';

const redis = require('./redis');

exports.apiMiddleware = (req, res, next) => {
  return redis.hgetall(req.session.id)
    .then((data) => {
      const user = JSON.parse(data.user);

      if (user) {
        return next();
      }

      return res.status(401).json({code: 401, message: 'Who are you?'});
    })
    .catch(err => res.status(401).json({code: 401, message: 'Who are you?'}));
};

exports.middleware = (req, res, next) => {
  return redis.hgetall(req.session.id)
    .then((data) => { // eslint-disable-line consistent-return
      const user = JSON.parse(data.user);

      // TODO(Håvard): Let user know why it was redirected to login page
      if (user) {
        return next();
      }

      return res.redirect(`/?next=${req.originalUrl}`);
    })
    .catch((err) => { // eslint-disable-line arrow-body-style
      return res.redirect(`/?next=${req.originalUrl}`);
    });
};
