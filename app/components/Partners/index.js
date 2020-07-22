/*
 * SectionThanks
 *
 */

import React from 'react';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Button } from 'grommet';
import { LOGOS } from 'config';
import styled from 'styled-components';

import coreMessages from 'messages';

import SectionTitle from 'components/styled/SectionTitle';
import SectionInner from 'components/styled/SectionInner';
import SectionOuter from 'components/styled/SectionOuter';

import messages from './messages';

const ImageButton = styled(Button)`
  height: 65px;
  background-image: url(${({ src }) => src});
  background-blend-mode: multiply;
  background-color: ${({ theme }) => theme.global.colors['light-2']};
  background-size: contain;
  background-position: center center;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: 80px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: 120px;
  }
  border-bottom: 1px solid transparent;
  &:focus {
    outline: 0;
    border-bottom: 1px solid ${({ theme }) => theme.global.colors.brand};
  }
`;

const ImageWrap = styled(Box)`
  width: 33%;
  @media (min-width: 500px) {
    width: ${({ count }) => 100 / count}%;
  }
`;

export function Partners({ intl }) {
  return (
    <SectionOuter background="light-2">
      <SectionInner>
        <Box>
          <SectionTitle small>
            <FormattedMessage {...messages.titleThanks} />
          </SectionTitle>
        </Box>
        <Box direction="row" align="center" wrap>
          {LOGOS &&
            Object.values(LOGOS).map(logo => {
              const alt = `partner_${logo.id}`;
              const url = `partner_${logo.id}_url`;
              return (
                <ImageWrap
                  key={logo.id}
                  pad="xsmall"
                  margin={{ bottom: 'medium' }}
                  count={Object.keys(LOGOS).length}
                >
                  <ImageButton
                    plain
                    as="a"
                    href={intl.formatMessage(coreMessages[url])}
                    target="_blank"
                    src={logo.src}
                    title={intl.formatMessage(coreMessages[alt])}
                    fill="vertical"
                  />
                </ImageWrap>
              );
            })}
        </Box>
      </SectionInner>
    </SectionOuter>
  );
}
Partners.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(Partners);
