/*
 * ExploreRealm Messages
 *
 * This contains all the text for the ExploreRealm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavGridChildren';

export default defineMessages({
  biomes: {
    title: {
      id: `${scope}.biomes.title`,
      defaultMessage:
        'The {no} {no, select, 1 {biome} other {biomes}} of the {parent} realm',
    },
    info: {
      id: `${scope}.biomes.info`,
      defaultMessage: 'TODO: Some additional info',
    },
    select: {
      id: `${scope}.biomes.select`,
      defaultMessage: 'Select a biome to learn more',
    },
  },
  groups: {
    title: {
      id: `${scope}.groups.title`,
      defaultMessage:
        'The {no} functional {no, select, 1 {group} other {groups}} of the {parent}',
    },
    info: {
      id: `${scope}.groups.info`,
      defaultMessage: 'TODO: Some additional info',
    },
    select: {
      id: `${scope}.biomes.select`,
      defaultMessage: 'Select a functional group to learn more',
    },
  },
});
