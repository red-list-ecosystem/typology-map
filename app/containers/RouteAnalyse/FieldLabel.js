/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import { Text } from 'grommet';
import styled from 'styled-components';

const FieldLabel = styled(p => <Text {...p} size="xsmall" />)`
  margin-bottom: ${({ noMargin }) => (noMargin ? 0 : 5)}px;
`;

export default FieldLabel;
