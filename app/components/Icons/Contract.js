import React from 'react';
import StyledIcon from './StyledIcon';

function Contract(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <g>
        <polygon
          fill="inherit"
          stroke="inherit"
          points="21.71 3.71 20.29 2.29 15 7.59 15 4 13 4 13 11 20 11 20 9 16.41 9 21.71 3.71"
        />
        <polygon
          fill="inherit"
          stroke="inherit"
          points="4 15 7.59 15 2.29 20.29 3.71 21.71 9 16.41 9 20 11 20 11 13 4 13 4 15"
        />
      </g>
    </StyledIcon>
  );
}

export default Contract;
