/**
 * The global state selectors
 */
import { createSelector } from 'reselect';
import { DEFAULT_LOCALE, appLocales } from 'i18n';

import { biomesForRealm, groupsForBiome, groupsForBiomes } from 'utils/store';
import { startsWith } from 'utils/string';

import { initialState } from './reducer';

const selectGlobal = state => (state && state.global) || initialState;

const selectRouter = state => state && state.router;

export const selectRouterLocation = createSelector(
  selectRouter,
  routerState => routerState && routerState.location,
);
export const selectRouterSearchParams = createSelector(
  selectRouterLocation,
  location => location && new URLSearchParams(location.search),
);
export const selectRouterPath = createSelector(
  selectRouterLocation,
  location => location && location.pathname,
);

export const selectGroupsQueryArgs = createSelector(
  selectRouterSearchParams,
  search => ({
    area: search.has('area') ? search.get('area') : '',
    occurrence: search.has('occurrence') ? search.get('occurrence') : '',
    realm: search.has('realm') ? search.get('realm') : '',
    biome: search.has('biome') ? search.get('biome') : '',
  }),
);

export const selectRouterPathNamed = createSelector(
  selectRouterLocation,
  location => {
    if (!location || !location.pathname) return false;
    const path = startsWith(location.pathname, '/')
      ? location.pathname.substr(1)
      : location.pathname;
    const [route, level, id] = path.split('/');
    return { route, level, id };
  },
);

/**
 * Get the language locale
 */
export const selectLocale = createSelector(
  selectRouterPath,
  path => {
    if (path) {
      const splitPath = path.split('/');
      return splitPath.length > 1 && appLocales.indexOf(splitPath[1]) >= 0
        ? splitPath[1]
        : DEFAULT_LOCALE;
    }
    return DEFAULT_LOCALE;
  },
);

export const selectFullscreenImage = createSelector(
  selectGlobal,
  global => global.fullscreenImage,
);
export const selectTypology = createSelector(
  selectGlobal,
  global => global.typologyConfig,
);
export const selectTypologyByKey = createSelector(
  (state, key) => key,
  selectTypology,
  (key, data) => data[key],
);
export const selectRealms = createSelector(
  state => selectTypologyByKey(state, 'realms'),
  data => data,
);
export const selectBiomes = createSelector(
  state => selectTypologyByKey(state, 'biomes'),
  data => data,
);
export const selectGroups = createSelector(
  state => selectTypologyByKey(state, 'groups'),
  data => data,
);
export const selectRealm = createSelector(
  (state, id) => id,
  selectRealms,
  (id, data) => data && data.find(d => d.id === id),
);
export const selectBiome = createSelector(
  (state, id) => id,
  selectBiomes,
  (id, data) => data && data.find(d => d.id === id),
);
export const selectRealmForBiome = createSelector(
  selectBiome,
  selectRealms,
  (biome, data) => biome && data && data.find(d => d.id === biome.realm),
);
export const selectGroup = createSelector(
  (state, id) => id,
  selectGroups,
  (id, data) => data && data.find(d => d.id === id),
);

export const selectRealmsWithStats = createSelector(
  selectRealms,
  selectBiomes,
  selectGroups,
  (realms, biomes, groups) => {
    if (!realms) return null;
    return realms
      .map(r => {
        const rbiomes = biomesForRealm(biomes, r.id);
        const rgroups = groupsForBiomes(groups, rbiomes);
        return {
          ...r,
          biomeNo: rbiomes && rbiomes.length,
          groupNo: rgroups && rgroups.length,
        };
      })
      .sort((a, b) => {
        if (a.type === b.type) {
          return a.biomeNo > b.biomeNo ? -1 : 1;
        }
        if (a.type === 'core') return -1;
        return 1;
      });
  },
);
export const selectBiomesForRealmWithStats = createSelector(
  (state, realmId) => realmId,
  selectBiomes,
  selectGroups,
  (realmId, biomes, groups) => {
    if (!biomes) return null;
    return biomesForRealm(biomes, realmId).map(b => {
      const bgroups = groupsForBiome(groups, b.id);
      return {
        ...b,
        groupNo: bgroups && bgroups.length,
      };
    });
  },
);
export const selectGroupsForBiome = createSelector(
  (state, biomeId) => biomeId,
  selectGroups,
  (biomeId, groups) => {
    if (!groups) return null;
    return groupsForBiome(groups, biomeId);
  },
);

