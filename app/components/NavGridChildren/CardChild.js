/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Button, Text, ResponsiveContext } from 'grommet';
import styled from 'styled-components';

import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

const StyledButton = styled(Button)`
  background: #f5f6f5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

export function CardChild({ onCardClick, label, typology, type, ...rest }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          basis={isMinSize(size, 'large') ? '1/4' : 'auto'}
          fill={isMinSize(size, 'large') ? false : 'horizontal'}
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
              <h4>
                <Text margin={{ right: 'xsmall' }}>{typology.id}</Text>
                <Text>{label}</Text>
              </h4>
              {type === 'biomes' && (
                <Box direction="row" gap="xsmall">
                  <Text>{typology.groupNo}</Text>
                  <FormattedMessage
                    {...commonMessages[
                      typology.groupNo === 1 ? 'group' : 'groups'
                    ]}
                  />
                </Box>
              )}
            </Box>
          </StyledButton>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardChild.propTypes = {
  onCardClick: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  typology: PropTypes.object,
};

export default CardChild;
