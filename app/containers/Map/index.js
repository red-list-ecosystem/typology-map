/**
 *
 * Map
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import { Button } from 'grommet';
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
  background: ${({ theme }) => theme.global.colors['light-1']};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
const MapContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const BasemapToggle = styled.div`
  position: absolute;
  bottom: ${({ theme }) => theme.global.edgeSize.small};
  left: ${({ theme }) => theme.global.edgeSize.small};
  z-index: 401;
`;
const BasemapButton = styled(props => <Button plain {...props} />)`
  border-radius: 30px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  padding: ${({ theme }) => theme.global.edgeSize.xsmall}
    ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'dark-1' : 'light-2']};
  color: ${({ theme, active }) =>
    theme.global.colors.text[active ? 'dark' : 'light']};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1 !important;
`;

export function Map({ group, fullscreen, layers, onLoadLayer }) {
  useInjectReducer({ key: 'map', reducer });
  useInjectSaga({ key: 'map', saga });
  const [basemapStyle, setBasemapStyle] = useState(MAPBOX.BASEMAP_STYLES.light);

  const mapRef = useRef(null);
  const groupLayerGroupRef = useRef(null);
  const basemapLayerGroupRef = useRef(null);

  const onSetBasemapStyle = style => {
    if (basemapLayerGroupRef && style !== basemapStyle) {
      basemapLayerGroupRef.current.clearLayers();
      basemapLayerGroupRef.current.addLayer(
        L.tileLayer(MAPBOX.STYLE_URL_TEMPLATE, {
          style_id: style,
          username: MAPBOX.USER,
          accessToken: MAPBOX.TOKEN,
        }),
      );
      if (groupLayerGroupRef)
        groupLayerGroupRef.current.eachLayer(layer => layer.bringToFront());
    }
    setBasemapStyle(style);
  };
  useEffect(() => {
    mapRef.current = L.map('ll-map', {
      center: [30, 0],
      zoom: 1,
    });
    basemapLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    basemapLayerGroupRef.current.addLayer(
      L.tileLayer(MAPBOX.STYLE_URL_TEMPLATE, {
        style_id: basemapStyle,
        username: MAPBOX.USER,
        accessToken: MAPBOX.TOKEN,
      }),
    );
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
          L.tileLayer(MAPBOX.RASTER_URL_TEMPLATE, {
            id: group.layer.tileset,
            accessToken: MAPBOX.TOKEN,
            tileSize: 256,
            noWrap: true,
          }),
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

  return (
    <Styled>
      <MapContainer id="ll-map" />
      <BasemapToggle>
        <BasemapButton
          active={basemapStyle === MAPBOX.BASEMAP_STYLES.light}
          disabled={basemapStyle === MAPBOX.BASEMAP_STYLES.light}
          onClick={() => onSetBasemapStyle(MAPBOX.BASEMAP_STYLES.light)}
          label="Light"
        />
        <BasemapButton
          active={basemapStyle === MAPBOX.BASEMAP_STYLES.satellite}
          disabled={basemapStyle === MAPBOX.BASEMAP_STYLES.satellite}
          onClick={() => onSetBasemapStyle(MAPBOX.BASEMAP_STYLES.satellite)}
          label="Satellite"
        />
      </BasemapToggle>
    </Styled>
  );
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
