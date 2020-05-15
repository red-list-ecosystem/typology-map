/**
 *
 * Asynchronously loads the component for ExploreBiome
 *
 */

import loadable from 'utils/loadable';

export default loadable(() => import('./index'));
