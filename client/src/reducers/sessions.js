import {
  REQUEST_SESSION,
  RECEIVE_SESSION,
} from '../actions/sessions.js';

export default function sessionReducer(state = {isAuthenticated: false}, action) {
  switch (action.type) {
    case REQUEST_SESSION:

      return {
        ...state,
        isFetching: true,
        isFetched: false,
      };

    case RECEIVE_SESSION:
      return {
        ...state,
        isAuthenticated: action.isAuthenticated,
        isFetching: false,
        isFetched: true,
        data: action.session,
      };

    default:
      return {...state};
  }
}
