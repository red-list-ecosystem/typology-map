import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'theme';
import StyledIcon from './StyledIcon';

function AnalysePoly({ color, ...props }) {
  return (
    <StyledIcon
      viewBox="0 0 40 40"
      a11yTitle="Analyse Polygon"
      fill="none"
      strokeWidth="2"
      stroke={colors[color] || color}
      {...props}
    >
      <g>
        <polygon
          fill="inherit"
          stroke="inherit"
          points="0,24 20,8 38,8 38,22 23,38"
        />
      </g>
    </StyledIcon>
  );
}

AnalysePoly.propTypes = {
  color: PropTypes.string,
};

export default AnalysePoly;
