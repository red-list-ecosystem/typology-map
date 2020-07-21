/*
 * Header Messages
 *
 * This contains all the text for the Header container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.Search';

export default defineMessages({
  search: {
    id: `${scope}.search`,
    defaultMessage: 'Search',
  },
  noResults: {
    id: `${scope}.noResults`,
    defaultMessage: 'We are sorry! Your search did not return any results.',
  },
  placeholder: {
    id: `${scope}.placeholder`,
    defaultMessage: 'Search typology by name or id',
  },
  resultHint: {
    id: `${scope}.resultHint`,
    defaultMessage: 'Search typology by name or id',
  },
});
