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

import messages from './messages';

import SectionTitle from './SectionTitle';
import SectionInner from './SectionInner';
import SectionOuter from './SectionOuter';

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
`;

const ImageWrap = styled(Box)`
  width: 50%;
  @media (min-width: 500px) {
    width: 25%;
  }
`;

export function SectionThanks({ intl }) {
  return (
    <SectionOuter background="light-2">
      <SectionInner>
        <Box>
          <SectionTitle small>
            <FormattedMessage {...messages.titleSectionThanks} />
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
SectionThanks.propTypes = {
  intl: intlShape.isRequried,
};

export default injectIntl(SectionThanks);
