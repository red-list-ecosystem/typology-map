/*
 * App Actions
 *
 * Actions change things in your application
 * Since this app uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your application state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import {
  LOAD_TYPOLOGY,
  TYPOLOGY_REQUESTED,
  TYPOLOGY_LOAD_SUCCESS,
  TYPOLOGY_LOAD_ERROR,
  TYPOLOGY_READY,
} from './constants';

/**
 * Load the typology config data, this action starts the request saga
 *
 */
export function loadTypologyConfig(key) {
  return {
    type: LOAD_TYPOLOGY,
    key,
  };
}

export function setTypologyLoadSuccess(key, data, time) {
  return {
    type: TYPOLOGY_LOAD_SUCCESS,
    data,
    key,
    time,
  };
}

export function setTypologyRequested(key, time) {
  return {
    type: TYPOLOGY_REQUESTED,
    key,
    time,
  };
}

export function setTypologyLoadError(error, key) {
  return {
    type: TYPOLOGY_LOAD_ERROR,
    error,
    key,
  };
}

export function setTypologyReady(key, time) {
  return {
    type: TYPOLOGY_READY,
    key,
    time,
  };
}