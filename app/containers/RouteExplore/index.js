/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { Button } from 'grommet';
//
import {
  selectRealm,
  selectBiome,
  selectGroup,
} from 'containers/App/selectors';
// import { navigateTypology } from 'containers/App/actions';
// import messages from './messages';

import ExploreRealm from 'containers/ExploreRealm/Loadable';
import ExploreBiome from 'containers/ExploreBiome/Loadable';
import ExploreGroup from 'containers/ExploreGroup/Loadable';

export function RouteExplore({ match, typology }) {
  const { level } = match.params;
  return (
    <div>
      <Helmet>
        <title>RouteExplore</title>
        <meta name="description" content="Description of RouteExplore" />
      </Helmet>
      <>
        {level === 'realms' && typology && <ExploreRealm typology={typology} />}
      </>
      <>
        {level === 'biomes' && typology && <ExploreBiome typology={typology} />}
      </>
      <>
        {level === 'groups' && typology && <ExploreGroup typology={typology} />}
      </>
    </div>
  );
}

RouteExplore.propTypes = {
  match: PropTypes.object.isRequired,
  typology: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  typology: (state, { match }) => {
    const { level, id } = match.params;
    if (level === 'realms') return selectRealm(state, id);
    if (level === 'biomes') return selectBiome(state, id);
    if (level === 'groups') return selectGroup(state, id);
    return null;
  },
});

// export function mapDispatchToProps(dispatch) {
//   return {
//     navRealm: id => dispatch(navigateTypology('realms', id)),
//   };
// }

const withConnect = connect(mapStateToProps);

// export default RouteExplore;
export default compose(withConnect)(RouteExplore);
