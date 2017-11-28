import {
  USER_CONVERT_REQUEST,
  USER_CONVERT_RESPONSE,
  USER_CONVERT_ERROR,
} from '../actions/convert.js';

export function convertReducer(state = {}, action) {
  switch (action.type) {
    case USER_CONVERT_REQUEST:
      return {...state};

    case USER_CONVERT_RESPONSE:
      return {
        ...state,
        from: user,
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

