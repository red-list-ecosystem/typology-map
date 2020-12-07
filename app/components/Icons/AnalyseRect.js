import React from 'react';
import PropTypes from 'prop-types';
import { colors } from 'theme';
import StyledIcon from './StyledIcon';

function AnalyseRect({ color, ...props }) {
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
        <rect
          fill="inherit"
          stroke="inherit"
          x="6"
          y="6"
          width="30"
          height="30"
        />
      </g>
    </StyledIcon>
  );
}

AnalyseRect.propTypes = {
  color: PropTypes.string,
};

export default AnalyseRect;
