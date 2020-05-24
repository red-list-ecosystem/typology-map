import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the map state domain
 */

const selectDomain = state => state.map || initialState;

/**
 * Other specific selectors
 */

export const selectCountry = createSelector(
  selectDomain,
  domain => domain.country,
);
export const selectOpacity = createSelector(
  selectDomain,
  domain => domain.opacity,
);
export const selectBasemap = createSelector(
  selectDomain,
  domain => domain.basemap,
);
export const selectLayers = createSelector(
  selectDomain,
  domain => domain.layers,
);

export const selectLayerByKey = createSelector(
  (state, key) => key,
  selectLayers,
  (key, data) => data[key],
);

const selectLayersRequested = createSelector(
  selectDomain,
  domain => domain.layersRequested,
);
export const selectLayerRequestedByKey = createSelector(
  (state, key) => key,
  selectLayersRequested,
  (key, data) => data[key],
);

export const selectLayersReady = createSelector(
  selectDomain,
  domain => domain.layersReady,
);
export const selectLayerReadyByKey = createSelector(
  (state, key) => key,
  selectLayersReady,
  (key, data) => data[key],
);
