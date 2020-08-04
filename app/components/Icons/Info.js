import React from 'react';
import StyledIcon from './StyledIcon';

function Info(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <g>
        <path
          fill="inherit"
          stroke="none"
          d="M12,4.5A7.5,7.5,0,1,0,19.5,12,7.5,7.5,0,0,0,12,4.5Zm0,14A6.5,6.5,0,1,1,18.5,12,6.51,6.51,0,0,1,12,18.5Z"
        />
        <rect
          fill="inherit"
          stroke="none"
          x="11"
          y="10.5"
          width="2"
          height="6"
        />
        <rect
          fill="inherit"
          stroke="none"
          x="11"
          y="7.5"
          width="2"
          height="2"
        />
      </g>
    </StyledIcon>
  );
}

export default Info;
