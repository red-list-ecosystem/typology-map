import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

const OptionButton = React.forwardRef((props, ref) => (
  <Button plain {...props} ref={ref} />
));
// prettier-ignore
export default styled(OptionButton)`
  padding: ${({ theme }) => theme.global.edgeSize.small};
  border-top: 1px solid;
  border-top-color: ${({ theme }) => theme.global.colors.border.light};
  background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : 'transparent'};
  &:last-child {
    border-bottom: 1px solid;
    border-bottom-color: ${({ theme }) => theme.global.colors.border.light};
  }
  &:hover {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : theme.global.colors['light-1']};
  }
  /* &:hover {
  } */
`;
// @media (min-width: ${({ theme }) => theme.breakpointsMin.medium}) {
//   padding: 10px 16px 10px 12px;
// }
