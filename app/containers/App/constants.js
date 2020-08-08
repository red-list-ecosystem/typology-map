/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const NAVIGATE = 'rle/App/NAVIGATE';
export const CHANGE_LOCALE = 'app/App/CHANGE_LOCALE';

export const LOAD_TYPOLOGY = 'rle/App/LOAD_TYPOLOGY';
export const TYPOLOGY_REQUESTED = 'rle/App/TYPOLOGY_REQUESTED';
export const TYPOLOGY_LOAD_ERROR = 'rle/App/TYPOLOGY_LOAD_ERROR';
export const TYPOLOGY_LOAD_SUCCESS = 'rle/App/TYPOLOGY_LOAD_SUCCESS';
export const TYPOLOGY_READY = 'rle/App/TYPOLOGY_READY';

export const QUERY_GROUPS = 'rle/App/QUERY_GROUPS';
export const GROUPS_QUERIED = 'rle/App/GROUPS_QUERIED';
export const GROUPS_QUERY_ERROR = 'rle/App/GROUPS_QUERY_ERROR';
export const GROUPS_QUERY_SUCCESS = 'rle/App/GROUPS_QUERY_SUCCESS';
export const GROUPS_QUERY_READY = 'rle/App/GROUPS_QUERY_READY';
export const UPDATE_GROUPS_QUERY = 'rle/App/UPDATE_GROUPS_QUERY';
export const RESET_GROUPS_QUERY = 'rle/App/RESET_GROUPS_QUERY';
export const RESET_GROUPS_QUERY_NAV = 'rle/App/RESET_GROUPS_QUERY_NAV';

export const LOAD_CONTENT = 'rle/App/LOAD_CONTENT';
export const CONTENT_REQUESTED = 'rle/App/CONTENT_REQUESTED';
export const CONTENT_LOAD_ERROR = 'rle/App/CONTENT_LOAD_ERROR';
export const CONTENT_LOAD_SUCCESS = 'rle/App/CONTENT_LOAD_SUCCESS';
export const CONTENT_READY = 'rle/App/CONTENT_READY';

export const DISMISS_DISCLAIMER = 'rle/App/DISMISS_DISCLAIMER';
export const SET_FULLSCREEN_IMAGE = 'rle/App/SET_FULLSCREEN_IMAGE';

export const PRIMARY = 1;
export const SECONDARY = 2;
export const FOOTER = 3;
