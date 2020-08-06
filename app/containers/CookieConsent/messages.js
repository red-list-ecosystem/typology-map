/*
 * CC Messages
 *
 * This contains all the text for the CC container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'rle.containers.CookieConsent';

export default defineMessages({
  title: {
    id: `${scope}.title`,
    defaultMessage: 'Cookie preference & privacy',
  },
  info: {
    id: `${scope}.info`,
    defaultMessage:
      'By using this Website you agree to store some of your Personal Data where it is essential for the Website to function. In addition, you can enable non-essential third-party services that may store Cookies and Usage Data',
  },
  buttonAccept: {
    id: `${scope}.buttonAccept`,
    defaultMessage: 'Allow third-party services',
  },
  buttonReject: {
    id: `${scope}.buttonReject`,
    defaultMessage: 'Decline',
  },
  linkPrivacyPolicy: {
    id: `${scope}.linkPrivacyPolicy`,
    defaultMessage: 'Our privacy policy',
  },
  linkDialogue: {
    id: `${scope}.linkDialogue`,
    defaultMessage: 'Privacy Settings',
  },
});
