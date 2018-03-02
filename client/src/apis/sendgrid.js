import fetch from 'isomorphic-fetch';
import Raven from 'raven-js';

const baseUri = '/api/sendgrid';
const baseOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function send({from, to, cc, subject, html}) {
  let statusCode
  const options = {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({
      to: to,
      cc: cc || '',
      from: from || 'UT.no / Den Norske Turistforening <ut@dnt.no>',
      subject: subject,
      html: html,
    }),
  };

  return fetch(`${baseUri}/send`, options)
    .then((result) => {
      statusCode = result.status;

      return result.json();
    })
    .then((json) => {
      if (statusCode >= 400) {
        throw new Error(json.message || 'Sendgrid request failed');
      }

      return json;
    })
    .catch((err) => {
      Raven.captureException(err);

      throw err;
    });
}

const sendgrid = {
  send,
};

export default sendgrid;
