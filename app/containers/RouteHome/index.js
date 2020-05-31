/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useRef } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';

import { ResponsiveContext, Paragraph, Box, Button } from 'grommet';
import { Down } from 'grommet-icons';

import { PATHS } from 'config';

import { selectRealmsWithStats, selectLocale } from 'containers/App/selectors';
import { navigateTypology } from 'containers/App/actions';

import NavGridRealms from 'components/NavGridRealms';
import Footer from 'components/Footer';
import PageBackground from 'components/PageBackground';
import H1 from 'components/H1';

import { getHeaderHeight, getAsideWidth } from 'utils/responsive';

import commonMessages from 'messages';
import messages from './messages';

const Styled = styled.div`
  min-height: 100vh;
`;

const MainContent = styled.div`
  position: relative;
  z-index: 1;
  top: 100vh;
  background: ${({ theme }) => theme.global.colors['light-2']};
`;

const Intro = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
  background: transparent;
  /* responsive height */
  top: ${getHeaderHeight('small')}px;
  right: ${getAsideWidth('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getHeaderHeight('xxlarge')}px;
  }
`;

const IntroContentWrap = styled(props => <Box {...props} justify="evenly" />)`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
`;

const IntroWrap = styled.div`
  max-width: 55%;
`;
const IntroTitleWrap = styled(props => (
  <Box pad={{ left: 'medium', right: 'small', vertical: 'hair' }} {...props} />
))`
  position: relative;
  display: inline-block;
  &::before {
    content: '';
    background: rgba(0, 0, 0, 0.6);
    position: absolute;
    display: block;
    left: 0;
    right: 0;
    width: 100%;
    top: 50%;
    height: 40px;
  }
`;
const IntroTitle = styled(H1)`
  position: relative;
  z-index: 1;
  font-size: 56px;
  line-height: 66px;
  display: inline;
  margin: 0;
  color: white;
`;
const IntroParaWrap = styled(props => (
  <Box
    pad={{ left: 'medium', right: 'small', vertical: 'xxsmall' }}
    margin={{ bottom: 'medium' }}
    {...props}
  />
))`
  display: inline-block;
  background: rgba(0, 0, 0, 0.6);
`;
const IntroPara = styled(Paragraph)`
  color: white;
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
`;

const IntroScroll = styled(props => <Button plain {...props} />)`
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 70px;
  height: 70px;
  border-radius: 9999px;
  vertical-align: middle;
  text-align: center;
  &:hover {
    background: rgba(0, 0, 0, 0.4);
  }
`;

const scrollToRef = (ref, size) =>
  window.scrollTo(0, ref.current.offsetTop - getHeaderHeight(size || 'large'));

export function HomePage({ realms, navRealm, locale, intl }) {
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
              src: `${PATHS.IMAGES}/home.jpg`,
              credit: intl.formatMessage(commonMessages.imageCreditHome),
            }}
          />
          <Intro>
            <IntroContentWrap onClick={() => onScroll(size)}>
              <IntroWrap>
                <IntroTitleWrap>
                  <IntroTitle>
                    <FormattedMessage {...messages.introTitle} />
                  </IntroTitle>
                </IntroTitleWrap>
                <IntroTitleWrap>
                  <IntroTitle>
                    <FormattedMessage {...messages.introTitle2} />
                  </IntroTitle>
                </IntroTitleWrap>
              </IntroWrap>
              <IntroWrap>
                <IntroParaWrap>
                  <IntroPara>
                    <FormattedMessage {...messages.introParagraph} />
                  </IntroPara>
                </IntroParaWrap>
              </IntroWrap>
              <IntroScroll
                icon={<Down size="50px" color="white" />}
                onClick={() => onScroll(size)}
              />
            </IntroContentWrap>
          </Intro>
          <MainContent ref={targetRef}>
            <NavGridRealms
              label={intl.formatMessage(commonMessages.realmsCore)}
              items={realms && realms.filter(r => r.type === 'core')}
              itemClick={id => navRealm(id)}
              locale={locale}
              type="core"
            />
            <NavGridRealms
              label={intl.formatMessage(commonMessages.realmsTrans)}
              items={realms && realms.filter(r => r.type === 'trans')}
              itemClick={id => navRealm(id)}
              locale={locale}
              type="trans"
            />
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
