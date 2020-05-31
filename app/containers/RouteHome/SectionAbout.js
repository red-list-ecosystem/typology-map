/*
 * SectionAbout
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import ButtonText from 'components/ButtonText';

import messages from './messages';

import SectionTitle from './SectionTitle';
import SectionTeaser from './SectionTeaser';
import SectionInner from './SectionInner';
import SectionOuter from './SectionOuter';

const ButtonAbout = styled(ButtonText)`
  display: block;
  margin-bottom: 6px;
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
