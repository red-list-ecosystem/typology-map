/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Button, Text } from 'grommet';
import styled from 'styled-components';

import commonMessages from 'messages';

const StyledButton = styled(Button)`
  background: #f5f6f5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export function CardRealm({ onCardClick, label, realm, ...rest }) {
  return (
    <Box
      basis="1/4"
      responsive={false}
      pad="small"
      align="start"
      style={{ position: 'relative' }}
      {...rest}
    >
      <StyledButton onClick={onCardClick} fill plain>
        <Box
          fill
          margin={{
            top: 'xsmall',
            bottom: 'small',
          }}
          pad={{
            horizontal: 'small',
          }}
        >
          <h4>{label}</h4>
          <Box direction="row" gap="xsmall">
            <Text>{realm.biomeNo}</Text>
            <FormattedMessage
              {...commonMessages.typology[
                realm.biomeNo === 1 ? 'biome' : 'biomes'
              ]}
            />
          </Box>
          <Box direction="row" gap="xsmall">
            <Text>{realm.groupNo}</Text>
            <FormattedMessage
              {...commonMessages.typology[
                realm.groupNo === 1 ? 'group' : 'groups'
              ]}
            />
          </Box>
        </Box>
      </StyledButton>
    </Box>
  );
}

CardRealm.propTypes = {
  onCardClick: PropTypes.func,
  label: PropTypes.string,
  realm: PropTypes.object,
};

export default CardRealm;
