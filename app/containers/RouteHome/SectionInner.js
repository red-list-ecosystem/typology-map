import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

import { getHomeMaxWidth } from 'utils/responsive';

export default styled(props => <Box {...props} />)`
  margin: 0 auto;
  max-width: 100%;
  /* responsive height */
  padding: ${({ theme }) => theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    max-width: ${getHomeMaxWidth('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    max-width: ${getHomeMaxWidth('large')}px;
    padding: ${({ theme }) => theme.global.edgeSize.large} 0;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    max-width: ${getHomeMaxWidth('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    max-width: ${getHomeMaxWidth('xxlarge')}px;
  }
`;
