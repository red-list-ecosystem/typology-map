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
  height: 50px;
  background-image: url(${({ src }) => src});
  background-blend-mode: multiply;
  background-color: ${({ theme }) => theme.global.colors['light-2']};
  background-size: contain;
  background-position: center center;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: 75px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: 120px;
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
        <Box direction="row" align="center">
          {LOGOS &&
            Object.values(LOGOS).map(logo => {
              const alt = `partner_${logo.id}`;
              const url = `partner_${logo.id}_url`;
              return (
                <Box key={logo.id} basis={`1/${LOGOS.length}`} pad="xsmall">
                  <ImageButton
                    plain
                    as="a"
                    href={intl.formatMessage(coreMessages[url])}
                    target="_blank"
                    src={logo.src}
                    title={intl.formatMessage(coreMessages[alt])}
                    fill="vertical"
                  />
                </Box>
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
