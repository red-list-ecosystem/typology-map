/*
 *
 * Map actions
 *
 */

import {
  LOAD_LAYER,
  LAYER_REQUESTED,
  LAYER_LOAD_SUCCESS,
  LAYER_LOAD_ERROR,
  LAYER_READY,
  SET_BASEMAP,
  SET_OPACITY,
  SET_COUNTRY,
} from './constants';

export function setCountry(value) {
  return {
    type: SET_COUNTRY,
    value,
  };
}
export function setBasemap(value) {
  return {
    type: SET_BASEMAP,
    value,
  };
}
export function setOpacity(value) {
  return {
    type: SET_OPACITY,
    value,
  };
}
export function loadLayer(key, config) {
  return {
    type: LOAD_LAYER,
    key,
    config,
  };
}

export function setLayerLoadSuccess(key, config, data, time) {
  return {
    type: LAYER_LOAD_SUCCESS,
    key,
    config,
    data,
    time,
  };
}

export function setLayerRequested(key, time) {
  return {
    type: LAYER_REQUESTED,
    key,
    time,
  };
}

export function setLayerLoadError(error, key) {
  return {
    type: LAYER_LOAD_ERROR,
    error,
    key,
  };
}

export function setLayerReady(key, time) {
  return {
    type: LAYER_READY,
    key,
    time,
  };
}
