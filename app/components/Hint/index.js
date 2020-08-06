import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

const Hint = styled(p => (
  <Box pad={{ top: 'ms', horizontal: 'small' }} {...p} />
))`
  font-style: italic;
  color: ${({ theme }) => theme.global.colors['dark-grey']};
`;

export default Hint;
