import {combineReducers} from 'redux';

import {
  REQUEST_INVITE,
  RECEIVE_INVITE,
  REQUEST_USER,
  RECEIVE_USER,
  INVITE_ACCEPT_REQUEST,
  INVITE_ACCEPT_RESPONSE,
  INVITE_ACCEPT_ERROR,
} from '../actions/index.js';

function appReducer(state = {}, action) {
  switch (action.type) {
    default:
      return {...state};
  }
}

function inviteReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_INVITE:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        code: action.code,
      };

    case RECEIVE_INVITE:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        data: action.data,
      };

    case INVITE_ACCEPT_REQUEST:
      return {...state};

    case INVITE_ACCEPT_RESPONSE:
      return {...state};

    case INVITE_ACCEPT_ERROR:
      return {
        ...state,
        errors: [action.error.message],
      };

    default:
      return {...state};
  }
}

function userReducer(state = {}, action) {
  switch (action.type) {
    case REQUEST_USER:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };

    case RECEIVE_USER:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: false,
        isFetched: true,
        data: action.user,
      };
    default:
      return {...state};
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  invite: inviteReducer,
  user: userReducer,
});

export default rootReducer;
