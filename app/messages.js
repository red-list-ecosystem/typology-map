/*
 * Common Messages
 *
 * This contains all the common text
 */
import { defineMessages } from 'react-intl';

export const scope = 'rle.common';

export default defineMessages({
  app: {
    title: {
      id: `${scope}.app.title`,
      defaultMessage: 'Global Ecosystem Typology',
    },
  },
  typology: {
    realm: {
      id: `${scope}.typology.realm`,
      defaultMessage: 'Realm',
    },
    realms: {
      id: `${scope}.typology.realms`,
      defaultMessage: 'Realms',
    },
    biome: {
      id: `${scope}.typology.biome`,
      defaultMessage: 'Biome',
    },
    biomes: {
      id: `${scope}.typology.biomes`,
      defaultMessage: 'Biomes',
    },
    group: {
      id: `${scope}.typology.group`,
      defaultMessage: 'Functional group',
    },
    'group-short': {
      id: `${scope}.typology.group-short`,
      defaultMessage: 'Group',
    },
    'group-long': {
      id: `${scope}.typology.group-long`,
      defaultMessage: 'Ecosystem functional group',
    },
    groups: {
      id: `${scope}.typology.group`,
      defaultMessage: 'Functional groups',
    },
    'groups-short': {
      id: `${scope}.typology.group-short`,
      defaultMessage: 'Groups',
    },
    'groups-long': {
      id: `${scope}.typology.group-long`,
      defaultMessage: 'Ecosystem functional groups',
    },
    'core-realms': {
      id: `${scope}.typology.core-realms`,
      defaultMessage: 'Core realms',
    },
    'trans-realms': {
      id: `${scope}.typology.trans-realms`,
      defaultMessage: 'Transitionals realms',
    },
  },
  components: {
    explore: {
      id: `${scope}.components.explore`,
      defaultMessage: 'Explore',
    },
  },
  pages: {
    typology: {
      id: `${scope}.pages.typology`,
      defaultMessage: 'Typology',
    },
    about: {
      id: `${scope}.pages.about`,
      defaultMessage: 'About',
    },
    methods: {
      id: `${scope}.pages.methods`,
      defaultMessage: 'Methods',
    },
    glossary: {
      id: `${scope}.pages.glossary`,
      defaultMessage: 'Glossary',
    },
  },
});
