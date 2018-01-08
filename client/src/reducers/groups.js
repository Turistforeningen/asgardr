import validators from '../validators/index.js';

import {
  CREATE_GROUP,
  SET_FIELD,
  SAVE_GROUP_REQUEST,
  SAVE_GROUP_SUCCESS,
  SAVE_GROUP_ERROR,
} from '../actions/groups.js';


export default function groupReducer(state = {data: {}, touched: {}, errors: {}}, action) {
  switch (action.type) {
    case CREATE_GROUP:
      return {
        ...state,
        data: action.data,
      };

    case SET_FIELD:
      return {
        ...state,
        data: {
          ...state.data,
          [action.key]: action.value,
        },
        errors: validators.group({
          ...state.data,
          [action.key]: action.value,
        }).errors,
        touched: {
          ...state.touched,
          [action.key]: true,
        },
      };
    case SAVE_GROUP_REQUEST:
      return {...state};

    case SAVE_GROUP_SUCCESS:
      return {...state};

    case SAVE_GROUP_ERROR:
      return {...state};

    default:
      return {...state};
  }
}
