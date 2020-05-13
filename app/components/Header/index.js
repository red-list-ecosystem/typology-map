import React from 'react';

import LocaleToggle from 'containers/LocaleToggle';
import NavBar from './NavBar';

function Header() {
  return (
    <div>
      <NavBar>
        <LocaleToggle />
      </NavBar>
    </div>
  );
}

export default Header;
