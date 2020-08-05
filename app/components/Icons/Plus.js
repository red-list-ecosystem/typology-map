import React from 'react';
import StyledIcon from './StyledIcon';

function Plus(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <g>
        <polygon
          fill="inherit"
          stroke="inherit"
          points="19 11 13 11 13 5 11 5 11 11 5 11 5 13 11 13 11 19 13 19 13 13 19 13 19 11"
        />
      </g>
    </StyledIcon>
  );
}
export default Plus;
