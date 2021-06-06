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
  drawError: {
    id: `${scope}.drawError`,
    defaultMessage: 'Edges cannot intersect',
  },
  drawToolbarPolygon: {
    id: `${scope}.drawToolbarPolygon`,
    defaultMessage: 'Draw a polygon',
  },
  drawToolbarReactangle: {
    id: `${scope}.drawToolbarReactangle`,
    defaultMessage: 'Draw a rectangle',
  },
  drawToolbarEdit: {
    id: `${scope}.drawToolbarEdit`,
    defaultMessage: 'Update area',
  },
  drawToolbarRemove: {
    id: `${scope}.drawToolbarRemove`,
    defaultMessage: 'Delete area',
  },
  drawTooltipEdit: {
    id: `${scope}.drawTooltipEdit`,
    defaultMessage: "Drag handles to edit, then 'Save' to update area",
  },
  drawTooltipEditSub: {
    id: `${scope}.drawTooltipEditSub`,
    defaultMessage: "Click 'Cancel' to undo changes",
  },
  drawTooltipRemove: {
    id: `${scope}.drawTooltipRemove`,
    defaultMessage: "Click on area, then 'Save' to delete area",
  },
  drawTooltipRectangleStart: {
    id: `${scope}.drawTooltipRectangleStart`,
    defaultMessage: 'Click and drag to draw rectangular area',
  },
  drawTooltipRectangleEnd: {
    id: `${scope}.drawTooltipRectangleEnd`,
    defaultMessage: 'Release mouse to finish drawing',
  },
  drawTooltipPolygonStart: {
    id: `${scope}.drawTooltipPolygonStart`,
    defaultMessage: 'Click to start drawing polygon',
  },
  drawTooltipPolygonCont: {
    id: `${scope}.drawTooltipPolygonCont`,
    defaultMessage: 'Click to continue drawing polygon',
  },
  drawTooltipPolygonEnd: {
    id: `${scope}.drawTooltipPolygonEnd`,
    defaultMessage: 'Click to add points or click first point to close area',
  },
});
