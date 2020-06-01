/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.RouteHome';

export default defineMessages({
  introTitle: {
    id: `${scope}.introTitle`,
    defaultMessage: 'A global typology for our ',
  },
  introTitle2: {
    id: `${scope}.introTitle2`,
    defaultMessage: "Earth's ecosystems",
  },
  introParagraph: {
    id: `${scope}.introParagraph`,
    defaultMessage:
      'The new IUCN global ecosystem typology is a comprehensive classification framework for Earth’s ecosystems that integrates their functional and compositional features. This new typology will help identify the ecosystems most critical for biodiversity conservation, research, management and human wellbeing into the future.',
  },
  titleSectionExplore: {
    id: `${scope}.titleSectionExplore`,
    defaultMessage: 'Explore the global ecosystem typology',
  },
  teaserSectionExplore: {
    id: `${scope}.teaserSectionExplore`,
    defaultMessage:
      'Start by selecting a Realm of interest, then drill down to learn more about its Biomes and Ecosystem Functional Groups',
  },
  titleSectionAbout: {
    id: `${scope}.titleSectionAbout`,
    defaultMessage: 'About',
  },
  teaserSectionAbout: {
    id: `${scope}.teaserSectionAbout`,
    defaultMessage:
      'This site is an introduction to the IUCN Global Ecosystem Typology',
  },
  linkAboutMethods: {
    id: `${scope}.linkAboutMethods`,
    defaultMessage: 'Learn more about the methods',
  },
  linkAboutSite: {
    id: `${scope}.linkAboutSite`,
    defaultMessage: 'Learn more about this site',
  },
});
