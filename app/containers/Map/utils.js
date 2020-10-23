import isNumber from 'utils/is-number';

import { QUERY_REGIONS_LAYER } from 'config';

export const roundCoordinate = (value, digits = 6) => {
  const factor = 10 ** Math.min(digits, 10);
  return isNumber(value) && Math.round(value * factor) / factor;
};

export const getAreaWKTFromLayer = layer => {
  const latlngs = layer.getLatLngs()[0];
  if (latlngs.length > 2) {
    const pointsWKT = latlngs.reduce((memo, latlng) => {
      if (latlng.lat && latlng.lng) {
        return `${memo}${memo.length > 0 ? ',' : ''}${roundCoordinate(
          latlng.lng,
        )} ${roundCoordinate(latlng.lat)}`;
      }
      return memo;
    }, '');
    // close area
    return `${pointsWKT}, ${roundCoordinate(latlngs[0].lng)} ${roundCoordinate(
      latlngs[0].lat,
    )}`;
  }
  return '';
};

export const getLatLngsFromArea = area => {
  const points = area.split(',');
  const latlngs = points.reduce((m, p) => {
    const lngLat = p.trim().split(' ');
    if (lngLat.length === 2 && isNumber(lngLat[0]) && isNumber(lngLat[1])) {
      return [...m, [lngLat[1], lngLat[0]]];
    }
    return m;
  }, []);
  return latlngs;
};

export const getRegionFeatureTitle = feature => {
  const featureTitle = feature.properties[QUERY_REGIONS_LAYER.featureTitle];
  const featureTitleAdd =
    feature.properties[QUERY_REGIONS_LAYER.featureTitleAdditional];
  const featureTitleAdd2 =
    feature.properties[QUERY_REGIONS_LAYER.featureTitleAdditional2];
  if (featureTitle === featureTitleAdd) {
    return featureTitle;
  }
  if (featureTitleAdd2 && featureTitleAdd2 !== '') {
    return `${featureTitleAdd}/${featureTitleAdd2} (${featureTitle})`;
  }
  return `${featureTitleAdd} (${featureTitle})`;
};
