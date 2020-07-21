import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

export default styled(p => <Box gap="xsmall" {...p} />)`
  position: absolute;
  left: ${({ theme, position }) =>
    position === 'left' ? theme.global.edgeSize.small : 'auto'};
  right: ${({ theme, position }) =>
    position === 'right' ? theme.global.edgeSize.small : 'auto'};
  top: ${({ theme }) => theme.global.edgeSize.small};
  z-index: 401;
`;
