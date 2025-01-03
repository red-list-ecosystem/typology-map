import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

// prettier-ignore
const Secondary = styled(React.forwardRef((props, ref) => (
  <Button plain ref={ref} {...props} fill="vertical" />
)))`
  padding: ${({ theme }) => theme.global.edgeSize.small};
  color: ${({ theme }) => theme.global.colors.white};
  background: ${({ active, theme }) => (active ? theme.global.colors.brand : 'transparent')};
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  }
  &:focus-visible,
  &:hover {
    background: ${({ theme }) => theme.global.colors.hover};
  }
`;

export default Secondary;
