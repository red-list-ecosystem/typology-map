/**
 *
 * ColumnMainContent
 *
 */

import styled from 'styled-components';

import { getTopGraphicHeight } from 'utils/responsive';

export default styled.div`
  position: relative;
  pointer-events: all;
  z-index: ${({ theme }) => theme.dimensions.mainContent.zIndex};
  background: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  top: ${getTopGraphicHeight('small')}px;
  width: 100%;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  /* responsive height */
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getTopGraphicHeight('medium')}px;
    padding-right: ${({ theme }) => theme.global.edgeSize.medium};
    padding-left: ${({ theme }) => theme.global.edgeSize.medium};
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getTopGraphicHeight('large')}px;
    padding-right: ${({ theme }) => theme.global.edgeSize.large};
    padding-left: ${({ theme }) => theme.global.edgeSize.large};
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getTopGraphicHeight('xlarge')}px;
    padding-right: ${({ theme }) => theme.global.edgeSize.xlarge};
    padding-left: ${({ theme }) => theme.global.edgeSize.xlarge};
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getTopGraphicHeight('xxlarge')}px;
    padding-right: ${({ theme }) => theme.global.edgeSize.xxlarge};
    padding-left: ${({ theme }) => theme.global.edgeSize.xxlarge};
  }
`;
