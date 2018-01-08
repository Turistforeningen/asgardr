import {combineReducers} from 'redux';

import conversionReducer from './conversion.js';
import userReducer from './users.js';
import sessionReducer from './sessions.js';
import inviteReducer from './invites.js';
import groupsReducer from './groups.js';

function appReducer(state = {}, action) {
  switch (action.type) {
    default:
      return {...state};
  }
}

const rootReducer = combineReducers({
  app: appReducer,
  user: userReducer,
  conversion: conversionReducer,
  session: sessionReducer,
  invite: inviteReducer,
  groups: groupsReducer,
});

export default rootReducer;
