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

export const LOAD_TYPOLOGY = 'rle/App/LOAD_TYPOLOGY';
export const TYPOLOGY_REQUESTED = 'rle/App/LOAD_TYPOLOGY_REQUESTED';
export const TYPOLOGY_LOAD_ERROR = 'rle/App/LOAD_TYPOLOGY_ERROR';
export const TYPOLOGY_LOAD_SUCCESS = 'rle/App/LOAD_TYPOLOGY_SUCCESS';
export const TYPOLOGY_READY = 'rle/App/TYPOLOGY_READY';
