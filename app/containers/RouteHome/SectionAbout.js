/*
 * SectionAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import ButtonText from 'components/ButtonText';

import SectionTitle from 'components/styled/SectionTitle';
import SectionInner from 'components/styled/SectionInner';
import SectionOuter from 'components/styled/SectionOuter';
import SectionTeaser from 'components/styled/SectionTeaser';

import messages from './messages';

const ButtonAbout = styled(ButtonText)`
  display: block;
  margin-bottom: 6px;
  &:focus {
    color: ${({ theme }) => theme.global.colors.brand};
  }
`;

export function SectionAbout({ links }) {
  return (
    <SectionOuter background="white">
      <SectionInner>
        <SectionTitle>
          <FormattedMessage {...messages.titleSectionAbout} />
        </SectionTitle>
        <SectionTeaser>
          <FormattedMessage {...messages.teaserSectionAbout} />
        </SectionTeaser>
        {links && (
          <div>
            {links.map(l => (
              <ButtonAbout key={l.id} onClick={() => l.nav()} label={l.title} />
            ))}
          </div>
        )}
      </SectionInner>
    </SectionOuter>
  );
}

SectionAbout.propTypes = {
  links: PropTypes.array,
};

export default SectionAbout;
