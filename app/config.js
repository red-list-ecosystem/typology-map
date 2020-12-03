import ICON_T from 'images/t.svg';
import ICON_M from 'images/m.svg';
import ICON_F from 'images/f.svg';
import ICON_S from 'images/s.svg';
import ICON_TYPOLOGY from 'images/typology.svg';
import ICON_X from 'images/explore.svg';
import ICON_ANALYSIS from 'images/analysis.svg';
import ICON_LOGO from 'images/logo_RLE_icon.svg';
import LOGO_0 from 'images/logo_RLE.png';
import LOGO_1 from 'images/logo_IUCN.jpg';
import LOGO_2 from 'images/logo_CEM.jpg';
import LOGO_3 from 'images/logo_CES.png';
import LOGO_4 from 'images/logo_UNSW.png';

import { colors } from 'theme';

import { PRIMARY, SECONDARY, FOOTER } from 'containers/App/constants';

export const ROUTES = {
  HOME: '',
  EXPLORE: 'explore',
  ANALYSE: 'analyse',
  PAGE: 'page',
};

export const PATHS = {
  DATA_DOWNLOAD: 'https://doi.org/10.5281/zenodo.3546513',
  DATA: 'https://red-list-ecosystem.github.io/typology-map-data/data',
  CONTENT: 'https://red-list-ecosystem.github.io/typology-map-content',
  IMAGES:
    'https://red-list-ecosystem.github.io/typology-map-content/assets/uploads',
  GROUPS_QUERY_API: {
    areasbyregion:
      'https://psiqp2ecjf.execute-api.ap-southeast-2.amazonaws.com/default/rle_areasbyregion_api',
    vector:
      'https://v1mnzwc793.execute-api.ap-southeast-2.amazonaws.com/default/rle_intersects_vectors_api',
    raster:
      'https://4rl7fsjrfk.execute-api.ap-southeast-2.amazonaws.com/default/rle_intersects_raster_api',
  },
};

export const MAX_LOAD_ATTEMPTS = 5;
export const MAX_LOAD_ATTEMPTS_GROUPS = 2;

export const TYPOLOGY = {
  realms: {
    path: 'config/realms.json',
    contentPath: 'realms',
  },
  biomes: {
    path: 'config/biomes.json',
    contentPath: 'biomes',
  },
  groups: {
    path: 'config/groups.json',
    contentPath: 'groups',
  },
};

export const PAGES = {
  typology: {
    path: 'typology',
    nav: PRIMARY,
    icon: ICON_TYPOLOGY,
    backgroundImage: 'bg_home',
  },
  about: {
    path: 'about',
    nav: SECONDARY,
    backgroundImage: 'bg_home',
    partners: 'true',
  },
  methods: {
    path: 'methods',
    nav: SECONDARY,
    backgroundImage: 'bg_home',
  },
  glossary: {
    path: 'glossary',
    nav: SECONDARY,
    backgroundImage: 'bg_home',
  },
  feedback: {
    path: 'feedback',
    nav: SECONDARY,
    backgroundImage: 'bg_home',
    needsConsent: 'true',
  },
  terms: {
    path: 'terms',
    nav: FOOTER,
    backgroundImage: 'bg_home',
  },
  privacy: {
    path: 'privacy',
    nav: FOOTER,
    backgroundImage: 'bg_home',
  },
};

export const GROUP_LAYER_PROPERTIES = {
  OCCURRENCE: {
    1: {
      id: 'major',
      // color: '#C10F02', // dark red
      color: 'rgb(193, 15, 2)', // dark red
    },
    2: {
      id: 'minor',
      // color: '#F79D96', // light red
      color: 'rgb(247, 157, 150)',
    },
  },
};

// leaflet path options
// https://leafletjs.com/reference-1.6.0.html#path-option
export const GROUP_LAYER_OPTIONS = {
  opacity: 0.8,
  VECTOR: {
    area: {
      stroke: false,
      weight: 0,
      fill: true,
      fillOpacity: 1,
    },
    line: {
      stroke: true,
      weight: 1.5,
    },
  },
  'VECTOR-AUX': {
    stroke: true,
    weight: 0.5,
    fill: true,
    fillOpacity: 0.01,
    color: colors['brand-2-light'],
    fillColor: 'white',
    opacity: 1,
  },
  RASTER: {
    tileSize: 256,
    noWrap: false,
  },
};

export const QUERY_REGIONS_LAYER = {
  key: 'query-regions',
  source: 'github',
  type: 'topojson',
  path: 'auxiliary/eez_wrapped.topo.json',
  featureId: 'OGC_FID',
  featureTitle: 'UNION',
  featureTitleAdditional: 'SOVEREIGN1',
  featureTitleAdditional2: 'SOVEREIGN2',
  style: {
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0,
  },
};

export const MAPBOX = {
  TOKEN:
    'pk.eyJ1IjoianJmZXAiLCJhIjoiY2s5N3RxZWhwMTl5NjNnbjFmdzhubTFjdiJ9.KFBzgxBPjKnERRfR9awR_g',
  USER: 'jrfep',
  BASEMAP_STYLES: {
    light: 'cki644hdi0p9g19o1euw0l3hd',
    satellite: 'cki643k240ixj19rydj6ubdgq',
  },
  RASTER_URL_TEMPLATE:
    'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}@2x.png?access_token={accessToken}',
  STYLE_URL_TEMPLATE:
    'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/256/{z}/{x}/{y}@2x?access_token={accessToken}',
};

export const MAP_OPTIONS = {
  center: [30, 0],
  zoom: 1,
  minZoom: 1,
  maxZoom: 10,
  attributionControl: false,
  zoomControl: false,
  maxBounds: [[-90, -315], [90, 315]],
  defaultBounds: [[85, -180], [-85, 180]],
};

export const GEOJSON = {
  PROPERTIES: {
    OCCURRENCE: 'occurrence',
  },
};

export const LAYERS = {
  countries: {
    source: 'mapbox',
    type: 'style',
    style: 'cki643ylc72no19omqdoqoynt',
  },
};

export const ICONS = {
  T: [ICON_T],
  M: [ICON_M],
  S: [ICON_S],
  F: [ICON_F],
  FM: [ICON_F, ICON_M],
  MFT: [ICON_M, ICON_F, ICON_T],
  MT: [ICON_M, ICON_T],
  SF: [ICON_S, ICON_F],
  SM: [ICON_S, ICON_M],
  TF: [ICON_T, ICON_F],
  EXPLORE: ICON_X,
  ANALYSIS: ICON_ANALYSIS,
  LOGO: ICON_LOGO,
};

export const LOGOS = [
  {
    id: '0',
    src: LOGO_0,
  },
  {
    id: '1',
    src: LOGO_1,
  },
  {
    id: '2',
    src: LOGO_2,
  },
  {
    id: '4',
    src: LOGO_4,
  },
  {
    id: '3',
    src: LOGO_3,
  },
];

export const DIAGRAM_NAME_ENDING = '-diagram.png';
