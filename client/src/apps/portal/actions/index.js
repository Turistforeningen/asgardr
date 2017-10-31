import fetch from 'isomorphic-fetch';
import Raven from 'raven-js';

import turbasen from '../../../apis/turbasen.js';
import sendgrid from '../../../apis/sendgrid.js';
import RejectError from '../../../lib/reject-error.js';

export const REQUEST_USER = 'REQUEST_USER';
export function requestUser() {
  return {
    type: REQUEST_USER,
  };
}

export const RECEIVE_USER = 'RECEIVE_USER';
export function receiveUser(user) {
  return {
    type: RECEIVE_USER,
    user: user,
    isAuthenticated: typeof user === 'object',
  };
}

export function fetchUser() {
  return (dispatch, getState) => {
    let statusCode;

    dispatch(requestUser());

    const options = {
      credentials: 'same-origin',
      headers: {Accept: 'application/json'},
    };

    return fetch('/profil', options)
      .then((response) => {
        statusCode = response.status;

        return response.json();
      })
      .then((json) => {
        if (statusCode !== 200) {
          dispatch(receiveUser());
        } else {
          dispatch(receiveUser(json));
        }
        return json;
      })
      .catch((err) => { throw new Error(err); });
  };
}
