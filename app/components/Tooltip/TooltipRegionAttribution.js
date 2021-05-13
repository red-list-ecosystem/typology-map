import React from 'react';
// import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import styled from 'styled-components';
import { Box, Paragraph, Heading, Button } from 'grommet';

import Tooltip from 'components/Tooltip';
import messages from './messages';

const AttLinkUnderlined = styled(p => (
  <Button plain as="a" target="_blank" {...p} />
))`
  text-decoration: none;
  font-size: ${({ theme }) => theme.text.xxsmall.size};
  line-height: ${({ theme }) => theme.text.xxsmall.height};
  color: ${({ theme }) => theme.global.colors.text.light};
  &:visited {
    color: ${({ theme }) => theme.global.colors.text.light};
  }
  &:hover {
    color: ${({ theme }) => theme.global.colors.brand};
  }
  text-decoration: underline !important;
`;

function TooltipRegionAttribution({ intl }) {
  return (
    <Tooltip
      large
      color="light-grey"
      component={
        <Box flex={false} margin={{ bottom: 'xsmall' }}>
          <Heading level={5} style={{ margin: '10px 0 5px' }}>
            <FormattedMessage {...messages.mapAttributionRegionsTitle} />
          </Heading>
          <Paragraph size="xxsmall" margin={{ bottom: 'xsmall' }}>
            <FormattedMessage {...messages.mapAttributionRegionsInfoADM} />
          </Paragraph>
          <AttLinkUnderlined
            href={intl.formatMessage(messages.mapAttributionRegionsLinkURLADM)}
          >
            <FormattedMessage {...messages.mapAttributionRegionsLinkADM} />
          </AttLinkUnderlined>
          <Paragraph size="xxsmall" margin={{ bottom: 'xsmall' }}>
            <FormattedMessage {...messages.mapAttributionRegionsInfoLME} />
          </Paragraph>
          <AttLinkUnderlined
            href={intl.formatMessage(messages.mapAttributionRegionsLinkURLLME)}
          >
            <FormattedMessage {...messages.mapAttributionRegionsLinkLME} />
          </AttLinkUnderlined>
        </Box>
      }
    />
  );
}

TooltipRegionAttribution.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(TooltipRegionAttribution);
