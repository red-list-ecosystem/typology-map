import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

const Hint = styled(p => (
  <Box pad={{ top: 'ms', horizontal: 'small' }} {...p} />
))`
  font-style: italic;
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  font-size: ${({ theme, size }) => theme.text[size || 'small'].size};
  line-height: ${({ theme, size }) => theme.text[size || 'small'].height};
`;

export default Hint;
