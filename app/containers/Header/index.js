import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'grommet';
import { selectRouterPath } from 'containers/App/selectors';
import { navigate, navigateHome, navigatePage } from 'containers/App/actions';

import LocaleToggle from 'containers/LocaleToggle';
import NavBar from './NavBar';

function Header({ nav, navHome, navPage, path }) {
  console.log(path);
  return (
    <header>
      <NavBar>
        <LocaleToggle />
        <Button onClick={() => navHome()} label="Home" />
        <Button onClick={() => nav('explore')} label="Explore" />
        <Button onClick={() => navPage('typology')} label="Typology" />
        <Button onClick={() => navPage('about')} label="About" />
        <Button onClick={() => navPage('methods')} label="Methods" />
        <Button onClick={() => navPage('glossary')} label="Glossary" />
      </NavBar>
    </header>
  );
}

Header.propTypes = {
  nav: PropTypes.func,
  navHome: PropTypes.func,
  navPage: PropTypes.func,
  path: PropTypes.string,
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
)(Header);
