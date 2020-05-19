/**
 *
 * AsideNavTypologyButton
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Text } from 'grommet';

const getSize = level => {
  if (level === 0) return 'xlarge';
  if (level === 1) return 'large';
  return 'medium';
};

// prettier-ignore
const StyledButton = styled(props => <Button {...props} plain />)`
  padding: ${({ theme }) => theme.global.edgeSize.small};
  border-top: 1px solid;
  border-top-color: ${({ theme }) => theme.global.colors.border.light};
  background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : 'transparent'};
  &:last-child {
    border-bottom: 1px solid;
    border-bottom-color: ${({ theme }) => theme.global.colors.border.light};
  }
  &:hover {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : theme.global.colors['light-1']};
  }
`;

function AsideNavTypologyButton({ id, name, level, ...rest }) {
  return (
    <StyledButton
      label={<Text size={getSize(level)}>{`${id} ${name}`}</Text>}
      {...rest}
    />
  );
}

AsideNavTypologyButton.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  level: PropTypes.number,
};

export default AsideNavTypologyButton;
