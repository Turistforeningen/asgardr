import {combineReducers} from 'redux';

import {TEST} from '../actions/index.js';

function appReducer(state = {}, action) {
  switch (action.type) {
    case TEST:
      return {
        ...state,
      };

    default:
      return {
        ...state,
      };
  }
}

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
