import {combineReducers} from 'redux';

import {convertReducer} from './convert.js';
import {userReducer} from './users.js';
import {sessionReducer} from './sessions.js';

function appReducer(state = {}, action) {
  switch (action.type) {
    default:
      return {...state};
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  convert: convertReducer,
  session: sessionReducer,
});

export default rootReducer;
