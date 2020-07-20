/**
 *
 * Asynchronously loads the component for ExploreGroup
 *
 */

import React from 'react';
import loadable from 'utils/loadable';
import FallbackExplore from 'components/FallbackExplore';

export default loadable(() => import('./index'), {
  fallback: <FallbackExplore />,
});
