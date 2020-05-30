/**
 *
 * ColumnMainContent
 *
 */

import styled from 'styled-components';

import { getTopGraphicHeight } from 'utils/responsive';

export default styled.div`
  position: relative;
  z-index: ${({ theme }) => theme.dimensions.mainContent.zIndex};
  background: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  top: ${getTopGraphicHeight('small')}px;
  /* responsive height */
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getTopGraphicHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getTopGraphicHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getTopGraphicHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getTopGraphicHeight('xxlarge')}px;
  }
`;
