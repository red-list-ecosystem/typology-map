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
      'Major occurrences are areas where an ecosystem functional group is very likely to occur',
  },
  occurrence_minor: {
    id: `${scope}.occurrence_minor`,
    defaultMessage:
      'Minor occurrences are areas where an ecosystem functional group is scattered in patches within matrices of other ecosystem functional groups or where they occur in substantial areas but only within a segment of a larger region',
  },
  mapAttribution: {
    id: `${scope}.mapAttribution`,
    defaultMessage: 'Map attribution',
  },
  mapAttributionGroupsTitle: {
    id: `${scope}.mapAttributionGroupsTitle`,
    defaultMessage: 'Functional group data',
  },
  mapAttributionGroupsInfo: {
    id: `${scope}.mapAttributionGroupsInfo`,
    defaultMessage:
      'Compiled by RLE from various sources. See group descriptions for detailed references',
  },
  mapAttributionGroupsLink: {
    id: `${scope}.mapAttributionGroupsLink`,
    defaultMessage: 'Provide feedback',
  },
  mapAttributionBasemapsTitle: {
    id: `${scope}.mapAttributionBasemapsTitle`,
    defaultMessage: 'Basemaps',
  },
  mapAttributionBasemapsInfo: {
    id: `${scope}.mapAttributionBasemapsInfo`,
    defaultMessage: 'Terrain, satellite and country data',
  },
  mapAttributionBasemapsLink: {
    id: `${scope}.mapAttributionBasemapsLink`,
    defaultMessage: 'Improve the basemaps',
  },
  mapAttributionRegionsTitle: {
    id: `${scope}.mapAttributionRegionsTitle`,
    defaultMessage: 'Predefined regions for analysis',
  },
  mapAttributionRegionsInfoADM: {
    id: `${scope}.mapAttributionRegionsInfoADM`,
    defaultMessage:
      'Country boundaries adapted from "World Bank Official Boundaries" (consulted on 2021-05-03)',
  },
  mapAttributionRegionsLinkURLADM: {
    id: `${scope}.mapAttributionRegionsLinkURLADM`,
    defaultMessage:
      'https://datacatalog.worldbank.org/dataset/world-bank-official-boundaries',
  },
  mapAttributionRegionsLinkADM: {
    id: `${scope}.mapAttributionRegionsLinkADM`,
    defaultMessage: 'More info and download',
  },
  mapAttributionRegionsInfoLME: {
    id: `${scope}.mapAttributionRegionsInfoLME`,
    defaultMessage:
      'Marine regions adapted from "Pope, Addy. (2017). Large Marine Ecosystems of the World" (consulted on 2021-05-04)',
  },
  mapAttributionRegionsLinkURLLME: {
    id: `${scope}.mapAttributionRegionsLinkURLLME`,
    defaultMessage: 'https://doi.org/10.7488/ds/1902',
  },
  mapAttributionRegionsLinkLME: {
    id: `${scope}.mapAttributionRegionsLinkLME`,
    defaultMessage: 'More info and download',
  },
});
