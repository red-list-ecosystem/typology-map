import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';
import { filter } from 'lodash/collection';
import styled from 'styled-components';

import { Button, Box } from 'grommet';

import { selectRouterPath } from 'containers/App/selectors';
import { navigate, navigateHome, navigatePage } from 'containers/App/actions';
import { PRIMARY, SECONDARY } from 'containers/App/constants';
import { PAGES } from 'config';

import LocaleToggle from 'containers/LocaleToggle';
import Search from 'containers/Search';

import { getHeaderHeight } from 'utils/responsive';

import commonMessages from 'messages';

import NavBar from './NavBar';

const Brand = styled(props => <Button {...props} plain color="white" />)`
  /* responsive height */
  height: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: ${getHeaderHeight('large')}px;
    width: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    height: ${getHeaderHeight('xlarge')}px;
  }
  &:hover {
    background: #666666;
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
`;
const NavSecondary = styled(props => (
  <Box {...props} direction="row" gap="small" />
))``;

const Primary = styled(props => (
  <Button {...props} plain pad={{ horizontal: 'small' }} />
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
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ active }) => (active ? '#108314' : 'transparent')};
  color: ${({ theme }) => theme.global.colors.white};
  &:hover {
    background: #108314;
  }
`;
const Secondary = styled(props => <Button {...props} plain />)`
  padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  color: ${({ theme, active }) =>
    active ? '#dddddd' : theme.global.colors.white};
  &:hover {
    color: #dddddd;
  }
`;
const pagesArray = Object.keys(PAGES).map(key => ({
  key,
  ...PAGES[key],
}));

function Header({ nav, navHome, navPage, path }) {
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
          label={<FormattedMessage {...commonMessages.navExplore} />}
          active={contentType === 'explore'}
        />
        {pagesPrimary.map(p => (
          <Primary
            key={p.key}
            onClick={() => navPage(p.key)}
            label={<FormattedMessage {...commonMessages[`page_${p.key}`]} />}
            active={contentType === 'page' && contentId === p.key}
          />
        ))}
      </NavPrimary>
      <NavSecondary>
        {pagesSecondary.map(p => (
          <Secondary
            key={p.key}
            onClick={() => navPage(p.key)}
            label={<FormattedMessage {...commonMessages[`page_${p.key}`]} />}
            active={contentType === 'page' && contentId === p.key}
          />
        ))}
        <LocaleToggle />
        <Search />
      </NavSecondary>
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
