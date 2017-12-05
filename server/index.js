'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const nunjucks = require('nunjucks');

const {middleware: requireAuth, apiMiddleware: requireApiAuth} = require('./lib/auth');
const raven = require('./lib/raven');
const redis = require('./lib/redis');
const session = require('./lib/session');
const version = require('./lib/version');

const app = express();
const router = new express.Router();

app.set('x-powered-by', false);

app.use(raven.requestHandler());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session);

const isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
  app.use('/assets', express.static(`/assets`));
}

const assetsUri = isProduction ? '/assets' : 'http://asgardr-dev-server.app.dnt.local/assets';

const nunjucksEnvironment = nunjucks.configure('templates', {
  autoescape: true,
  express: app,
  noCache: process.env.NODE_ENV !== 'production',
});

nunjucksEnvironment.addGlobal('environment', process.env.NODE_ENV);
nunjucksEnvironment.addGlobal('assetsUri', assetsUri);

version.promise.then((gitcommit) => {
  nunjucksEnvironment.addGlobal('gitcommit', gitcommit);
}).catch(() => {});

// TODO: If no session property is set, the session ID is reset whenever accessed
router.use((req, res, next) => {
  req.session.isSet = true;

  return next();
});

router.use('/invitasjon', (req, res, next) => {
  res.render('invite.html', {app: 'invite', code: req.query.kode});
});

router.use('/bruker', (req, res, next) => {
  res.render('app.html', {app: 'convert'});
});

router.use('/logg-inn', require('./controllers/auth'));

router.get('/logg-ut', (req, res) => {
  redis.del(req.session.id).then(() => {
    req.session.destroy(() => {
      res.redirect('/');
    });
  });
});

router.use('/profil', requireApiAuth, (req, res, next) => {
  redis.hgetall(req.session.id).then((data) => {
    const user = JSON.parse(data.user);

    if (req.accepts('html')) {
      // res.render('profile.html', {user: user});
      res.send('');
    } else if (req.accepts('json')) {
      res.json(user);
    }
  });
});

router.use('/session', (req, res, next) => {
  redis.hgetall(req.session.id).then((data) => {
    const user = data.user ? JSON.parse(data.user) : undefined;
    const turbasen = data.turbasen ? JSON.parse(data.turbasen) : undefined;

    if (req.accepts('html')) {
      res.status(404).send();
    } else if (req.accepts('json')) {
      res.json({user, turbasen});
    }
  });
});

router.use('/api/turbasen', require('./lib/turbasen-api'));
router.use('/api/sendgrid', require('./lib/sendgrid-api'));

router.use('/', (req, res, next) => {
  res.render('portal.html', {app: 'portal'});
});

app.use(process.env.VIRTUAL_PATH, router);

app.use(raven.errorHandler());

// Start the express app
if (!module.parent) {
  const port = process.env.VIRTUAL_PORT || 8080;

  app.listen(port);
  console.log(`Server listening on port ${port}`); // eslint-disable-line
}

module.exports = app;
