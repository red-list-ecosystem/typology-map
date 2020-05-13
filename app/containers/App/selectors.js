/**
 * The global state selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

export const makeSelectLocation = () =>
  createSelector(
    selectRouter,
    routerState => routerState.location,
  );

export const selectTypology = createSelector(
  selectGlobal,
  global => global.typologyConfig,
);
export const selectTypologyByKey = createSelector(
  (state, key) => key,
  selectTypology,
  (key, data) => data[key],
);
const selectTypologyRequested = createSelector(
  selectGlobal,
  global => global.typologyConfigRequested,
);
export const selectTypologyRequestedByKey = createSelector(
  (state, key) => key,
  selectTypologyRequested,
  (key, data) => data[key],
);
const selectTypologyReady = createSelector(
  selectGlobal,
  global => global.typologyConfigReady,
);
export const selectTypologyReadyByKey = createSelector(
  (state, key) => key,
  selectTypologyReady,
  (key, data) => data[key],
);
