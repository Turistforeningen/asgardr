import {
  REQUEST_USER,
  RECEIVE_USER,
} from '../actions/users.js';

export default function userReducer(state = {}, action) {
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
