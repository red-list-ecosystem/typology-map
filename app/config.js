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

export const MAPBOX = {
  TOKEN: 'pk.eyJ1IjoidG1mcm56IiwiYSI6IkRNZURKUHcifQ._ljgPcF75Yig1Of8adL93A',
  USER: 'tmfrnz',
  BASEMAP_STYLES: {
    light: 'ckae0r0to0say1ir3a13wvscu',
  },
};
