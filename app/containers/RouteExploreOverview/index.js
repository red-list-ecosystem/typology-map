/**
 *
 * RouteExploreOverview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { intlShape, injectIntl } from 'react-intl';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectRealmsWithStats, selectLocale } from 'containers/App/selectors';
import { navigateTypology } from 'containers/App/actions';
// import messages from './messages';

import NavGridRealms from 'components/NavGridRealms';

import commonMessages from 'messages';

export function RouteExploreOverview({ realms, navRealm, locale, intl }) {
  return (
    <div>
      <Helmet>
        <title>RouteExploreOverview</title>
        <meta
          name="description"
          content="Description of RouteExploreOverview"
        />
      </Helmet>
      <NavGridRealms
        label={intl.formatMessage(commonMessages.typology['core-realms'])}
        items={realms && realms.filter(r => r.type === 'core')}
        itemClick={id => navRealm(id)}
        locale={locale}
      />
      <NavGridRealms
        label={intl.formatMessage(commonMessages.typology['trans-realms'])}
        items={realms && realms.filter(r => r.type === 'trans')}
        itemClick={id => navRealm(id)}
        locale={locale}
      />
    </div>
  );
}

RouteExploreOverview.propTypes = {
  realms: PropTypes.array,
  navRealm: PropTypes.func,
  locale: PropTypes.string,
  intl: intlShape.isRequired,
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

export default compose(withConnect)(injectIntl(RouteExploreOverview));
