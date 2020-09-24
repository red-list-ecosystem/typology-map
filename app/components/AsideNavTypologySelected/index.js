/**
 *
 * AsideNavTypologySelected
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Text, Button } from 'grommet';
import { Close } from 'components/Icons';

const TypologyButton = styled(props => <Button plain {...props} />)`
  &:hover {
    text-decoration: underline;
  }
  &:focus {
    text-decoration: underline;
  }
`;
// prettier-ignore
const CloseButton = styled(props => <Button plain {...props} />)`
  border-radius: 9999px;
  width: 40px;
  height: 40px;
  text-align: center;
  background: transparent;
  margin: -20px 0;
  &:hover {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-4'] : theme.global.colors['light-3']};
  }
  &:focus {
    background: ${({ theme, active }) =>
    active ? theme.global.colors['light-4'] : theme.global.colors['light-3']};
  }
`;

const getSize = level => {
  if (level === 0) return 'xlarge';
  if (level === 1) return 'large';
  return 'medium';
};

function AsideNavTypologySelected({
  level = 0,
  id,
  name,
  onDismiss,
  onTypologyClick,
  active,
}) {
  const label = <Text size={getSize(level)}>{`${id} ${name}`}</Text>;
  return (
    <Box
      direction="row"
      justify="between"
      pad="small"
      background={active ? 'light-2' : 'transparent'}
      border="horizontal"
      align="center"
    >
      {onTypologyClick && (
        <TypologyButton onClick={() => onTypologyClick()} label={label} />
      )}
      {!onTypologyClick && label}
      <CloseButton
        active={active}
        onClick={() => onDismiss()}
        icon={<Close size="large" />}
      />
    </Box>
  );
}

AsideNavTypologySelected.propTypes = {
  level: PropTypes.number,
  onDismiss: PropTypes.func,
  onTypologyClick: PropTypes.func,
  id: PropTypes.string,
  name: PropTypes.string,
  active: PropTypes.bool,
};

export default AsideNavTypologySelected;
