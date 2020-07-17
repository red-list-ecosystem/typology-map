import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { getAsideWidth, getHeaderHeight } from 'utils/responsive';

// prettier-ignore
const Styled = styled(Box)`
  pointer-events: all;
  position: fixed;
  z-index: ${({ theme }) => theme.dimensions.aside.zIndex};
  right: 0;
  bottom: 0;
  top: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getHeaderHeight('xxlarge')}px;
  }
  overflow-y: auto;
`;

function ColumnAside({ children, ...other }) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          width={`${getAsideWidth(size)}px`}
          direction="column"
          flex={{ shrink: 0 }}
          elevation="medium"
          background="white"
          {...other}
        >
          {children}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ColumnAside.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ColumnAside;
