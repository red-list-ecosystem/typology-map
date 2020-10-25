/*
 * RouteExplore Messages
 *
 * This contains all the text for the RouteExplore container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RouteAnalyse';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Functional Groups by Area',
  },
  intro: {
    id: `${scope}.intro`,
    defaultMessage:
      'Retrieve an indicative list of ecosystem functional groups for a given area. ',
  },
  download: {
    id: `${scope}.intro`,
    defaultMessage:
      'For additional analyses you can download the raw data from the {link}.',
  },
  downloadAnchor: {
    id: `${scope}.downloadAnchor`,
    defaultMessage: 'data repository',
  },
  defineArea: {
    id: `${scope}.defineArea`,
    defaultMessage: '1. Define area (required)',
  },
  area: {
    id: `${scope}.area`,
    defaultMessage: 'Area',
  },
  region: {
    id: `${scope}.region`,
    defaultMessage: 'Region',
  },
  customArea: {
    id: `${scope}.customArea`,
    defaultMessage: 'Custom area',
  },
  predefinedRegion: {
    id: `${scope}.predefinedRegion`,
    defaultMessage: 'Predefined region',
  },
  areaChange: {
    id: `${scope}.areaChange`,
    defaultMessage: 'Change area',
  },
  defineAreaInstructions: {
    id: `${scope}.defineAreaInstructions`,
    defaultMessage: 'Draw an area on the map or enter area coordinates',
  },
  selectRegionInstructions: {
    id: `${scope}.selectRegionInstructions`,
    defaultMessage: 'Select a region on the map or from the dropdown',
  },
  defineAreaFieldLabel: {
    id: `${scope}.defineAreaFieldLabel`,
    defaultMessage: 'Area coordinates',
  },
  selectRegionFieldLabel: {
    id: `${scope}.selectRegionFieldLabel`,
    defaultMessage: 'Select region',
  },
  selectRegionFieldPlaceholder: {
    id: `${scope}.selectRegionFieldPlaceholder`,
    defaultMessage: 'Select region',
  },
  defineAreaFieldPlaceholder: {
    id: `${scope}.defineAreaFieldPlaceholder`,
    defaultMessage: 'Format: lon1 lat1,lon2 lat2,...',
  },
  defineAreaFieldFormatHelp: {
    id: `${scope}.defineAreaFieldFormatHelp`,
    defaultMessage:
      "A comma-separated list of points, each consisting of two space-separated values in decimal degrees where the first value represents the point's latitude and the second value its longitude (format: 'lon1 lat1,lon2 lat2,[...],lon3 lat3'). Note that the last point must equal the first point to 'close' the resulting shape.",
  },
  addFilters: {
    id: `${scope}.addFilters`,
    defaultMessage: '2. Add filters (optional)',
  },
  filters: {
    id: `${scope}.filters`,
    defaultMessage: 'Filters',
  },
  filtersChange: {
    id: `${scope}.filtersChange`,
    defaultMessage: 'Change filters',
  },
  filtersAdd: {
    id: `${scope}.filtersAdd`,
    defaultMessage: 'Add filters',
  },
  noFilters: {
    id: `${scope}.noFilters`,
    defaultMessage: 'No filters currently set',
  },
  addFiltersByRealmLabel: {
    id: `${scope}.addFiltersByRealmLabel`,
    defaultMessage: 'Filter by Realm',
  },
  addFiltersByRealmPlaceholder: {
    id: `${scope}.addFiltersByRealmPlaceholder`,
    defaultMessage: 'Select Realm',
  },
  addFiltersByBiomeLabel: {
    id: `${scope}.addFiltersByBiomeLabel`,
    defaultMessage: 'Filter by Biome',
  },
  addFiltersByBiomePlaceholder: {
    id: `${scope}.addFiltersByBiomePlaceholder`,
    defaultMessage: 'Select Biome',
  },
  addFiltersByOccurrenceLabel: {
    id: `${scope}.addFiltersByOccurrenceLabel`,
    defaultMessage: 'Filter by Occurrence',
  },
  submitQuery: {
    id: `${scope}.submitQuery`,
    defaultMessage: '3. Retrieve Functional Groups',
  },
  submitQueryNoAreaHint: {
    id: `${scope}.submitQueryNoAreaHint`,
    defaultMessage: 'Query requires defining a closed area',
  },
  submitQueryNoRegionHint: {
    id: `${scope}.submitQueryNoRegionHint`,
    defaultMessage: 'Query requires selecting a region',
  },
  submitQueryLabel: {
    id: `${scope}.submitQueryLabel`,
    defaultMessage: 'Submit query',
  },
  resetQueryLabel: {
    id: `${scope}.resetQueryLabel`,
    defaultMessage: 'Reset query',
  },
  cancelQueryLabel: {
    id: `${scope}.cancelQueryLabel`,
    defaultMessage: 'Cancel query',
  },
  updateQueryLabel: {
    id: `${scope}.updateQueryLabel`,
    defaultMessage: 'Update query',
  },
  queryResults: {
    id: `${scope}.queryResults`,
    defaultMessage: 'Query results',
  },
  cancel: {
    id: `${scope}.cancel`,
    defaultMessage: 'Cancel',
  },
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage:
      'We are sorry, but your query produced no results. Please try again with a different area or different filter settings',
  },
  awaitResults: {
    id: `${scope}.awaitResults`,
    defaultMessage:
      'Retrieving list of ecosystem groups... Especially for large areas this may take a while.',
  },
  hintResultsRegion: {
    id: `${scope}.hintResultsRegion`,
    defaultMessage:
      'Note that the retrieved list is intended to be indicative only. Further note that the area calculation is still experimental and has some limitations. ',
  },
  hintResultsArea: {
    id: `${scope}.hintResultsArea`,
    defaultMessage:
      'Note that the retrieved list is intended to be indicative only. ',
  },
});
