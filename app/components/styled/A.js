/**
 * A link to a certain page, an anchor tag
 */

import styled from 'styled-components';

const A = styled.a`
  color: ${({ theme }) => theme.global.colors.brand};
  font-weight: 600;
  text-decoration: none;
  &:visited {
    color: ${({ theme }) => theme.global.colors.brand};
  }
  &:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.global.colors['brand-dark']};
  }
  &:focus {
    text-decoration: underline;
    color: ${({ theme }) => theme.global.colors['brand-dark']};
    outline: 0;
  }
`;

export default A;
