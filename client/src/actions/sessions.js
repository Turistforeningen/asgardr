import fetch from 'isomorphic-fetch';
import Raven from 'raven-js';

import turbasen from '../apis/turbasen.js';
import sendgrid from '../apis/sendgrid.js';
import RejectError from '../lib/reject-error.js';

export const REQUEST_SESSION = 'REQUEST_SESSION';
export function requestSession() {
  return {
    type: REQUEST_SESSION,
  };
}

export const RECEIVE_SESSION = 'RECEIVE_SESSION';
export function receiveSession(session) {
  return {
    type: RECEIVE_SESSION,
    session: session,
    isAuthenticated: typeof session === 'object',
  };
}

export function fetchSession() {
  return (dispatch, getState) => {
    let statusCode;

    dispatch(requestSession());

    const options = {
      credentials: 'same-origin',
      headers: {Accept: 'application/json'},
    };

    return fetch('/session', options)
      .then((response) => {
        statusCode = response.status;

        return response.json();
      })
      .then((json) => {
        if (statusCode !== 200) {
          dispatch(receiveSession());
        } else {
          dispatch(receiveSession(json));
        }
        return json;
      })
      .catch((err) => { throw new Error(err); });
  };
}
