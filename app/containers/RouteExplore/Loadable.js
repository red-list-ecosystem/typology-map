/**
 *
 * Asynchronously loads the component for RouteExplore
 *
 */
import React from 'react';
import loadable from 'utils/loadable';
import LoadingIndicator from 'components/LoadingIndicator';

export default loadable(() => import('./index'), {
  fallback: <LoadingIndicator />,
});
