/**
 *
 * Map
 *
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import L from 'leaflet';

import { MAPBOX, GEOJSON } from 'config';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { selectLayers } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loadLayer } from './actions';
// import messages from './messages';

const Styled = styled.div`
  background: ${({ theme }) => theme.global.colors['dark-4']};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export function Map({ group, fullscreen, layers, onLoadLayer }) {
  useInjectReducer({ key: 'map', reducer });
  useInjectSaga({ key: 'map', saga });

  const mapRef = useRef(null);
  const groupLayerGroupRef = useRef(null);

  useEffect(() => {
    mapRef.current = L.map('ll-map', {
      center: [30, 0],
      zoom: 1,
      layers: [
        L.tileLayer(
          'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/512/{z}/{x}/{y}?access_token={accessToken}',
          {
            style_id: MAPBOX.BASEMAP_STYLES.light,
            username: MAPBOX.USER,
            accessToken: MAPBOX.TOKEN,
          },
        ),
      ],
    });
    groupLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  useEffect(() => {
    if (mapRef) {
      mapRef.current.invalidateSize();
      if (fullscreen) {
        mapRef.current.setZoom(mapRef.current.getZoom() + 1);
      } else {
        mapRef.current.setZoom(Math.max(1, mapRef.current.getZoom() - 1));
      }
    }
  }, [fullscreen]);

  // group change
  useEffect(() => {
    // reset view
    if (mapRef) {
      mapRef.current.setZoom(1);
      mapRef.current.setView([30, 0]);
    }
    // clear group layer
    if (groupLayerGroupRef) {
      groupLayerGroupRef.current.clearLayers();
    }

    // add mapbox tile layer
    if (group.layer && group.layer.source === 'mapbox') {
      if (groupLayerGroupRef) {
        groupLayerGroupRef.current.addLayer(
          L.tileLayer(
            'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png64?access_token={accessToken}',
            {
              id: group.layer.tileset,
              accessToken: MAPBOX.TOKEN,
              tileSize: 256,
            },
          ),
        );
      }
    }
  }, [group]);

  useEffect(() => {
    if (
      group.layer &&
      (group.layer.type === 'geojson' || group.layer.type === 'topojson')
    ) {
      if (layers && !layers[group.id]) {
        onLoadLayer(group.id, group.layer);
      }
      if (layers && layers[group.id]) {
        if (groupLayerGroupRef) {
          groupLayerGroupRef.current.addLayer(
            L.geoJSON(layers[group.id].data, {
              style: feature => {
                const value = feature.properties[GEOJSON.COLORS.property];
                return {
                  ...GEOJSON.STYLE,
                  color: GEOJSON.COLORS.values[value],
                };
              },
            }),
          );
        }
      }
    }
  }, [group, layers]);

  return <Styled id="ll-map" />;
}

Map.propTypes = {
  layers: PropTypes.object,
  group: PropTypes.object,
  fullscreen: PropTypes.bool,
  onLoadLayer: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  layers: state => selectLayers(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadLayer: (key, config) => {
      dispatch(loadLayer(key, config));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Map);
