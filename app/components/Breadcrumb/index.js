import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Button, Text } from 'grommet';
import { FormNext } from 'grommet-icons';

import commonMessages from 'messages';
// prettier-ignore
const Styled = styled(Box)``;

function Breadcrumb({ targets, level }) {
  return (
    <Styled direction="row" wrap>
      {level === 0 && (
        <Text>
          <FormattedMessage {...commonMessages.typology.realm} />
        </Text>
      )}
      {level > 0 && targets && targets.length > 0 && (
        <Button onClick={() => targets[0]()}>
          <Text>
            <FormattedMessage {...commonMessages.typology.realm} />
          </Text>
        </Button>
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
        <Button onClick={() => targets[1]()}>
          <Text>
            <FormattedMessage {...commonMessages.typology.biome} />
          </Text>
        </Button>
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
