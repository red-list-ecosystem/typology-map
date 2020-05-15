/**
 *
 * Asynchronously loads the component for ExploreRealm
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
