import {
  REQUEST_USER,
  RECEIVE_USER,
  USER_CONVERT_REQUEST,
  USER_CONVERT_RESPONSE,
  USER_CONVERT_ERROR,
} from '../actions/users.js';

export function userReducer(state = {}, action) {
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
