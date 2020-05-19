/*
 * ExploreRealm Messages
 *
 * This contains all the text for the ExploreRealm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.NavGridChildren';

export default defineMessages({
  biomesTitle: {
    id: `${scope}.biomesTitle`,
    defaultMessage:
      'The {no} {no, select, 1 {biome} other {biomes}} of the {parent} realm',
  },
  biomesInfo: {
    id: `${scope}.biomesInfo`,
    defaultMessage: 'TODO: Some additional info',
  },
  biomesSelect: {
    id: `${scope}.biomesSelect`,
    defaultMessage: 'Select a biome to learn more',
  },
  groupsTitle: {
    id: `${scope}.groupsTitle`,
    defaultMessage:
      'The {no} functional {no, select, 1 {group} other {groups}} of the {parent}',
  },
  groupsInfo: {
    id: `${scope}.groupsInfo`,
    defaultMessage: 'TODO: Some additional info',
  },
  groupsSelect: {
    id: `${scope}.groupsSelect`,
    defaultMessage: 'Select a functional group to learn more',
  },
});
