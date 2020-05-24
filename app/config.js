import { PRIMARY, SECONDARY } from 'containers/App/constants';

export const ROUTES = {
  HOME: '',
  EXPLORE: 'explore',
  ANALYSE: 'analyse',
  PAGE: 'page',
};

export const PATHS = {
  DATA: 'https://red-list-ecosystem.github.io/typology-map-data/data',
  CONTENT: 'https://red-list-ecosystem.github.io/typology-map-content',
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
  },
  about: {
    path: 'about',
    nav: SECONDARY,
  },
  methods: {
    path: 'methods',
    nav: SECONDARY,
  },
  glossary: {
    path: 'glossary',
    nav: SECONDARY,
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
    stroke: false,
    weight: 0,
  },
  RASTER: {
    tileSize: 256,
    noWrap: true,
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
    'https://api.mapbox.com/v4/{id}/{z}/{x}/{y}.png64?access_token={accessToken}',
  STYLE_URL_TEMPLATE:
    'https://api.mapbox.com/styles/v1/{username}/{style_id}/tiles/512/{z}/{x}/{y}?access_token={accessToken}',
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
    style: 'ckal0fn3y245s1jqe8np3kf1i',
  },
};
