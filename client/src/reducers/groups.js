import validators from '../validators/index.js';

import {
  CREATE_GROUP,
  SET_FIELD,
  SET_VALIDATION,
  SAVE_GROUP_REQUEST,
  SAVE_GROUP_SUCCESS,
  SAVE_GROUP_ERROR,
} from '../actions/groups.js';


const defaultState = {data: {}, touched: {}, errors: {}, isValidated: false};

export default function groupReducer(state = defaultState, action) {
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

    case SET_VALIDATION:
      return {
        ...state,
        errors: validators.group({
          ...state.data,
          [action.key]: action.value,
        }).errors,
        warnings: validators.group({
          ...state.data,
          [action.key]: action.value,
        }).warnings,
        isValidated: true,
      };

    case SAVE_GROUP_REQUEST:
      return {
        ...state,
        isSaving: true,
      };

    case SAVE_GROUP_SUCCESS:
      return {
        ...state,
        isSaving: false,
        isSaved: true,
      };

    case SAVE_GROUP_ERROR:
      return {
        ...state,
        isSaving: false,
        isSaved: false,
      };

    default:
      return {...state};
  }
}
