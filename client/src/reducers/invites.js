import {
  INVITE_FETCH_REQUEST,
  INVITE_FETCH_RESPONSE,
  INVITE_FETCH_ERROR,
  INVITE_ACCEPT_REQUEST,
  INVITE_ACCEPT_RESPONSE,
  INVITE_ACCEPT_ERROR,
} from '../actions/invites.js';

export default function inviteReducer(state = {}, action) {
  switch (action.type) {
    case INVITE_FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
        isFetched: false,
        code: action.code,
        error: null,
      };

    case INVITE_FETCH_RESPONSE:
      return {
        ...state,
        isFetching: false,
        isFetched: true,
        data: action.data,
        error: null,
      };

    case INVITE_FETCH_ERROR:
      return {
        ...state,
        isFetching: false,
        isFetched: false,
        error: action.error,
      };

    case INVITE_ACCEPT_REQUEST:
      return {...state};

    case INVITE_ACCEPT_RESPONSE:
      return {
        ...state,
        isAccepted: true,
      };

    case INVITE_ACCEPT_ERROR:
      return {
        ...state,
        errors: [action.error.message],
      };

    default:
      return {...state};
  }
}
