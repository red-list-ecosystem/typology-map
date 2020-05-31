/*
 * RouteExploreOverview Messages
 *
 * This contains all the text for the RouteExploreOverview container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RouteExploreOverview';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Explore the global ecosystem typology',
  },
  teaser: {
    id: `${scope}.teaser`,
    defaultMessage:
      'Start by selecting a Realm of interest, then drill down to learn more about its Biomes and Ecosystem Functional Groups',
  },
  descriptionMeta: {
    id: `${scope}.descriptionMeta`,
    defaultMessage: 'Explore the global ecosystem typology',
  },
});
