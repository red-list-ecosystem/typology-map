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
import { Button, Box, RangeInput, CheckBox } from 'grommet';
import L from 'leaflet';

import {
  MAPBOX,
  GEOJSON,
  LAYERS,
  GROUP_LAYER_PROPERTIES,
  GROUP_LAYER_OPTIONS,
} from 'config';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import {
  selectLayers,
  selectBasemap,
  selectOpacity,
  selectCountry,
} from './selectors';
import { loadLayer, setOpacity, setBasemap, setCountry } from './actions';
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

const MapSettings = styled(props => (
  <Box direction="row" {...props} elevation="xsmall" />
))`
  position: absolute;
  z-index: 401;
  bottom: 0;
  left: 0;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  background: rgba(255, 255, 255, 0.9);
`;
const OpacityControl = styled(props => <Box pad="small" {...props} />)``;
const CountryControl = styled(props => <Box pad="small" {...props} />)``;

// const StyledRangeInput = styled(RangeInput)``;

const BasemapToggle = styled(props => (
  <Box pad="small" {...props} direction="row" />
))``;
const BasemapButton = styled(props => <Button plain {...props} />)`
  border-radius: 30px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  padding: ${({ theme }) => theme.global.edgeSize.xsmall}
    ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'dark-1' : 'white']};
  color: ${({ theme, active }) =>
    theme.global.colors.text[active ? 'dark' : 'light']};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1 !important;
`;

