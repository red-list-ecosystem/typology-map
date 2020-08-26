/**
 *
 * Map
 *
 */

import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import styled from 'styled-components';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import 'leaflet/dist/leaflet.css';
// import { cloneDeep } from 'lodash/lang';

import {
  MAPBOX,
  GEOJSON,
  LAYERS,
  GROUP_LAYER_PROPERTIES,
  GROUP_LAYER_OPTIONS,
  MAP_OPTIONS,
  PAGES,
} from 'config';

import { navigatePage } from 'containers/App/actions';

import { Plus, Minus } from 'components/Icons';
import LoadingIndicator from 'components/LoadingIndicator';
import MapControls from 'components/MapControls';
import MapControl from 'components/MapControl';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import saga from './saga';

import Settings from './Settings';
import Attribution from './Attribution';

import {
  selectLayers,
  selectBasemap,
  selectOpacity,
  selectCountry,
  selectZoomToBounds,
  selectLayersLoading,
} from './selectors';
import { loadLayer } from './actions';

const Styled = styled.div`
  background: ${({ theme }) => theme.global.colors['light-1']};
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;
const LeafletContainer = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
`;

const LoadingWrap = styled(LeafletContainer)`
  z-index: 999;
  pointer-events: none;
`;

const getGeometryType = type =>
  type === 'LineString' || type === 'MultiLineString' || type === 'line'
    ? 'line'
    : 'area';

const getVectorGridStyle = (properties, opacity, type) => {
  const value = properties[GEOJSON.PROPERTIES.OCCURRENCE];
  const featureStyle = GROUP_LAYER_OPTIONS.VECTOR[type];
  if (value) {
    const color =
      GROUP_LAYER_PROPERTIES.OCCURRENCE[value] &&
      GROUP_LAYER_PROPERTIES.OCCURRENCE[value].color;
    if (color)
      // prettier-ignore
      return type === 'line'
        ? { ...featureStyle, opacity, color }
        : {
          ...featureStyle,
          opacity,
          fillColor: color,
          color,
        };
  }
  return {
    ...featureStyle,
    opacity,
    fillOpacity: opacity,
  };
};

