/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'grommet';

import { selectRealmsWithStats } from 'containers/App/selectors';
import { navigateTypology } from 'containers/App/actions';

export function HomePage({ realms, navRealm }) {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="home" />
      </Helmet>
      <h4>Core Realms</h4>
      <div>
        {realms &&
          realms
            .filter(r => r.type === 'core')
            .sort((a, b) => (a.biomeNo > b.biomeNo ? -1 : 1))
            .map(r => (
              <div key={r.id}>
                <Button
                  plain
                  onClick={() => navRealm(r.id)}
                  label={`${r.id} (biomes: ${r.biomeNo}, groups: ${r.groupNo})`}
                />
              </div>
            ))}
      </div>
      <h4>Transitional Realms</h4>
      <div>
        {realms &&
          realms
            .filter(r => r.type === 'trans')
            .sort((a, b) => (a.biomeNo > b.biomeNo ? -1 : 1))
            .map(r => (
              <div key={r.id}>
                <Button
                  plain
                  onClick={() => navRealm(r.id)}
                  label={`${r.id} (biomes: ${r.biomeNo}, groups: ${r.groupNo})`}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

HomePage.propTypes = {
  realms: PropTypes.array,
  navRealm: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  realms: state => selectRealmsWithStats(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    navRealm: id => dispatch(navigateTypology('realms', id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
