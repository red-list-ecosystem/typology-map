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

import { MAPBOX } from 'config';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectMap from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

const Styled = styled.div`
  background: ${({ theme }) => theme.global.colors['dark-4']};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

export function Map({ group, fullscreen }) {
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

  useEffect(() => {
    if (mapRef) {
      mapRef.current.setZoom(1);
      mapRef.current.setView([30, 0]);
    }
    if (groupLayerGroupRef) {
      groupLayerGroupRef.current.clearLayers();
      if (group.layer && group.layer.source === 'mapbox') {
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

  return <Styled id="ll-map" />;
}

Map.propTypes = {
  group: PropTypes.object,
  fullscreen: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  map: makeSelectMap(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Map);
