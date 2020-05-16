import React from 'react';
import styled from 'styled-components';
import { Header } from 'grommet';
import { getHeaderHeight } from 'utils/responsive';

export default styled(props => <Header {...props} align="start" />)`
  background: ${({ theme }) => theme.global.colors.header.background}};
  /* responsive height */
  height: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: ${getHeaderHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    height: ${getHeaderHeight('xlarge')}px;
  }
`;
