/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { ResponsiveContext } from 'grommet';

import { PATHS, PAGES } from 'config';

import { selectRealmsWithStats, selectLocale } from 'containers/App/selectors';
import { navigateTypology, navigatePage } from 'containers/App/actions';

import Footer from 'components/Footer';
import PageBackground from 'components/PageBackground';

import { getHeaderHeight } from 'utils/responsive';

import commonMessages from 'messages';
import messages from './messages';

import Intro from './Intro';
import SectionExplore from './SectionExplore';
import SectionAbout from './SectionAbout';
import SectionThanks from './SectionThanks';

const Styled = styled.div`
  position: relative;
  z-index: 2;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
  top: 100vh;
  margin-top: -${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    margin-top: -${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    margin-top: -${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    margin-top: -${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    margin-top: -${getHeaderHeight('xxlarge')}px;
  }
`;

const scrollToRef = (ref, size) =>
  window.scrollTo(0, ref.current.offsetTop - getHeaderHeight(size || 'large'));

export function HomePage({ realms, navRealm, navPage, locale, intl }) {
  const targetRef = useRef(null);
  const onScroll = size => scrollToRef(targetRef, size);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled>
          <Helmet>
            <title>Home Page</title>
            <meta name="description" content="home" />
          </Helmet>
          <PageBackground
            image={{
              src: `${PATHS.IMAGES}/bg_home.jpg`,
              credit: intl.formatMessage(commonMessages.imageCredit_home),
            }}
          />
          <Intro onScroll={() => onScroll(size)} />
          <MainContent ref={targetRef}>
            <SectionExplore
              realms={realms}
              navRealm={navRealm}
              locale={locale}
            />
            <SectionAbout
              links={[
                {
                  id: 'methods',
                  title: intl.formatMessage(messages.linkAboutMethods),
                  nav: () => navPage(PAGES.methods.path),
                },
                {
                  id: 'about',
                  title: intl.formatMessage(messages.linkAboutSite),
                  nav: () => navPage(PAGES.about.path),
                },
              ]}
            />
            <SectionThanks />
            <Footer />
          </MainContent>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

HomePage.propTypes = {
  realms: PropTypes.array,
  navRealm: PropTypes.func,
  navPage: PropTypes.func,
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
    navPage: id => dispatch(navigatePage(id)),
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
