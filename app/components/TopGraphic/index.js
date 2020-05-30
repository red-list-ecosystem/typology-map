/**
 *
 * TopGraphic
 *
 */

import styled from 'styled-components';
import { Box } from 'grommet';
import {
  getHeaderHeight,
  getAsideWidth,
  getTopGraphicHeight,
} from 'utils/responsive';

export default styled(Box)`
  position: fixed;
  left: 0;
  background: ${({ theme }) => theme.global.colors['light-1']};
  height: ${getTopGraphicHeight('small')}px;
  overflow: hidden;
  /* responsive height */
  top: ${getHeaderHeight('small')}px;
  right: ${getAsideWidth('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: ${getHeaderHeight('medium')}px;
    right: ${getAsideWidth('medium')}px;
    height: ${getTopGraphicHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getHeaderHeight('large')}px;
    right: ${getAsideWidth('large')}px;
    height: ${getTopGraphicHeight('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getHeaderHeight('xlarge')}px;
    right: ${getAsideWidth('xlarge')}px;
    height: ${getTopGraphicHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getHeaderHeight('xxlarge')}px;
    right: ${getAsideWidth('xxlarge')}px;
    height: ${getTopGraphicHeight('xxlarge')}px;
  }
`;
