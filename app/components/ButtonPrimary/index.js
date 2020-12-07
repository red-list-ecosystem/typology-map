/**
 *
 */
import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

// prettier-ignore
const ButtonPrimary = styled(props => <Button plain {...props} />)`
  font-weight: 600;
  position: relative;
  background: ${({ theme }) => theme.global.colors.brand};
  color: ${({ theme }) => theme.global.colors.white};
  border-radius: 18px;
  padding: ${({ icon, reverse }) => {
    if (icon && !reverse) return '4px 22px 4px 16px';
    if (icon && reverse) return '4px 16px 4px 22px';
    return '4px 22px';
  }};
  &:hover {
    background: ${({ theme, disabled }) =>
    theme.global.colors[disabled ? 'brand' : 'brand-dark']};
  }
`;

export default ButtonPrimary;