export function Map({
  group,
  fullscreen,
  layers,
  onLoadLayer,
  basemap,
  opacity,
  country,
  zoomToBounds,
  loading,
  onNavPage,
}) {
  useInjectReducer({ key: 'map', reducer });
  useInjectSaga({ key: 'map', saga });

  const mapRef = useRef(null);
  const groupLayerGroupRef = useRef(null);
  const basemapLayerGroupRef = useRef(null);
  const countryLayerGroupRef = useRef(null);

  const [tilesLoading, setTilesLoading] = useState(false);
  const [zoom, setZoom] = useState(MAP_OPTIONS.zoom);

  // init map
  useEffect(() => {
    mapRef.current = L.map('ll-map', MAP_OPTIONS);
    // make sure group overlays are always rendered on top of basemap
    mapRef.current.createPane('groupOverlay');
    mapRef.current.getPane('groupOverlay').style.zIndex = 600;
    mapRef.current.getPane('groupOverlay').style.pointerEvents = 'none';
    // make sure country overlays are always rendered on top of basemap and groups
    mapRef.current.createPane('countryOverlay');
    mapRef.current.getPane('countryOverlay').style.zIndex = 650;
    mapRef.current.createPane('basemapPane');
    mapRef.current.getPane('basemapPane').style.zIndex = 100;
    mapRef.current.getPane('tilePane').style.zIndex = 600;
    basemapLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    groupLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);
    countryLayerGroupRef.current = L.layerGroup().addTo(mapRef.current);

    mapRef.current.on('zoomend', () => {
      setZoom(mapRef.current.getZoom());
    });

    mapRef.current.scrollWheelZoom.disable();
  }, []);

  useEffect(() => {
    if (fullscreen) {
      mapRef.current.scrollWheelZoom.enable();
    } else {
      mapRef.current.scrollWheelZoom.disable();
    }
  }, [fullscreen]);

  useEffect(() => {
    if (mapRef.current.getZoom() !== zoom) {
      mapRef.current.setZoom(zoom);
    }
  }, [zoom]);

  // change basemap
  useEffect(() => {
    if (basemapLayerGroupRef.current) {
      basemapLayerGroupRef.current.clearLayers();
      basemapLayerGroupRef.current.addLayer(
        L.tileLayer(MAPBOX.STYLE_URL_TEMPLATE, {
          pane: 'basemapPane',
          style_id: MAPBOX.BASEMAP_STYLES[basemap || 'light'],
          username: MAPBOX.USER,
          accessToken: MAPBOX.TOKEN,
        }),
      );
    }
  }, [basemap]);

  // change opacity
  useEffect(() => {
    if (group && groupLayerGroupRef.current && group.layer) {
      groupLayerGroupRef.current.eachLayer(layer => {
        if (group.layer.type === 'raster') {
          layer.setOpacity(opacity);
        }
        if (group.layer.type === 'geojson' || group.layer.type === 'topojson') {
          layer.setOpacity(opacity);
          if (layer.setStyle) {
            layer.setStyle({
              opacity,
              fillOpacity: opacity,
            });
          }
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
              }).on({
                loading: () => setTilesLoading(true),
                load: () => setTilesLoading(false),
              }),
            );
          }
          if (LAYERS.countries.type === 'raster') {
            countryLayerGroupRef.current.addLayer(
              L.tileLayer(MAPBOX.RASTER_URL_TEMPLATE, {
                id: LAYERS.countries.tileset,
                accessToken: MAPBOX.TOKEN,
                pane: 'countryOverlay',
              }).on({
                loading: () => setTilesLoading(true),
                load: () => setTilesLoading(false),
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
    if (group && group.layer && group.layer.source === 'mapbox') {
      if (groupLayerGroupRef) {
        groupLayerGroupRef.current.addLayer(
          L.tileLayer(MAPBOX.RASTER_URL_TEMPLATE, {
            id: group.layer.tileset,
            accessToken: MAPBOX.TOKEN,
            opacity,
            pane: 'groupOverlay',
            ...GROUP_LAYER_OPTIONS.RASTER,
          }).on({
            loading: () => setTilesLoading(true),
            load: () => setTilesLoading(false),
          }),
        );
      }
      if (zoomToBounds) {
        let latlngs;
        if (group.layer.extent) {
          const { N, S, W, E } = group.layer.extent;
          latlngs = [
            [parseInt(N || 85, 10), -parseInt(W || 180, 10)],
            [-parseInt(S || 85, 10), parseInt(E || 180, 10)],
          ];
        } else {
          latlngs = MAP_OPTIONS.defaultBounds;
        }
        mapRef.current.fitBounds(latlngs, {
          paddingBottomRight: [0, 40],
        });
      }
    }
    // add vector layer
    if (
      group &&
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
        const layer = layers[group.id];
        const geoType = getGeometryType(group.layer.geometryType);
        const vectorGrid = L.vectorGrid.slicer(layer.data, {
          rendererFactory: L.svg.tile,
          vectorTileLayerStyles: {
            sliced: properties =>
              getVectorGridStyle(properties, opacity, geoType),
          },
        });
        groupLayerGroupRef.current.addLayer(vectorGrid);
        if (zoomToBounds) {
          let latlngs;
          if (group.layer.extent) {
            const { N, S, W, E } = group.layer.extent;
            latlngs = [
              [parseInt(N || 85, 10), -parseInt(W || 180, 10)],
              [-parseInt(S || 85, 10), parseInt(E || 180, 10)],
            ];
          } else {
            const jsonLayer = L.geoJSON(layer.data);
            latlngs = jsonLayer.getBounds();
          }
          mapRef.current.fitBounds(latlngs, {
            paddingBottomRight: [0, 40],
          });
        }
      }
    }
  }, [group, layers]);

  useEffect(() => {
    // zoom to bounds when enabled
    if (group && zoomToBounds) {
      let latlngs;
      const layer = layers[group.id];
      if (group && group.layer && group.layer.extent) {
        const { N, S, W, E } = group.layer.extent;
        latlngs = [
          [parseInt(N || 85, 10), -parseInt(W || 180, 10)],
          [-parseInt(S || 85, 10), parseInt(E || 180, 10)],
        ];
      } else if (
        layer &&
        group &&
        group.layer &&
        (group.layer.type === 'geojson' || group.layer.type === 'topojson')
      ) {
        const jsonLayer = L.geoJSON(layer.data);
        latlngs = jsonLayer.getBounds();
      } else {
        latlngs = MAP_OPTIONS.defaultBounds;
      }
      mapRef.current.fitBounds(latlngs, {
        paddingBottomRight: [0, 40],
      });
    }
  }, [zoomToBounds]);

  return (
    <Styled>
      <LeafletContainer id="ll-map" />
      {group && <Settings group={group} fullscreen={fullscreen} />}
      <Attribution navFeedback={() => onNavPage(PAGES.feedback.path)} />
      {(tilesLoading || loading) && (
        <LoadingWrap>
          <LoadingIndicator />
        </LoadingWrap>
      )}
      <MapControls position="left">
        <MapControl
          disabled={MAP_OPTIONS.maxZoom === zoom}
          icon={
            <Plus color={MAP_OPTIONS.maxZoom === zoom ? 'dark-4' : 'black'} />
          }
          onClick={() => setZoom(zoom + 1)}
        />
        <MapControl
          disabled={MAP_OPTIONS.minZoom === zoom}
          icon={
            <Minus color={MAP_OPTIONS.minZoom === zoom ? 'dark-4' : 'black'} />
          }
          onClick={() => setZoom(zoom - 1)}
        />
      </MapControls>
    </Styled>
  );
}

Map.propTypes = {
  layers: PropTypes.object,
  group: PropTypes.object,
  fullscreen: PropTypes.bool,
  onLoadLayer: PropTypes.func,
  onNavPage: PropTypes.func,
  basemap: PropTypes.string,
  opacity: PropTypes.number,
  country: PropTypes.bool,
  zoomToBounds: PropTypes.bool,
  loading: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  layers: state => selectLayers(state),
  opacity: state => selectOpacity(state),
  basemap: state => selectBasemap(state),
  country: state => selectCountry(state),
  zoomToBounds: state => selectZoomToBounds(state),
  loading: state => selectLayersLoading(state),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadLayer: (key, config) => {
      dispatch(loadLayer(key, config));
    },
    onNavPage: id => dispatch(navigatePage(id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Map);
