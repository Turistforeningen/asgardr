import {
  USER_CONVERT_REQUEST,
  USER_CONVERT_RESPONSE,
  USER_CONVERT_ERROR,
  FETCH_TURBASEN_USER_REQUEST,
  FETCH_TURBASEN_USER_RESPONSE,
  FETCH_TURBASEN_USER_ERROR,
} from '../actions/convert.js';

export function convertReducer(state = {}, action) {
  switch (action.type) {
    case FETCH_TURBASEN_USER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isFetched: action.isFetched,
      };

    case FETCH_TURBASEN_USER_RESPONSE:
      return {
        ...state,
        from: action.turbasen,
        to: action.dnt,
        group: action.group,
        isConverted: action.isConverted,
        isFetching: action.isFetching,
        isFetched: action.isFetched,
      };

    case FETCH_TURBASEN_USER_ERROR:
      return {
        ...state,
        errors: action.errors,
        isFetching: action.isFetching,
      };

    case USER_CONVERT_REQUEST:
      return {...state};

    case USER_CONVERT_RESPONSE:
      return {
        ...state,
        isConverted: action.isConverted,
        from: action.user,
      };

    case USER_CONVERT_ERROR:
      return {
        ...state,
        isConverted: action.isConverted,
        errors: [action.error.message],
      };

    default:
      return {...state};
  }
}

