import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { filter } from 'lodash/collection';
import styled from 'styled-components';

import { Button, Box, Text } from 'grommet';

import { selectRouterPath } from 'containers/App/selectors';
import { navigate, navigateHome, navigatePage } from 'containers/App/actions';
import { PRIMARY, SECONDARY } from 'containers/App/constants';
import { PAGES, ICONS } from 'config';

import Img from 'components/Img';
import LocaleToggle from 'containers/LocaleToggle';
import Search from 'containers/Search';

import { getHeaderHeight } from 'utils/responsive';

import commonMessages from 'messages';

import NavBar from './NavBar';

const Brand = styled(props => <Button {...props} plain color="white" />)`
  /* responsive height */
  padding: 0 ${({ theme }) => theme.global.edgeSize.xsmall};
  height: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: ${getHeaderHeight('large')}px;
    width: ${getHeaderHeight('large')}px;
    margin-right: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    height: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    height: ${getHeaderHeight('xxlarge')}px;
  }
  &:hover {
    background: ${({ theme }) => theme.global.colors.brand};
  }
`;

const NavPrimary = styled(props => <Box {...props} direction="row" />)`
  height: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    height: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    height: ${getHeaderHeight('xxlarge')}px;
  }
`;
const NavSecondary = styled(props => (
  <Box {...props} direction="row" gap="small" basis="1/2" />
))``;
const NavSearch = styled(props => (
  <Box {...props} direction="row" gap="small" basis="1/2" align="center" />
))``;

const Primary = styled(props => (
  <Button
    {...props}
    plain
    pad={{ horizontal: 'small' }}
    margin={{ horizontal: 'hair' }}
  />
))`
  text-align: center;
  height: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: ${getHeaderHeight('large')}px;
    min-width: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    height: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    height: ${getHeaderHeight('xxlarge')}px;
  }
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    active ? theme.global.colors.brand : 'transparent'};
  color: ${({ theme }) => theme.global.colors.white};
  &:hover {
    background: ${({ theme }) => theme.global.colors.brand};
  }
`;
const Secondary = styled(props => <Button {...props} plain />)`
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  padding-right: ${({ theme, last }) =>
    last ? 0 : theme.global.edgeSize.small};
  color: ${({ theme }) => theme.global.colors.white};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  background: transparent;
  &:hover {
    text-decoration: underline;
  }
`;

const IconImg = styled(Img)`
  vertical-align: middle;
`;
const IconImgHelper = styled.div`
  display: inline-block;
  height: 100%;
  vertical-align: middle;
`;
const IconImgWrap = styled.div`
  height: ${({ theme }) => theme.dimensions.header.primaryIcons}px;
`;
const PrimaryLabel = styled(props => (
  <Box {...props} justify="center" gap="xsmall" fill />
))``;

const pagesArray = Object.keys(PAGES).map(key => ({
  key,
  ...PAGES[key],
}));

function Header({ nav, navHome, navPage, path }) {
  const [showSearch, setShowSearch] = useState(false);

  const paths = path.split('/');
  const contentType = paths[0] === '' ? paths[1] : paths[0];
  const contentId =
    paths[0] === ''
      ? paths.length > 1 && paths[2]
      : paths.length > 0 && paths[1];
  const pagesPrimary = filter(pagesArray, p => p.nav === PRIMARY);
  const pagesSecondary = filter(pagesArray, p => p.nav === SECONDARY);

  return (
    <NavBar>
      <Brand
        onClick={() => navHome()}
        label={<FormattedMessage {...commonMessages.appTitle} />}
      />
      <NavPrimary>
        <Primary
          onClick={() => nav('explore')}
          label={
            <PrimaryLabel>
              <IconImgWrap>
                <IconImgHelper />
                <IconImg src={ICONS.EXPLORE} alt="" />
              </IconImgWrap>
              <Text>
                <FormattedMessage {...commonMessages.navExplore} />
              </Text>
            </PrimaryLabel>
          }
          active={contentType === 'explore'}
        />
        {pagesPrimary.map(p => (
          <Primary
            key={p.key}
            onClick={() => navPage(p.key)}
            label={
              <PrimaryLabel>
                <IconImgWrap>
                  <IconImgHelper />
                  <IconImg src={p.icon} alt="" />
                </IconImgWrap>
                <Text>
                  <FormattedMessage {...commonMessages[`page_${p.key}`]} />
                </Text>
              </PrimaryLabel>
            }
            active={contentType === 'page' && contentId === p.key}
          />
        ))}
      </NavPrimary>
      <Box
        fill="vertical"
        pad={{ horizontal: 'small' }}
        margin={{ left: 'auto' }}
      >
        <NavSecondary justify="end">
          {pagesSecondary.map((p, index) => (
            <Secondary
              key={p.key}
              onClick={() => navPage(p.key)}
              label={<FormattedMessage {...commonMessages[`page_${p.key}`]} />}
              active={contentType === 'page' && contentId === p.key}
              last={index === pagesSecondary.length - 1}
            />
          ))}
          <LocaleToggle />
        </NavSecondary>
        <NavSearch justify="end">
          <Search
            expand={showSearch}
            onToggle={() => setShowSearch(!showSearch)}
          />
        </NavSearch>
      </Box>
    </NavBar>
  );
}

Header.propTypes = {
  nav: PropTypes.func,
  navHome: PropTypes.func,
  navPage: PropTypes.func,
  path: PropTypes.string,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  path: state => selectRouterPath(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    nav: path => dispatch(navigate(path)),
    navHome: () => dispatch(navigateHome()),
    navPage: id => dispatch(navigatePage(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Header));
