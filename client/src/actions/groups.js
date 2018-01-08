import fetch from 'isomorphic-fetch';

import turbasen from '../apis/turbasen.js';
import sendgrid from '../apis/sendgrid.js';

export const CREATE_GROUP = 'CREATE_GROUP';
export function createGroup(user) {
  return {
    type: CREATE_GROUP,
    data: {
      status: 'Kladd',
      license: 'CC BY-NC 4.0',
      contactName: user.name,
      contactEmail: user.email,
      users: [user],
    }
  };
}

export const SET_FIELD = 'SET_FIELD';
export function setField(key, value) {
  return {
    type: SET_FIELD,
    key: key,
    value: value,
  };
}

export const SAVE_GROUP_REQUEST = 'SAVE_GROUP_REQUEST';
export function saveGroupRequest() {
  return {
    type: SAVE_GROUP_REQUEST,
  };
}

export const SAVE_GROUP_SUCCESS = 'SAVE_GROUP_SUCCESS';
export function saveGroupSuccess() {
  return {
    type: SAVE_GROUP_SUCCESS,
  };
}

export const SAVE_GROUP_ERROR = 'SAVE_GROUP_ERROR';
export function saveGroupError() {
  return {
    type: SAVE_GROUP_ERROR,
  };
}

export function saveGroup(id, group) {
  return (dispatch, getState) => {
    dispatch(saveGroupRequest());

    return turbasen
      .save('grupper', id, group)
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err);
      })
  }
}
