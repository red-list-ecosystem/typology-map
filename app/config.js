export const PATHS = {
  DATA: 'https://red-list-ecosystem.github.io/typology-map-data/data',
  CONTENT: 'https://red-list-ecosystem.github.io/typology-map-content',
};

export const TYPOLOGY = {
  realms: {
    path: `${PATHS.DATA}/config/realms.json`,
  },
  biomes: {
    path: `${PATHS.DATA}/config/biomes.json`,
  },
  groups: {
    path: `${PATHS.DATA}/config/groups.json`,
  },
};

export const MAX_LOAD_ATTEMPTS = 5;
