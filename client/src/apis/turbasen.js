import fetch from 'isomorphic-fetch';

import RejectError from '../lib/reject-error.js';

const baseUri = '/api/turbasen';
const baseOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function get(type, id) {
  let statusCode;

  return fetch(`${baseUri}/${type}/${id}`)
    .then((result) => {
      statusCode = result.status;

      return result.json();
    })
    .then((json) => {
      if (statusCode >= 400) {
        const message = json.message || 'API request failed';
        return Promise.reject(new RejectError(message));
      }

      return json;
    })
    .catch((err) => { throw err; });
}

function find(type, params) {
  const queryString = Object.keys(params || {})
    .map((item) => `${item}=${params[item]}`)
    .join('&');

  let statusCode;

  return fetch(`${baseUri}/${type}?${queryString}`)
    .then((result) => {
      statusCode = result.status;

      return result.json();
    })
    .then((json) => {
      if (statusCode >= 400) {
        const message = json.message || 'API request failed';
        return Promise.reject(new RejectError(message));
      }

      return json;
    })
    .catch((err) => { throw err; });
}

function save(type, id, data) {
  const url = `${baseUri}/${type}${id ? `/${id}` : ''}`;
  const method = id ? 'PUT' : 'POST';
  const options = {
    ...baseOptions,
    method: method,
    body: JSON.stringify(data),
  };

  let statusCode;

  return fetch(url, options)
    .then((result) => {
      statusCode = result.status;

      return result.json();
    })
    .then((json) => {
      if (statusCode >= 400) {
        const message = json.message || 'API request failed';
        return Promise.reject(new RejectError(message));
      }

      return json;
    })
    .catch((err) => { throw err; });
}

function destroy() {
  return Promise.reject(new RejectError('Not implemented'));
}

const turbasen = {
  get,
  find,
  save,
  destroy,
};

export default turbasen;
