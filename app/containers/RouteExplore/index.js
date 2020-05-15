/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
// import { connect } from 'react-redux';
// import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
// import { Button } from 'grommet';
//
// import { selectRealmsWithStats } from 'containers/App/selectors';
// import { navigateTypology } from 'containers/App/actions';
// import messages from './messages';

import ExploreRealm from 'containers/ExploreRealm/Loadable';

export function RouteExplore({ match }) {
  return (
    <div>
      <Helmet>
        <title>RouteExplore</title>
        <meta name="description" content="Description of RouteExplore" />
      </Helmet>
      <>
        {match.params.level === 'realms' && (
          <ExploreRealm id={match.params.id} />
        )}
      </>
    </div>
  );
}

RouteExplore.propTypes = {
  match: PropTypes.object.isRequired,
};

// const mapStateToProps = createStructuredSelector({
//   realms: state => selectRealmsWithStats(state),
// });
//
// export function mapDispatchToProps(dispatch) {
//   return {
//     navRealm: id => dispatch(navigateTypology('realms', id)),
//   };
// }
//
// const withConnect = connect(
//   mapStateToProps,
//   mapDispatchToProps,
// );

export default RouteExplore;
// export default compose(withConnect)(RouteExplore);
