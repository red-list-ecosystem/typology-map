import styled from 'styled-components';
import { Paragraph } from 'grommet';

export default styled(Paragraph)`
  position: relative;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    font-weight: 600;
  }
`;
