import React from 'react';
import PropTypes from 'prop-types';
import StyledIcon from './StyledIcon';

function Layers(props) {
  return (
    <StyledIcon viewBox="0 0 24 24" a11yTitle="Search" {...props}>
      <g>
        <polygon
          fill="inherit"
          stroke="none"
          points="12.5 20.72 2.81 13.03 1.56 14.6 12.5 23.28 23.44 14.6 22.19 13.03 12.5 20.72"
        />
        <path
          fill="inherit"
          stroke="none"
          d="M23.63,9.37,12.5.73,1.37,9.37,12.5,18ZM12.5,3.27l7.87,6.1-7.87,6.1L4.63,9.37Z"
        />
      </g>
    </StyledIcon>
  );
}

Layers.propTypes = {
  color: PropTypes.string,
};

export default Layers;
