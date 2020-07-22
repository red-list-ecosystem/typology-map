import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';

export default styled(p => <Box gap="xsmall" {...p} />)`
  position: absolute;
  left: ${({ theme, position }) =>
    position === 'left' ? theme.global.edgeSize.xsmall : 'auto'};
  right: ${({ theme, position }) =>
    position === 'right' ? theme.global.edgeSize.xsmall : 'auto'};
  top: ${({ theme }) => theme.global.edgeSize.xsmall};
  z-index: 401;
`;
