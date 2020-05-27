import { toLower, deburr } from 'lodash/string';

import { regExMultipleWords } from 'utils/string';
/* eslint-disable no-useless-escape */
const invalid = /[°"§%()\[\]{}=\\?´`'#<>|,;.:+_-]+/g;
const sanitise = str => str.replace(invalid, '');
export const cleanupSearchTarget = str => toLower(deburr(sanitise(str)));

const filterTaxonomy = (item, search, regex) => {
  if (!search || search.length < 1) return true;
  try {
    return (
      regex.test(item.code) ||
      (search.length > 1 && regex.test(cleanupSearchTarget(item.label)))
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
      .sort((a, b) => {
        if (a.code.length < b.code.length) return -1;
        if (a.code.length === b.code.length && a.code < b.code) return -1;
        return 1;
      })
  );
};
