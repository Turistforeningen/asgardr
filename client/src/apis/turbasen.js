const baseUri = '/api/turbasen';
const baseOptions = {
  credentials: 'same-origin',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

function get(type, id) {
  return fetch(`${baseUri}/${type}/${id}`)
    .then((result) => {
      if (result.status >= 400) {
        const message = json.message || 'API request failed';
        return Promise.reject(message);
      }

      return result.json();
    })
    .catch((err) => { throw new Error(err); });
}

function find(type, params) {
  const queryString = Object.keys(params || {})
    .map(item => `${item}=${params[item]}`)
    .join('&');

  return fetch(`${baseUri}/${type}?${queryString}`)
    .then((result) => {
      if (result.status >= 400) {
        const message = json.message || 'API request failed';
        return Promise.reject(message);
      }

      return result.json();
    })
    .catch((err) => { throw new Error(err); });
}

function save(type, id, data) {
  const url = `${baseUri}/${type}${id ? `/${id}` : ''}`;
  const method = id ? 'PUT' : 'POST';
  const options = {
    ...baseOptions,
    method: method,
    body: JSON.stringify(data),
  };

  return fetch(url, options)
    .then((result) => {
      if (result.status >= 400) {
        const message = json.message || 'API request failed';
        return Promise.reject(message);
      }

      return result.json();
    })
    .catch((err) => { throw new Error(err); });
}

function destroy() {
  return Promise.reject(new Error('Not implemented'));
}

const turbasen = {
  get,
  find,
  save,
  destroy,
};

export default turbasen;
