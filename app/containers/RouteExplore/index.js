/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
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

const Styled = styled.div`
  pointer-events: none;
  position: relative;
  z-index: 2;
`;

export function RouteExplore({ match, typology }) {
  const { level } = match.params;
  return (
    <Styled>
      {level === 'realms' && typology && <ExploreRealm typology={typology} />}
      {level === 'biomes' && typology && <ExploreBiome typology={typology} />}
      {level === 'groups' && typology && <ExploreGroup typology={typology} />}
    </Styled>
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
