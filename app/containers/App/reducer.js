/*
 * AppReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { TYPOLOGY } from 'config';
import {
  TYPOLOGY_REQUESTED,
  TYPOLOGY_LOAD_SUCCESS,
  TYPOLOGY_LOAD_ERROR,
} from './constants';

// The initial state of the App
export const initialState = {
  /* eslint-disable no-param-reassign */
  typologyConfig: Object.keys(TYPOLOGY).reduce((memo, key) => {
    memo[key] = null;
    return memo;
  }, {}),
  // record request time
  typologyConfigRequested: Object.keys(TYPOLOGY).reduce((memo, key) => {
    memo[key] = null;
    return memo;
  }, {}),
  // record return time
  typologyConfigReady: Object.keys(TYPOLOGY).reduce((memo, key) => {
    memo[key] = null;
    return memo;
  }, {}),
  // // record error time
  // typologyConfigError: TYPOLOGY.reduce((memo, resource, key) => {
  //   memo[key] = false;
  //   return memo;
  // }, {}),
};

/* eslint-disable default-case, no-param-reassign */
const appReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case TYPOLOGY_REQUESTED:
        draft.typologyConfigRequested[action.key] = action.time;
        break;
      case TYPOLOGY_LOAD_SUCCESS:
        draft.typologyConfig[action.key] = action.data;
        draft.typologyConfigReady[action.key] = action.time;
        break;
      case TYPOLOGY_LOAD_ERROR:
        console.log('Error loading typology data... giving up!', action.key);
        draft.typologyConfigRequested[action.key] = action.time;
        break;
    }
  });

export default appReducer;
