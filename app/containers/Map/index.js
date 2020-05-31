/**
 *
 * Map
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import {
  Button,
  Box,
  RangeInput,
  CheckBox,
  Text,
  ResponsiveContext,
} from 'grommet';
import { Menu } from 'grommet-icons';
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
import { isMinSize } from 'utils/responsive';
import commonMessages from 'messages';

import messages from './messages';

import reducer from './reducer';
import saga from './saga';
import {
  selectLayers,
  selectBasemap,
  selectOpacity,
  selectCountry,
} from './selectors';
import { loadLayer, setOpacity, setBasemap, setCountry } from './actions';

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
  <Box direction="row" {...props} elevation="xxsmall" />
))`
  position: absolute;
  z-index: 401;
  bottom: 4px;
  left: 0;
  background: rgba(255, 255, 255, 0.9);
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
`;

const SettingsToggle = styled(props => <Button {...props} plain />)`
  width: ${({ theme }) => theme.dimensions.settings.height.small}px;
  height: ${({ theme, fs }) =>
    theme.dimensions.settings.height[fs ? 'large' : 'small']}px;
`;

const KeyColor = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;

const IconWrap = styled(Box)`
  width: ${({ theme }) => theme.dimensions.settings.height.small}px;
  height: ${({ theme }) => theme.dimensions.settings.height.small}px;
  text-align: center;
  vertical-align: middle;
`;

const MapSettingsInner = styled(props => (
  <Box {...props} pad={{ horizontal: 'small' }} />
))``;

const MenuOpen = styled(Menu)`
  transform: rotate(90deg);
`;

const WrapControl = styled(props => <Box justify="evenly" {...props} />)``;

// const StyledRangeInput = styled(RangeInput)``;

const BasemapToggle = styled(props => <Box {...props} direction="row" />)``;
const BasemapButton = styled(props => <Button plain {...props} />)`
  border-radius: 30px;
  margin-right: ${({ theme }) => theme.global.edgeSize.xsmall};
  padding: ${({ theme }) => theme.global.edgeSize.hair}
    ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'dark-1' : 'white']};
  color: ${({ theme, active }) =>
    theme.global.colors.text[active ? 'dark' : 'light']};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1 !important;
`;

const LayerTitle = styled(Text)`
  font-weight: 600;
`;
const SettingTitle = styled(props => (
  <Text size="small" {...props} margin={{ vertical: 'xxsmall' }} />
))``;

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
  locale,
}) {
  useInjectReducer({ key: 'map', reducer });
  useInjectSaga({ key: 'map', saga });

  const mapRef = useRef(null);
  const groupLayerGroupRef = useRef(null);
  const basemapLayerGroupRef = useRef(null);
  const countryLayerGroupRef = useRef(null);

  const [showSettings, setShowSettings] = useState(true);
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

    // mapRef.current.on('zoomend', event => {
    //   console.log(mapRef.current.getZoom());
    // });

    mapRef.current.scrollWheelZoom.disable();
  }, []);

  useEffect(() => {
    if (fullscreen) {
      mapRef.current.scrollWheelZoom.enable();
    } else {
      mapRef.current.scrollWheelZoom.disable();
    }
  }, [fullscreen]);

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
              const geometryType = feature.geometry.type;
              const featureStyle =
                GROUP_LAYER_OPTIONS.VECTOR[
                  geometryType === 'LineString' ||
                  geometryType === 'MultiLineString'
                    ? 'line'
                    : 'area'
                ];
              if (value) {
                const color =
                  GROUP_LAYER_PROPERTIES.OCCURRENCE[value] &&
                  GROUP_LAYER_PROPERTIES.OCCURRENCE[value].color;
                if (color)
                  return {
                    ...featureStyle,
                    opacity,
                    fillOpacity: opacity,
                    color,
                  };
              }
              return {
                ...featureStyle,
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
      <ResponsiveContext.Consumer>
        {size => (
          <MapSettings fs={fullscreen}>
            <SettingsToggle
              onClick={() => setShowSettings(!showSettings)}
              fs={fullscreen}
              label={
                <Box alignContent="start" justify="center" direction="row" fill>
                  <IconWrap justify="center" direction="row" align="center">
                    {!showSettings && <Menu />}
                    {showSettings && <MenuOpen />}
                  </IconWrap>
                </Box>
              }
            />
            {showSettings && (
              <MapSettingsInner justify="evenly">
                {fullscreen && (
                  <Box alignContent="center" pad={{ vertical: 'xsmall' }}>
                    <LayerTitle>{group.title[locale]}</LayerTitle>
                  </Box>
                )}
                <Box direction="row" gap="medium">
                  <WrapControl>
                    <SettingTitle>
                      <FormattedMessage {...commonMessages.occurrence} />
                    </SettingTitle>
                    <Box direction="row" gap="small">
                      {Object.keys(GROUP_LAYER_PROPERTIES.OCCURRENCE).map(
                        key => (
                          <Box
                            direction="row"
                            align="center"
                            gap="xsmall"
                            key={key}
                          >
                            <KeyColor
                              color={
                                GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color
                              }
                              opacity={opacity}
                            />
                            <Text>
                              <FormattedMessage
                                {...commonMessages[
                                  `occurrence_${
                                    GROUP_LAYER_PROPERTIES.OCCURRENCE[key].id
                                  }`
                                ]}
                              />
                            </Text>
                          </Box>
                        ),
                      )}
                    </Box>
                  </WrapControl>
                  {fullscreen && isMinSize(size, 'large') && (
                    <WrapControl>
                      <SettingTitle>
                        <FormattedMessage {...messages.settingOpacity} />
                      </SettingTitle>
                      <RangeInput
                        value={opacity}
                        onChange={event => onSetOpacity(event.target.value)}
                        min={0}
                        max={1}
                        step={0.05}
                      />
                    </WrapControl>
                  )}
                  {fullscreen && isMinSize(size, 'large') && (
                    <WrapControl>
                      <SettingTitle>
                        <FormattedMessage {...messages.settingCountries} />
                      </SettingTitle>
                      <CheckBox
                        checked={country}
                        label={
                          <FormattedMessage
                            {...messages.settingCountriesShow}
                          />
                        }
                        onChange={() => onSetCountry(!country)}
                      />
                    </WrapControl>
                  )}
                  {fullscreen && isMinSize(size, 'large') && (
                    <WrapControl>
                      <SettingTitle>
                        <FormattedMessage {...messages.settingBasemap} />
                      </SettingTitle>
                      <BasemapToggle>
                        <BasemapButton
                          active={basemap === 'light'}
                          disabled={basemap === 'light'}
                          onClick={() => onSetBasemap('light')}
                          label={
                            <FormattedMessage
                              {...messages.settingBasemapLight}
                            />
                          }
                        />
                        <BasemapButton
                          active={basemap === 'satellite'}
                          disabled={basemap === 'satellite'}
                          onClick={() => onSetBasemap('satellite')}
                          label={
                            <FormattedMessage {...messages.settingBasemapSat} />
                          }
                        />
                      </BasemapToggle>
                    </WrapControl>
                  )}
                </Box>
              </MapSettingsInner>
            )}
          </MapSettings>
        )}
      </ResponsiveContext.Consumer>
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
  locale: PropTypes.string,
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
