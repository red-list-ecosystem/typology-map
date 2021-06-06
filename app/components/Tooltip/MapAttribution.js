/**
 *
 * Map
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box, Button, Heading, Paragraph, Text } from 'grommet';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import ButtonText from 'components/ButtonText';

import messages from './messages';

const StyledHeading = styled(Heading)`
  margin: 0;
`;

const AttLink = styled(p => <Button plain as="a" target="_blank" {...p} />)`
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
`;

const AttLinkUnderlined = styled(AttLink)`
  text-decoration: underline !important;
`;

export function MapAttribution({ onFeedbackClick, intl }) {
  return (
    <Box
      pad="small"
      margin={{ bottom: 'xsmall' }}
      background="white"
      elevation="small"
      width={{ max: 'medium' }}
    >
      <StyledHeading level={5}>
        <FormattedMessage {...messages.mapAttribution} />
      </StyledHeading>
      <Box margin={{ vertical: 'small' }}>
        <StyledHeading level={6}>
          <FormattedMessage {...messages.mapAttributionGroupsTitle} />
        </StyledHeading>
        <Paragraph size="xxsmall" margin={{ bottom: 'xsmall' }}>
          <FormattedMessage {...messages.mapAttributionGroupsInfo} />
        </Paragraph>
        <ButtonText
          onClick={() => onFeedbackClick()}
          label={
            <Text size="xxsmall">
              <FormattedMessage {...messages.mapAttributionGroupsLink} />
            </Text>
          }
        />
      </Box>
      <Box>
        <StyledHeading level={6}>
          <FormattedMessage {...messages.mapAttributionBasemapsTitle} />
        </StyledHeading>
        <Paragraph size="xxsmall" margin={{ bottom: 'xsmall' }}>
          <FormattedMessage {...messages.mapAttributionBasemapsInfo} />
        </Paragraph>
        <AttLink href="https://www.mapbox.com/about/maps/">© Mapbox</AttLink>
        <AttLink href="http://www.openstreetmap.org/copyright">
          © OpenStreetMap
        </AttLink>
        <AttLinkUnderlined href="https://www.mapbox.com/map-feedback/">
          <FormattedMessage {...messages.mapAttributionBasemapsLink} />
        </AttLinkUnderlined>
      </Box>
      <Box margin={{ vertical: 'small' }}>
        <StyledHeading level={6}>
          <FormattedMessage {...messages.mapAttributionRegionsTitle} />
        </StyledHeading>
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
    </Box>
  );
}

MapAttribution.propTypes = {
  onFeedbackClick: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(MapAttribution);
