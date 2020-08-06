/**
 *
 */
import styled from 'styled-components';
import ButtonText from 'components/ButtonText';

const ButtonTextBold = styled(ButtonText)`
  text-decoration: none;
  color: ${({ theme }) => theme.global.colors.brand};
  font-weight: bold;
  &:hover {
    text-decoration: underline;
  }
`;

export default ButtonTextBold;