export function Map({
  group,
  fullscreen,
  layers,
  onLoadLayer,
  basemap,
  onSetBasemap,
  opacity,
  onSetOpacity,
  country,
  onSetCountry,
}) {
  useInjectReducer({ key: 'map', reducer });
  useInjectSaga({ key: 'map', saga });

  const mapRef = useRef(null);
  const groupLayerGroupRef = useRef(null);
  const basemapLayerGroupRef = useRef(null);
  const countryLayerGroupRef = useRef(null);

  // init map
  useEffect(() => {
    mapRef.current = L.map('ll-map', {
      center: [30, 0],
      zoom: 1,
    });
    // make sure group overlays are always rendered on top of basemap
    mapRef.current.createPane('groupOverlay');
    mapRef.current.getPane('groupOverlay').style.zIndex = 600;
    mapRef.current.getPane('groupOverlay').style.pointerEvents = 'none';
    // make sure country overlays are always rendered on top of basemap and groups
    mapRef.current.createPane('countryOverlay');
    mapRef.current.getPane('countryOverlay').style.zIndex = 650;
    mapRef.current.getPane('countryOverlay').style.pointerEvents = 'none';
    basemapLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    groupLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    countryLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
  }, []);

  // change basemap
  useEffect(() => {
    if (basemapLayerGroupRef.current) {
      basemapLayerGroupRef.current.clearLayers();
      basemapLayerGroupRef.current.addLayer(
        L.tileLayer(MAPBOX.STYLE_URL_TEMPLATE, {
          style_id: MAPBOX.BASEMAP_STYLES[basemap || 'light'],
          username: MAPBOX.USER,
          accessToken: MAPBOX.TOKEN,
        }),
      );
    }
  }, [basemap]);

  // change opacity
  useEffect(() => {
    if (groupLayerGroupRef.current && group.layer) {
      groupLayerGroupRef.current.eachLayer(layer => {
        if (group.layer.type === 'raster') {
          layer.setOpacity(opacity);
        }
        if (group.layer.type === 'geojson' || group.layer.type === 'topojson') {
          layer.setStyle({
            opacity,
            fillOpacity: opacity,
          });
        }
      });
    }
  }, [opacity]);

  // change country
  useEffect(() => {
    if (countryLayerGroupRef.current) {
      if (country && LAYERS.countries) {
        if (LAYERS.countries.source === 'mapbox') {
          if (LAYERS.countries.type === 'style') {
            countryLayerGroupRef.current.addLayer(
              L.tileLayer(MAPBOX.STYLE_URL_TEMPLATE, {
                style_id: LAYERS.countries.style,
                username: MAPBOX.USER,
                accessToken: MAPBOX.TOKEN,
                pane: 'countryOverlay',
              }),
            );
          }
          if (LAYERS.countries.type === 'raster') {
            countryLayerGroupRef.current.addLayer(
              L.tileLayer(MAPBOX.RASTER_URL_TEMPLATE, {
                id: LAYERS.countries.tileset,
                accessToken: MAPBOX.TOKEN,
                pane: 'countryOverlay',
              }),
            );
          }
          // TODO allow vector layer
        }
      } else {
        countryLayerGroupRef.current.clearLayers();
      }
    }
  }, [country]);

  // change full screen
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

  // change group
  useEffect(() => {
    // clear group layer
    if (groupLayerGroupRef) {
      groupLayerGroupRef.current.clearLayers();
    }
  }, [group]);

  // change group or stored vector layers
  useEffect(() => {
    // add mapbox tile layer
    if (group.layer && group.layer.source === 'mapbox') {
      if (groupLayerGroupRef) {
        groupLayerGroupRef.current.addLayer(
          L.tileLayer(MAPBOX.RASTER_URL_TEMPLATE, {
            id: group.layer.tileset,
            accessToken: MAPBOX.TOKEN,
            opacity,
            pane: 'groupOverlay',
            ...GROUP_LAYER_OPTIONS.RASTER,
          }),
        );
      }
    }
    // add vector layer
    if (
      layers &&
      group.layer &&
      (group.layer.type === 'geojson' || group.layer.type === 'topojson')
    ) {
      // kick of loading of vector data for group if not present
      if (!layers[group.id]) {
        onLoadLayer(group.id, group.layer);
      }
      // display layer once loaded
      if (layers[group.id] && groupLayerGroupRef.current) {
        groupLayerGroupRef.current.addLayer(
          L.geoJSON(layers[group.id].data, {
            pane: 'groupOverlay',
            style: feature => {
              const value = feature.properties[GEOJSON.PROPERTIES.OCCURRENCE];
              if (value) {
                const color =
                  GROUP_LAYER_PROPERTIES.OCCURRENCE[value] &&
                  GROUP_LAYER_PROPERTIES.OCCURRENCE[value].color;
                if (color)
                  return {
                    ...GROUP_LAYER_OPTIONS.VECTOR,
                    opacity,
                    fillOpacity: opacity,
                    color,
                  };
              }
              return {
                ...GROUP_LAYER_OPTIONS.VECTOR,
                opacity,
                fillOpacity: opacity,
              };
            },
          }),
        );
      }
    }
  }, [group, layers]);

  return (
    <Styled>
      <MapContainer id="ll-map" />
      <MapSettings>
        <OpacityControl>
          <RangeInput
            value={opacity}
            onChange={event => onSetOpacity(event.target.value)}
            min={0}
            max={1}
            step={0.05}
          />
        </OpacityControl>
        <CountryControl>
          <CheckBox
            checked={country}
            label="Countries"
            onChange={() => onSetCountry(!country)}
          />
        </CountryControl>
        <BasemapToggle>
          <BasemapButton
            active={basemap === 'light'}
            disabled={basemap === 'light'}
            onClick={() => onSetBasemap('light')}
            label="Light"
          />
          <BasemapButton
            active={basemap === 'satellite'}
            disabled={basemap === 'satellite'}
            onClick={() => onSetBasemap('satellite')}
            label="Satellite"
          />
        </BasemapToggle>
      </MapSettings>
    </Styled>
  );
}

Map.propTypes = {
  layers: PropTypes.object,
  group: PropTypes.object,
  fullscreen: PropTypes.bool,
  onLoadLayer: PropTypes.func,
  onSetBasemap: PropTypes.func,
  basemap: PropTypes.string,
  onSetOpacity: PropTypes.func,
  onSetCountry: PropTypes.func,
  opacity: PropTypes.number,
  country: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  layers: state => selectLayers(state),
  opacity: state => selectOpacity(state),
  basemap: state => selectBasemap(state),
  country: state => selectCountry(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadLayer: (key, config) => {
      dispatch(loadLayer(key, config));
    },
    onSetBasemap: value => dispatch(setBasemap(value)),
    onSetOpacity: value => dispatch(setOpacity(value)),
    onSetCountry: value => dispatch(setCountry(value)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Map);
