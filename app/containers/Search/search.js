import { toLower, deburr } from 'lodash/string';

import { regExMultipleWords } from 'utils/string';

export const cleanupSearchTarget = str => toLower(deburr(str));

const filterTaxonomy = (item, search, regex) => {
  if (!search || search.length < 1) return true;
  try {
    return (
      regex.test(item.code) ||
      (search.length > 2 && regex.test(cleanupSearchTarget(item.label)))
    );
  } catch (e) {
    return true;
  }
};

export const prepTaxonomies = (items, search, locale) => {
  const regex = new RegExp(regExMultipleWords(search), 'i');
  return (
    items &&
    items
      .map(item => ({
        code: item.id,
        label: item.title[locale || 'en'],
      }))
      .filter(item => filterTaxonomy(item, search, regex))
  );
};
