/*
 * Map Messages
 *
 * This contains all the text for the Map container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Map';

export default defineMessages({
  settingOpacity: {
    id: `${scope}.settingOpacity`,
    defaultMessage: 'Layer Opacity',
  },
  settingCountries: {
    id: `${scope}.settingCountries`,
    defaultMessage: 'Countries',
  },
  settingCountriesShow: {
    id: `${scope}.settingCountriesShow`,
    defaultMessage: 'Show on map',
  },
  settingZoomToBounds: {
    id: `${scope}.settingZoomToBounds`,
    defaultMessage: 'Zoom to layer',
  },
  settingZoomToBoundsEnabled: {
    id: `${scope}.settingZoomToBoundsEnabled`,
    defaultMessage: 'Enabled',
  },
  settingBasemap: {
    id: `${scope}.settingBasemap`,
    defaultMessage: 'Satellite',
  },
  settingOn: {
    id: `${scope}.settingOn`,
    defaultMessage: 'On',
  },
  settingOff: {
    id: `${scope}.settingOff`,
    defaultMessage: 'Off',
  },
  settingsShow: {
    id: `${scope}.settingsShow`,
    defaultMessage: 'Show settings',
  },
  settingsHide: {
    id: `${scope}.settingsHide`,
    defaultMessage: 'Hide settings',
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
});
