import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
// import styled from 'styled-components';
import { Box, Paragraph, Heading } from 'grommet';

import { GROUP_LAYER_PROPERTIES } from 'config';

import Tooltip from 'components/Tooltip';
import commonMessages from 'messages';
import messages from './messages';

function TooltipOccurrence() {
  return (
    <Tooltip
      large
      color="light-grey"
      component={
        <Box flex={false}>
          <Heading level={5} style={{ margin: '10px 0 5px' }}>
            <FormattedMessage {...commonMessages.occurrence} />
          </Heading>
          <Paragraph margin={{ bottom: 'small' }}>
            <FormattedMessage {...messages.occurrenceIntro} />
          </Paragraph>
          {Object.keys(GROUP_LAYER_PROPERTIES.OCCURRENCE).map(key => {
            const { id } = GROUP_LAYER_PROPERTIES.OCCURRENCE[key];
            return (
              <Paragraph
                key={key}
                size="small"
                margin={{ top: 'none', bottom: 'small' }}
              >
                <strong>
                  <FormattedMessage {...commonMessages[`occurrence_${id}`]} />
                  {`: `}
                </strong>
                <FormattedMessage {...messages[`occurrence_${id}`]} />
              </Paragraph>
            );
          })}
        </Box>
      }
    />
  );
}

export default TooltipOccurrence;
