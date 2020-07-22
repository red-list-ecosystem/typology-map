import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

export default styled(props => <Button plain {...props} />)`
  border-radius: 9999px;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  background: rgba(255, 255, 255, 0.85);
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  opacity: 1;
  &:hover {
    background: white;
  }
`;
