import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

import { getAsideWidth } from 'utils/responsive';

// prettier-ignore
const Styled = styled(Box)`
  pointer-events: all;
  position: relative;
  min-height: 100vh;
  margin-right: ${getAsideWidth('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    margin-right: ${getAsideWidth('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    margin-right: ${getAsideWidth('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    margin-right: ${getAsideWidth('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    margin-right: ${getAsideWidth('xxlarge')}px;
  }
`;

function ColumnMain(props) {
  return <Styled direction="column" {...props} flex />;
}

ColumnMain.propTypes = {
  hasAside: PropTypes.bool,
};

export default ColumnMain;
