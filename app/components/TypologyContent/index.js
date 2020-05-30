/**
 *
 * TypologyContent
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

import { getContentMaxWidth } from 'utils/responsive';

const StyledBox = styled(Box)`
  margin: 0 auto;
  max-width: ${getContentMaxWidth('small')}px;
  /* responsive height */
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    max-width: ${getContentMaxWidth('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    max-width: ${getContentMaxWidth('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    max-width: ${getContentMaxWidth('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    max-width: ${getContentMaxWidth('xxlarge')}px;
  }
`;
function TypologyContent(props) {
  return <StyledBox {...props} />;
}

export default TypologyContent;
