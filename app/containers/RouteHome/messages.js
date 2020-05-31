/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'rle.containers.HomePage';

export default defineMessages({
  introTitle: {
    id: `${scope}.introTitle`,
    defaultMessage: "Explore our Earth's ",
  },
  introTitle2: {
    id: `${scope}.introTitle2`,
    defaultMessage: 'ecosystems',
  },
  introParagraph: {
    id: `${scope}.introParagraph`,
    defaultMessage:
      'The new IUCN global ecosystem typology is a comprehensive classification framework for Earth’s ecosystems that integrates their functional and compositional features. This new typology will help identify the ecosystems most critical for biodiversity conservation, research, management and human wellbeing into the future.',
  },
});
