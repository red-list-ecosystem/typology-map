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
  padding-top: ${({ theme }) => theme.global.edgeSize.small};
  padding-bottom: ${({ theme }) => theme.global.edgeSize.small};
  padding-right: ${({ theme, hasInfo }) => hasInfo ? '40px' : theme.global.edgeSize.small};
  padding-left: ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : 'transparent'};
  &:hover {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-2'] : theme.global.colors['light-1']};
  }
  &:focus {
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
  hasInfo: PropTypes.bool,
};

export default AsideNavTypologyButton;
