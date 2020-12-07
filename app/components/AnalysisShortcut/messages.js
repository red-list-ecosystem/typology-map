/*
 * ExploreRealm Messages
 *
 * This contains all the text for the ExploreRealm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AnalysisShortcut';

export default defineMessages({
  header_realm: {
    id: `${scope}.header_realm`,
    defaultMessage: 'Analyse {name} realm by area',
  },
  text_realm: {
    id: `${scope}.text_realm`,
    defaultMessage: "Identify realm's functional groups by area",
  },
  header_biome: {
    id: `${scope}.header_biome`,
    defaultMessage: 'Analyse {name} biome by area',
  },
  text_biome: {
    id: `${scope}.text_biome`,
    defaultMessage: "Identify biome's functional groups by area",
  },
  header_group: {
    id: `${scope}.header_group`,
    defaultMessage: 'Analyse biome of {name} by area',
  },
  text_group: {
    id: `${scope}.text_group`,
    defaultMessage: 'Identify other functional groups of same biome by area',
  },
  button: {
    id: `${scope}.button`,
    defaultMessage: 'Analyse by area',
  },
});
