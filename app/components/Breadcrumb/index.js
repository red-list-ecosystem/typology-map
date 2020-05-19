import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Button, Text } from 'grommet';
import { FormNext } from 'grommet-icons';

import commonMessages from 'messages';
// prettier-ignore
const Styled = styled(Box)``;

const StyledButton = styled(props => <Button {...props} plain />)`
  text-decoration: underline;
`;

function Breadcrumb({ targets, level }) {
  return (
    <Styled direction="row" wrap align="center">
      {level === 0 && (
        <Text>
          <FormattedMessage {...commonMessages.typology.realm} />
        </Text>
      )}
      {level > 0 && targets && targets.length > 0 && (
        <StyledButton
          onClick={() => targets[0]()}
          label={<FormattedMessage {...commonMessages.typology.realm} />}
        />
      )}
      <FormNext />
      {level < 1 && (
        <Text color="dark-4">
          <FormattedMessage {...commonMessages.typology.biome} />
        </Text>
      )}
      {level === 1 && (
        <Text>
          <FormattedMessage {...commonMessages.typology.biome} />
        </Text>
      )}
      {level > 1 && targets && targets.length > 1 && (
        <StyledButton
          onClick={() => targets[1]()}
          label={<FormattedMessage {...commonMessages.typology.biome} />}
        />
      )}
      <FormNext />
      {level < 2 && (
        <Text color="dark-4">
          <FormattedMessage {...commonMessages.typology.group} />
        </Text>
      )}
      {level === 2 && (
        <Text>
          <FormattedMessage {...commonMessages.typology.group} />
        </Text>
      )}
    </Styled>
  );
}

Breadcrumb.propTypes = {
  level: PropTypes.number,
  targets: PropTypes.array,
};

export default Breadcrumb;
