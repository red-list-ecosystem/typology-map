import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

import { getHomeMaxWidth } from 'utils/responsive';

export default styled(props => <Box {...props} pad={{ vertical: 'large' }} />)`
  margin: 0 auto;
  max-width: ${getHomeMaxWidth('small')}px;
  /* responsive height */
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    max-width: ${getHomeMaxWidth('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    max-width: ${getHomeMaxWidth('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    max-width: ${getHomeMaxWidth('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    max-width: ${getHomeMaxWidth('xxlarge')}px;
  }
`;
