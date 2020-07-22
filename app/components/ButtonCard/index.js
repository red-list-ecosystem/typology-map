import React from 'react';
import styled from 'styled-components';
import { Button } from 'grommet';

export default styled(p => <Button fill plain {...p} />)`
  background: ${({ theme, background }) =>
    theme.global.colors[background || 'white']};
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
  &:focus {
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.2);
  }
`;
