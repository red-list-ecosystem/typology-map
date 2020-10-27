/*
 * RouteExplore Messages
 *
 * This contains all the text for the RouteExplore container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Tooltip';

export default defineMessages({
  occurrenceIntro: {
    id: `${scope}.occurrenceIntro`,
    defaultMessage:
      'Distribution areas of ecosystem functional groups have been classified as major or minor occurrences',
  },
  occurrence_major: {
    id: `${scope}.occurrence_major`,
    defaultMessage:
      'Major occurrences are areas where an ecosystem functional group is the dominant group',
  },
  occurrence_minor: {
    id: `${scope}.occurrence_minor`,
    defaultMessage:
      'Minor occurrences are areas where an ecosystem functional group is scattered in patches within matrices of other ecosystem functional groups or where they occur in substantial areas but only within a segment of a larger region',
  },
});
