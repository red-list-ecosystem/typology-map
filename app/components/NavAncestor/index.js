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
`;

function NavAncestor({ onClick, id, name, type }) {
  return (
    <Box direction="row" gap="small">
      <Text>
        <FormattedMessage {...commonMessages.typology[type]} />
        {`:`}
      </Text>
      <StyledButton onClick={() => onClick()} label={`${id} ${name}`} />
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
