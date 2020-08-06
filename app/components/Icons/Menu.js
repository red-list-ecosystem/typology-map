import React from 'react';
import StyledIcon from './StyledIcon';

function Layers(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <g>
        <rect
          fill="inherit"
          stroke="inherit"
          x="5"
          y="11"
          width="14"
          height="2"
        />
        <rect
          fill="inherit"
          stroke="inherit"
          x="5"
          y="6"
          width="14"
          height="2"
        />
        <rect
          fill="inherit"
          stroke="inherit"
          x="5"
          y="16"
          width="14"
          height="2"
        />
      </g>
    </StyledIcon>
  );
}

export default Layers;
