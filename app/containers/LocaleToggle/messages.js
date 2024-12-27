/*
 * LocaleToggle Messages
 *
 * This contains all the text for the LanguageToggle component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.LocaleToggle';

export default defineMessages({
  en: {
    id: `${scope}.en`,
    defaultMessage: 'en',
  },
  enLong: {
    id: `${scope}.enLong`,
    defaultMessage: 'English',
  },
  esLong: {
    id: `${scope}.esLong`,
    defaultMessage: 'Spanish',
  },
  languageTitle: {
    id: `${scope}.languageTitle`,
    defaultMessage: 'Choose language',
  },
});
