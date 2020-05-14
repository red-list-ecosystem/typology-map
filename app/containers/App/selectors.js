/**
 * The global state selectors
 */
import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectGlobal = state => state.global || initialState;

const selectRouter = state => state.router;

export const selectRouterLocation = createSelector(
  selectRouter,
  routerState => routerState.location,
);
export const selectRouterSearchParams = createSelector(
  selectRouterLocation,
  location => location && new URLSearchParams(location.search),
);
export const selectRouterPath = createSelector(
  selectRouterLocation,
  location => location && location.pathname,
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

export const selectContent = createSelector(
  selectGlobal,
  global => global.content,
);
const selectContentByType = createSelector(
  (state, { type }) => type,
  selectContent,
  (type, content) => content[type],
);
const selectContentByLocale = createSelector(
  (state, { locale }) => locale,
  selectContentByType,
  (locale, content) => content[locale],
);
export const selectContentByKey = createSelector(
  (state, { key }) => key,
  selectContentByLocale,
  (key, content) => content[key],
);

export const selectContentReady = createSelector(
  selectGlobal,
  global => global.contentReady,
);
const selectContentReadyByType = createSelector(
  (state, { type }) => type,
  selectContentReady,
  (type, content) => content[type],
);
export const selectContentReadyByLocale = createSelector(
  (state, { locale }) => locale,
  selectContentReadyByType,
  (locale, content) => content[locale],
);
export const selectContentReadyByKey = createSelector(
  (state, { key }) => key,
  selectContentReadyByLocale,
  (key, content) => content[key],
);

export const selectContentRequested = createSelector(
  selectGlobal,
  global => global.contentReady,
);
const selectContentRequestedByType = createSelector(
  (state, { type }) => type,
  selectContentRequested,
  (type, content) => content[type],
);
export const selectContentRequestedByLocale = createSelector(
  (state, { locale }) => locale,
  selectContentRequestedByType,
  (locale, content) => content[locale],
);
export const selectContentRequestedByKey = createSelector(
  (state, { key }) => key,
  selectContentRequestedByLocale,
  (key, content) => content[key],
);
