/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { selectRealmsWithStats, selectLocale } from 'containers/App/selectors';
import { navigateTypology } from 'containers/App/actions';

import NavGridRealms from 'components/NavGridRealms';

import commonMessages from 'messages';

const Styled = styled.div`
  min-height: 100vh;
`;

export function HomePage({ realms, navRealm, locale, intl }) {
  return (
    <Styled>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="home" />
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
    </Styled>
  );
}

HomePage.propTypes = {
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

export default compose(
  withConnect,
  memo,
)(injectIntl(HomePage));
