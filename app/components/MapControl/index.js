import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

export default styled(props => <Button plain {...props} />)`
  border-radius: 9999px;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  opacity: 1;
`;
