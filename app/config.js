import ICON_T from 'images/t.svg';
import ICON_M from 'images/m.svg';
import ICON_F from 'images/f.svg';
import ICON_S from 'images/s.svg';
import ICON_TYPOLOGY from 'images/typology.svg';
import ICON_X from 'images/explore.svg';
import ICON_X0 from 'images/explore_0.svg';
import ICON_X1 from 'images/explore_1.svg';
import ICON_X2 from 'images/explore_2.svg';
import ICON_LOGO from 'images/logo_RLE_icon.svg';
import ICON_CLOSE from 'images/icon_close.svg';
import ICON_FS_CONTRACT from 'images/icon_fullscreen-contract.svg';
import ICON_FS_EXPAND from 'images/icon_fullscreen-expand.svg';
import ICON_INFO from 'images/icon_info.svg';
import ICON_LAYERS from 'images/icon_layers.svg';
import ICON_MENU from 'images/icon_menu.svg';
import ICON_MINUS from 'images/icon_minus.svg';
import ICON_PLUS from 'images/icon_plus.svg';
import ICON_SEARCH from 'images/icon_search.svg';
import LOGO_0 from 'images/logo_RLE.png';
import LOGO_1 from 'images/logo_IUCN.jpg';
import LOGO_2 from 'images/logo_CEM.jpg';
import LOGO_3 from 'images/logo_CES.png';
import LOGO_4 from 'images/logo_UNSW.png';

import { PRIMARY, SECONDARY, FOOTER } from 'containers/App/constants';

export const ROUTES = {
  HOME: '',
  EXPLORE: 'explore',
  ANALYSE: 'analyse',
  PAGE: 'page',
};

export const PATHS = {
  DATA: 'https://red-list-ecosystem.github.io/typology-map-data/data',
  CONTENT: 'https://red-list-ecosystem.github.io/typology-map-content',
  IMAGES:
    'https://red-list-ecosystem.github.io/typology-map-content/assets/uploads',
};

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
  privacy: {
    path: 'privacy',
    nav: FOOTER,
    backgroundImage: 'bg_home',
  },
};

export const MAX_LOAD_ATTEMPTS = 5;

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
  RASTER: {
    tileSize: 256,
    noWrap: false,
  },
};

export const MAPBOX = {
  TOKEN: 'pk.eyJ1IjoidG1mcm56IiwiYSI6IkRNZURKUHcifQ._ljgPcF75Yig1Of8adL93A',
  USER: 'tmfrnz',
  BASEMAP_STYLES: {
    light: 'ckae0r0to0say1ir3a13wvscu',
    satellite: 'ckacdj3yp5pmb1iqky0khmlc8',
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
    style: 'ckapdq83917dj1imw9jtqtjte',
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
  EXPLORE_0: ICON_X0,
  EXPLORE_1: ICON_X1,
  EXPLORE_2: ICON_X2,
  LOGO: ICON_LOGO,
  contract: ICON_FS_CONTRACT,
  expand: ICON_FS_EXPAND,
  layers: ICON_LAYERS,
  info: ICON_INFO,
  menu: ICON_MENU,
  plus: ICON_PLUS,
  minus: ICON_MINUS,
  search: ICON_SEARCH,
  close: ICON_CLOSE,
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
