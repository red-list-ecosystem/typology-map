import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { filter } from 'lodash/collection';
import styled from 'styled-components';

import { Button, Box, Text, ResponsiveContext, Layer } from 'grommet';
import { Menu, Search as SearchIcon } from 'components/Icons';

import { selectRouterPath } from 'containers/App/selectors';
import {
  navigate,
  navigateHome,
  navigatePage,
  resetGroupsQuery,
  resetGroupsQueryNav,
} from 'containers/App/actions';
import { PRIMARY, SECONDARY } from 'containers/App/constants';
import { PAGES, ICONS, ROUTES } from 'config';

import Img from 'components/Img';
import LocaleToggle from 'containers/LocaleToggle';
import Search from 'containers/Search';

import { getHeaderHeight, isMinSize, isMaxSize } from 'utils/responsive';

import commonMessages from 'messages';

import NavBar from './NavBar';
// prettier-ignore
const Brand = styled(props => <Button plain color="white" {...props} />)`
  /* responsive height */
  padding-right: ${({ theme }) => theme.global.edgeSize.small};
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
  color: ${({ theme }) => theme.global.colors.white};
  background: transparent;
  &:hover {
    background: ${({ theme }) => theme.global.colors.brand};
  }
  &:focus {
    background: ${({ theme, active }) =>
    active ? 'transparent' : theme.global.colors['brand-dark']};
  }
`;

const BrandWrap = styled(Box)`
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    margin-right: 50px;
  }
`;

const LogoWrap = styled(p => <Box flex={{ shrink: 0 }} {...p} />)`
  width: 50px;
  height: 100%;
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    width: 80px;
  }
`;
const TitleWrap = styled(Box)`
  font-weight: 600;
  line-height: 18px;
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    min-width: ${getHeaderHeight('large')}px;
    max-width: ${getHeaderHeight('large') + 20}px;
    line-height: 19px;
  }
`;

const NavPrimary = styled(props => <Box direction="row" {...props} />)`
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
  <Box {...props} direction="row" basis="1/2" align="center" />
))``;
const NavSearchSmall = styled(p => (
  <Box direction="row" align="center" fill="horizontal" flex {...p} />
))`
  height: ${getHeaderHeight('small')}px;
`;

const MenuButton = styled(props => <Button plain {...props} fill="vertical" />)`
  width: 100%;
  text-align: center;
  &:hover {
    background: ${({ theme }) => theme.global.colors.brand};
  }
  &:focus {
    background: ${({ theme }) => theme.global.colors.brand};
  }
`;
const SearchButton = styled(props => <Button plain {...props} />)`
  text-align: center;
  border-radius: 9999px;
  padding: ${({ theme }) => theme.global.edgeSize.xsmall};
  &:hover {
    background: ${({ theme }) => theme.global.colors.brand};
  }
  &:focus {
    background: ${({ theme }) => theme.global.colors.brand};
  }
`;

const MenuOpen = styled(Menu)`
  transform: rotate(90deg);
`;

// prettier-ignore
const Primary = styled(props => (
  <Button plain margin={{ horizontal: 'hair' }} {...props} />
))`
  text-align: center;
  font-weight: 600;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    active ? theme.global.colors.brand : 'transparent'};
  color: ${({ theme }) => theme.global.colors.white};
  &:hover {
    background: ${({ theme }) => theme.global.colors.brand};
  }
  &:focus {
    background: ${({ theme, active }) => theme.global.colors[active ? 'brand' : 'brand-dark']};
  }
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
`;
// prettier-ignore
const Secondary = styled(props => <Button {...props} plain />)`
  padding: ${({ theme }) => theme.global.edgeSize.small} ${({ theme }) => theme.global.edgeSize.medium};
  color: ${({ theme }) => theme.global.colors.white};
  text-decoration: ${({ active }) => (active ? 'underline' : 'none')};
  background: transparent;
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    text-decoration: underline;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.small};
    padding-right: ${({ theme, last }) =>
    last ? 0 : theme.global.edgeSize.small};
  }
