/*
 * ExploreRealm Messages
 *
 * This contains all the text for the ExploreRealm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.ExploreRealm';

export default defineMessages({
  metaTitle: {
    id: `${scope}.metaTitle`,
    defaultMessage: 'Realm: {realm}',
  },
  relatedHintTrans: {
    id: `${scope}.relatedHintTrans`,
    defaultMessage: 'See the {count} transitional realms for related biomes',
  },
  relatedHintCore: {
    id: `${scope}.relatedHintCore`,
    defaultMessage: 'See the {count} core realms for related biomes',
  },
});
