/**
 *
 * NavAncestor
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Text } from 'grommet';

import commonMessages from 'messages';

const StyledButton = styled(props => <Button plain {...props} />)`
  text-decoration: underline;
  &:hover {
    color: ${({ theme }) => theme.global.colors.brand};
  }
  &:focus {
    color: ${({ theme }) => theme.global.colors.brand};
  }
`;

const Label = styled(p => <Text size="small" {...p} />)`
  min-width: 50px;
  margin-right: ${({ theme }) => theme.global.edgeSize.small};
`;

function NavAncestor({ onClick, id, name, type }) {
  return (
    <Box direction="row" gap="small" align="center">
      <Label>
        <FormattedMessage {...commonMessages[type]} />
      </Label>
      <StyledButton
        onClick={() => onClick()}
        label={<Text size="small">{`${id} ${name}`}</Text>}
      />
    </Box>
  );
}

NavAncestor.propTypes = {
  type: PropTypes.string.isRequired,
  id: PropTypes.string,
  name: PropTypes.string,
  onClick: PropTypes.func,
};

export default NavAncestor;
