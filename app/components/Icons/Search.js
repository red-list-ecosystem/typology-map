import React from 'react';
import StyledIcon from './StyledIcon';

function Search(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <path
        fill="inherit"
        stroke="inherit"
        d="M23.56,21.44l-7-7a9.16,9.16,0,1,0-2.12,2.12l7,7ZM2,9.13a7.14,7.14,0,1,1,7.13,7.14A7.14,7.14,0,0,1,2,9.13Z"
      />
    </StyledIcon>
  );
}

export default Search;
