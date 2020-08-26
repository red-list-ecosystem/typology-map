import React from 'react';
import { Text } from 'grommet';
import styled from 'styled-components';

const Hint = styled(p => <Text color="dark-grey" size="small" {...p} />)`
  font-style: italic;
`;

export default Hint;
