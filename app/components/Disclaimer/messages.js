/*
 * Disclaimer Messages
 *
 * This contains all the text for the Disclaimer component.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.components.Disclaimer';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Global Ecosystem Typology under development',
  },
  disclaimer: {
    id: `${scope}.disclaimer`,
    defaultMessage:
      'Please note that the content and functionality of this site are still under development. ',
  },
  dismiss: {
    id: `${scope}.dismiss`,
    defaultMessage: 'Got it!',
  },
  more: {
    id: `${scope}.more`,
    defaultMessage: 'Read more about upcoming updates',
  },
});