`;

const IconImg = styled(Img)`
  vertical-align: middle;
  max-height: 100%;
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
  const [showMenu, setShowMenu] = useState(false);

  const paths = path.split('/');
  const contentType = paths[0] === '' ? paths[1] : paths[0];
  const contentId =
    paths[0] === ''
      ? paths.length > 1 && paths[2]
      : paths.length > 0 && paths[1];
  const pagesPrimary = filter(pagesArray, p => p.nav === PRIMARY);
  const pagesSecondary = filter(pagesArray, p => p.nav === SECONDARY);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <NavBar
            justify={isMinSize(size, 'large') ? 'start' : 'between'}
            alignContent="end"
            fill
          >
            {(isMinSize(size, 'large') || !showSearch) && (
              <BrandWrap>
                <Brand
                  onClick={() => navHome()}
                  active={contentType === ''}
                  label={
                    <Box direction="row" fill="vertical" align="center">
                      <LogoWrap>
                        <IconImg src={ICONS.LOGO} alt="" />
                      </LogoWrap>
                      <TitleWrap>
                        <FormattedMessage {...commonMessages.appTitle} />
                      </TitleWrap>
                    </Box>
                  }
                />
              </BrandWrap>
            )}
            {isMaxSize(size, 'medium') && (
              <Box
                direction="row"
                justify="end"
                fill={showSearch ? true : 'vertical'}
                flex={{ grow: 0 }}
              >
                {!showSearch && (
                  <Box flex={false} style={{ width: '40px' }}>
                    <MenuButton
                      onClick={() => {
                        setShowMenu(false);
                        setShowSearch(!showSearch);
                      }}
                      label={<SearchIcon color="white" size="medium" />}
                    />
                  </Box>
                )}
                {showSearch && (
                  <NavSearchSmall>
                    <Search onClose={() => setShowSearch(false)} stretch />
                  </NavSearchSmall>
                )}
                <Box flex={false} style={{ width: '40px' }}>
                  <MenuButton
                    plain
                    onClick={() => {
                      setShowSearch(false);
                      setShowMenu(!showMenu);
                    }}
                    label={
                      showMenu ? (
                        <MenuOpen color="white" />
                      ) : (
                        <Menu color="white" />
                      )
                    }
                  />
                </Box>
              </Box>
            )}
            {isMinSize(size, 'large') && (
              <NavPrimary>
                <Primary
                  onClick={() => nav(ROUTES.EXPLORE)}
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
                  active={contentType === ROUTES.EXPLORE}
                />
                <Primary
                  onClick={() => nav(ROUTES.ANALYSE)}
                  label={
                    <PrimaryLabel>
                      <IconImgWrap>
                        <IconImgHelper />
                        <IconImg src={ICONS.ANALYSIS} alt="" />
                      </IconImgWrap>
                      <Text>
                        <FormattedMessage {...commonMessages.navAnalyse} />
                      </Text>
                    </PrimaryLabel>
                  }
                  active={contentType === ROUTES.ANALYSE}
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
                          {commonMessages[`page_${p.key}`] && (
                            <FormattedMessage
                              {...commonMessages[`page_${p.key}`]}
                            />
                          )}
                        </Text>
                      </PrimaryLabel>
                    }
                    active={contentType === 'page' && contentId === p.key}
                  />
                ))}
              </NavPrimary>
            )}
            {isMinSize(size, 'large') && (
              <Box
                fill="vertical"
                pad={{ horizontal: 'small' }}
                margin={{ left: 'auto' }}
                flex={{ shrink: 0 }}
              >
                <NavSecondary justify="end">
                  {pagesSecondary.map((p, index) => (
                    <Secondary
                      key={p.key}
                      onClick={() => navPage(p.key)}
                      label={
                        <FormattedMessage
                          {...commonMessages[`page_${p.key}`]}
                        />
                      }
                      active={contentType === 'page' && contentId === p.key}
                      last={index === pagesSecondary.length - 1}
                    />
                  ))}
                  <LocaleToggle />
                </NavSecondary>
                <NavSearch justify="end">
                  {!showSearch && (
                    <SearchButton
                      icon={<SearchIcon color="white" />}
                      onClick={() => setShowSearch(true)}
                    />
                  )}
                  {showSearch && (
                    <Search onClose={() => setShowSearch(false)} />
                  )}
                </NavSearch>
              </Box>
            )}
          </NavBar>
          {isMaxSize(size, 'medium') && showMenu && (
            <Layer
              full="horizontal"
              margin={{ top: '50px' }}
              onClickOutside={() => setShowMenu(false)}
              responsive={false}
              modal={false}
              animate={false}
              position="top"
            >
              <Box
                background="brand-2"
                elevation="medium"
                style={{ borderTop: '1px solid white' }}
              >
                <Secondary
                  onClick={() => {
                    setShowMenu(false);
                    nav('explore');
                  }}
                  label={<FormattedMessage {...commonMessages.navExplore} />}
                  active={contentType === 'explore'}
                />
                {pagesArray.map(p => (
                  <Secondary
                    key={p.key}
                    onClick={() => {
                      setShowMenu(false);
                      navPage(p.key);
                    }}
                    label={
                      <FormattedMessage {...commonMessages[`page_${p.key}`]} />
                    }
                    active={contentType === 'page' && contentId === p.key}
                  />
                ))}
                <LocaleToggle />
              </Box>
            </Layer>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
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
    nav: path => {
      dispatch(resetGroupsQuery());
      dispatch(resetGroupsQueryNav());
      dispatch(navigate(path));
    },
    navHome: () => {
      dispatch(resetGroupsQuery());
      dispatch(resetGroupsQueryNav());
      dispatch(navigateHome());
    },
    navPage: id => dispatch(navigatePage(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(injectIntl(Header));