const selectTypologyRequested = createSelector(
  selectGlobal,
  global => global.typologyConfigRequested,
);
export const selectTypologyRequestedByKey = createSelector(
  (state, key) => key,
  selectTypologyRequested,
  (key, data) => data[key],
);

const selectTypologyReady = createSelector(
  selectGlobal,
  global => global.typologyConfigReady,
);
export const selectTypologyReadyByKey = createSelector(
  (state, key) => key,
  selectTypologyReady,
  (key, data) => data[key],
);

export const selectContent = createSelector(
  selectGlobal,
  global => global.content,
);
const selectContentByType = createSelector(
  (state, { contentType }) => contentType,
  selectContent,
  (type, content) => content[type],
);
export const selectContentByKey = createSelector(
  (state, { key }) => key,
  selectLocale,
  selectContentByType,
  (key, locale, content) => content[key] && content[key][locale],
);

export const selectContentReady = createSelector(
  selectGlobal,
  global => global.contentReady,
);
const selectContentReadyByType = createSelector(
  (state, { contentType }) => contentType,
  selectContentReady,
  (type, content) => content[type],
);
export const selectContentReadyByKey = createSelector(
  (state, { contentType }) => contentType,
  selectLocale,
  selectContentReadyByType,
  (key, locale, content) => content[key] && content[key][locale],
);

export const selectContentRequested = createSelector(
  selectGlobal,
  global => global.contentReady,
);
const selectContentRequestedByType = createSelector(
  (state, { contentType }) => contentType,
  selectContentRequested,
  (type, content) => content[type],
);
export const selectContentRequestedByKey = createSelector(
  (state, { key }) => key,
  selectLocale,
  selectContentRequestedByType,
  (key, locale, content) => content[key] && content[key][locale],
);

export const selectShowDisclaimer = createSelector(
  selectGlobal,
  global => global.showDisclaimer,
);

export const selectGroupsByArea = createSelector(
  selectGlobal,
  global => global.groupsByArea,
);
export const selectGroupsByAreaArgs = createSelector(
  selectGroupsByArea,
  data => data && data.args,
);
export const selectGroupsByAreaAll = createSelector(
  selectGroupsByArea,
  selectGroups,
  (data, groups) => {
    let rGroups = [];
    let vGroups = [];
    if (groups && data.groups.raster) {
      rGroups = data.groups.raster.map(d =>
        groups.find(g => g.id === d.layer_id),
      );
    }
    if (groups && data.groups.vector) {
      vGroups = data.groups.vector.map(d =>
        groups.find(g => g.id === d.layer_id),
      );
    }
    return [...vGroups, ...rGroups];
  },
);
export const selectGroupsByAreaFiltered = createSelector(
  (state, args) => args,
  selectGroupsByAreaAll,
  selectBiomes,
  (args, groups, biomes) => {
    const { realm, biome } = args;
    return groups.filter(g => {
      if (biome && g.biome !== biome) {
        return false;
      }
      const theBiome = g.biome && biomes && biomes.find(b => b.id === g.biome);
      if (realm && theBiome.realm !== realm) {
        return false;
      }
      return true;
    });
  },
);

const selectGroupsQueried = createSelector(
  selectGlobal,
  global => global.groupsByAreaQueried,
);
export const selectGroupsQueriedByType = createSelector(
  (state, layerType) => layerType,
  selectGroupsQueried,
  (layerType, data) => data.groups[layerType],
);
export const selectGroupsQueriedAny = createSelector(
  selectGroupsQueried,
  data => data && data.groups && (!!data.groups.raster || !!data.groups.vector),
);

const selectGroupsQueryReady = createSelector(
  selectGlobal,
  global => global.groupsByAreaReady,
);
export const selectGroupsQueryReadyByType = createSelector(
  (state, layerType) => layerType,
  selectGroupsQueryReady,
  (layerType, data) => data.groups[layerType],
);
export const selectGroupsQueryReadyAny = createSelector(
  selectGroupsQueryReady,
  data => data && data.groups && (!!data.groups.raster || !!data.groups.vector),
);
export const selectGroupsQueryReadyAll = createSelector(
  selectGroupsQueryReady,
  data => data && data.groups && !!data.groups.raster && !!data.groups.vector,
);
