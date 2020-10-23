/*
 * Disclaimer Messages
 *
 * This contains all the text for the Disclaimer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.AsideNavTypologyButton';

export default defineMessages({
  area: {
    id: `${scope}.area`,
    defaultMessage: '{type}: {value} {unit}',
  },
  not_available: {
    id: `${scope}.not_available`,
    defaultMessage: 'Area calculation not yet available',
  },
});
