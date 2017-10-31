import {combineReducers} from 'redux';

import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../actions/index.js';

function appReducer(state = {}, action) {
  switch (action.type) {
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
  user: userReducer,
});

export default rootReducer;
