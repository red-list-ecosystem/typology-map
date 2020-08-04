import React from 'react';
import StyledIcon from './StyledIcon';

function Expand(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <g>
        <polygon
          fill="inherit"
          stroke="none"
          points="15 2 15 4 18.59 4 13.29 9.29 14.71 10.71 20 5.41 20 9 22 9 22 2 15 2"
        />
        <polygon
          fill="inherit"
          stroke="none"
          points="9.29 13.29 4 18.59 4 15 2 15 2 22 9 22 9 20 5.41 20 10.71 14.71 9.29 13.29"
        />
      </g>
    </StyledIcon>
  );
}

export default Expand;
