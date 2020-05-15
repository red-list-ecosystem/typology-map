/**
 *
 * RouteExploreOverview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'grommet';

import { selectRealmsWithStats, selectLocale } from 'containers/App/selectors';
import { navigateTypology } from 'containers/App/actions';
// import messages from './messages';

export function RouteExploreOverview({ realms, navRealm, locale }) {
  return (
    <div>
      <Helmet>
        <title>RouteExploreOverview</title>
        <meta
          name="description"
          content="Description of RouteExploreOverview"
        />
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
                  label={`${r.id} ${r.title[locale]} (biomes: ${
                    r.biomeNo
                  }, groups: ${r.groupNo})`}
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
                  label={`${r.id} ${r.title[locale]} (biomes: ${
                    r.biomeNo
                  }, groups: ${r.groupNo})`}
                />
              </div>
            ))}
      </div>
    </div>
  );
}

RouteExploreOverview.propTypes = {
  realms: PropTypes.array,
  navRealm: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  realms: state => selectRealmsWithStats(state),
  locale: state => selectLocale(state),
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

export default compose(withConnect)(RouteExploreOverview);
