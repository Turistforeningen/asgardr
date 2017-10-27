import fetch from 'isomorphic-fetch';

const baseUri = '/api/sendgrid';
const baseOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function send({from, to, subject, html}) {
  const options = {
    ...baseOptions,
    method: 'POST',
    body: JSON.stringify({
      to: to,
      from: from || 'UT.no / Den Norske Turistforening <ut@dnt.no>',
      subject: subject,
      html: html,
    }),
  };

  return fetch(`${baseUri}/send`, options)
    .then(() => (undefined))
    .catch((err) => { throw err; });
}

const sendgrid = {
  send,
};

export default sendgrid;
