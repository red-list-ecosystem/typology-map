import React from 'react';
import { Box } from 'grommet';
import styled from 'styled-components';

const HintWrap = styled(p => (
  <Box pad={{ top: 'ms', horizontal: 'small' }} {...p} />
))``;

export default HintWrap;
