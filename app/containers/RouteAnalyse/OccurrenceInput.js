/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Button, Box, Text } from 'grommet';
import styled from 'styled-components';

import TooltipOccurrence from 'components/Tooltip/TooltipOccurrence';

import { GROUP_LAYER_PROPERTIES } from 'config';

import commonMessages from 'messages';
import messages from './messages';

import FieldLabel from './FieldLabel';

const KeyColor = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 2px 0;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;

const TextLabel = styled(props => <Text size="small" {...props} />)``;

// prettier-ignore
const ToggleButton = styled(p => <Button plain {...p} />)`
  padding: 8px 14px;
  border-radius: 3px;
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2' : 'light-grey']};
  color: ${({ theme, active }) =>
    theme.global.colors[active ? 'white' : 'black']};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    background: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2-dark' : 'light-4']};
    color: ${({ theme, active }) =>
    theme.global.colors[active ? 'white' : 'black']};
  }
`;

export function OccurrenceInput({ occurrence, onSubmit }) {
  return (
    <>
      <Box
        direction="row"
        gap="small"
        align="center"
        margin={{ top: 'xxsmall', bottom: 'xsmall' }}
      >
        <FieldLabel noMargin>
          <FormattedMessage {...messages.addFiltersByOccurrenceLabel} />
        </FieldLabel>
        <TooltipOccurrence />
      </Box>
      <Box direction="row" gap="small" margin={{ top: 'xxsmall' }}>
        {Object.keys(GROUP_LAYER_PROPERTIES.OCCURRENCE).map(key => (
          <ToggleButton
            plain
            key={key}
            active={occurrence === key}
            onClick={() => {
              onSubmit(occurrence === key ? '' : key);
            }}
            label={
              <Box direction="row" align="center" gap="xsmall">
                <KeyColor
                  color={GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color}
                />
                <TextLabel>
                  <FormattedMessage
                    {...commonMessages[
                      `occurrence_${GROUP_LAYER_PROPERTIES.OCCURRENCE[key].id}`
                    ]}
                  />
                </TextLabel>
              </Box>
            }
          />
        ))}
      </Box>
    </>
  );
}

OccurrenceInput.propTypes = {
  onSubmit: PropTypes.func,
  occurrence: PropTypes.string,
};

// export default RouteExplore;
export default OccurrenceInput;
