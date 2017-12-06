'use strict';

const querystring = require('querystring');
const fetch = require('isomorphic-fetch');
const redis = require('../lib/redis');
const {Router} = require('express');
const turbasenAuth = require('turbasen-auth');

const secrets = require('../lib/secrets');
const raven = require('../lib/raven');

const router = new Router();

turbasenAuth.turbasen.configure({
  API_KEY: secrets.NTB_API_KEY,
  API_ENV: process.env.NTB_API_ENV || 'dev',
  USER_AGENT: 'Asgardr',
});

let redirectUri;

const OAUTH_DOMAIN = 'https://www.dnt.no';

router.get('/dnt', (req, res, next) => {
  redirectUri = `${process.env.APP_URL}/logg-inn/verifiser?next=${req.query.next || '/'}`;

  return res.redirect(`${OAUTH_DOMAIN}/o/authorize/?client_id=${secrets.OAUTH_CLIENT_ID}&response_type=code&redirect_uri=${redirectUri}`);
});

router.get('/verifiser', (req, res, next) => { // eslint-disable-line consistent-return
  if (req.query.error) {
    return res.redirect(`/logg-inn?${querystring.stringify(req.query)}`);
  }

  const {code} = req.query;
  const url = `${OAUTH_DOMAIN}/o/token/`;
  const credentials = Buffer.from(`${secrets.OAUTH_CLIENT_ID}:${secrets.OAUTH_CLIENT_SECRET}`).toString('base64');

  let tokens;
  let user;

  const verify = fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${credentials}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}`,
  });

  verify
    .then((result) => {
      if (result.status !== 200) {
        throw new Error('Feil ved innlogging.');
      }

      return result;
    })
    .then(result => result.json())
    .then((json) => {
      tokens = Object.assign({}, json);
      return json;
    })
    .then((json) => { // eslint-disable-line arrow-body-style
      return fetch(`${OAUTH_DOMAIN}/api/oauth/medlemsdata/`, {
        headers: {
          Authorization: `Bearer ${json.access_token}`,
        },
      });
    })
    .then(result => result.json())
    .then((json) => {
      user = Object.assign({}, json, {
        id: `sherpa3:${json.sherpa_id}`,
        is_sudo: false,
        is_admin: false,
        is_external: false,
        grupper: [],
      });

      if (json.foreningstilganger && json.foreningstilganger.length > 0) {
        user.is_admin = true;
      }

      // DNT Sentralt has Sherpa ID 56
      if (json.foreningstilganger && json.foreningstilganger.find(f => f.sherpa_id === 56)) {
        user.is_sudo = true;
      }

      return redis.hmset(req.session.id, 'user', JSON.stringify(user));
    })
    .then(result => redis.hmset(req.session.id, 'tokens', JSON.stringify(tokens)))
    .then(() => {
      const appUrl = `${process.env.APP_URL}`;

      return fetch(`${appUrl}/api/turbasen/grupper?privat.brukere.id=${user.id}`);
    })
    .then(result => result.json())
    .then((json) => {
      if (json && json.documents && json.documents.length) {
        user.is_external = true;
        user.grupper = [...json.documents];
      }

      return redis.hmset(req.session.id, 'user', JSON.stringify(user));
    })
    .then(() => {
      if (req.query.next) {
        res.redirect(req.query.next);
      } else {
        res.redirect('/');
      }
    })
    .catch((err) => {
      raven.captureException(err);
      res.redirect('/?error=auth&code=500');
    });

  verify.catch((err) => {
    raven.captureException(err);
  });
});

router.post('/turbasen', turbasenAuth.middleware, (req, res, next) => {
  const user = req.turbasenAuth;

  if (user) {
    req.session.turbasen = `turbasen:${user.gruppe._id}:${user.epost}`;

    redis.hmset(req.session.id, 'turbasen', JSON.stringify(user)).then(() => {
      res.redirect('/bruker/turbasen');
    });
  } else {
    res.redirect('/?error=TBAUTH-401');
  }
});

module.exports = router;
