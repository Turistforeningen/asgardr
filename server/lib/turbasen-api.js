'use strict';

const querystring = require('querystring');
const fetch = require('isomorphic-fetch');
const {Router} = require('express');

const secrets = require('../lib/secrets');

const router = new Router();

router.all('*', (req, res, next) => {
  const {path} = req;
  const query = querystring.stringify(req.query);
  const url = `${process.env.NTB_API_URL}${path}${query ? `?${query}` : ''}`;
  const options = {
    headers: {
      Authorization: `token ${secrets.NTB_API_KEY}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: req.method,
    body: req.body ? JSON.stringify(req.body) : undefined,
  };

  let statusCode;

  fetch(url, options)
    .then((result) => {
      statusCode = result.status;

      res.status(statusCode);

      return result.json();
    })
    .then((json) => { // eslint-disable-line consistent-return
      if (statusCode >= 400) {
        return res.json(json);
      }

      // TODO(Håvard): This part needs a cleanup!
      if (!req.query.skip && json.count < json.total && Number(req.query.limit) > json.count) {
        // TODO(Håvard): Remaining should be based on limit – not total
        const remaining = json.total - json.count;
        const requestCount = Math.ceil(remaining / json.count);
        const arr = [...Array(requestCount)]
          .map((item, index) => {
            const pagingQuery = Object.assign(
              {},
              req.query,
              {skip: (index + 1) * json.count},
              {limit: json.count}
            );

            const pagingQuery2 = querystring.stringify(pagingQuery);
            const pagingUrl = `${process.env.NTB_API_URL}${path}${pagingQuery ? `?${pagingQuery2}` : ''}`;
            return pagingUrl;
          });

        Promise.all(arr.map(url2 => fetch(url2, options).then(result => result.json())))
          .then(json2 => json2.map(json3 => json3.documents))
          .then((json2) => {
            const docs = json.documents.concat(...json2);
            return res.json({
              documents: docs,
              count: docs.length,
              total: docs.length,
            });
          });
      } else {
        return res.json(json);
      }
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line
      res.json({message: 'An Error Occured'});
    });
});

module.exports = router;
