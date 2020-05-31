/*
 * Intro
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';

import NavGridRealms from 'components/NavGridRealms';

import commonMessages from 'messages';
import messages from './messages';

import SectionTitle from './SectionTitle';
import SectionTeaser from './SectionTeaser';
import SectionInner from './SectionInner';

export function SectionExplore({
  intl,
  locale,
  realms,
  navRealm,
  title,
  teaser,
}) {
  return (
    <SectionInner>
      <SectionTitle>
        {title || <FormattedMessage {...messages.titleSectionExplore} />}
      </SectionTitle>
      <SectionTeaser>
        {teaser || <FormattedMessage {...messages.teaserSectionExplore} />}
      </SectionTeaser>
      <NavGridRealms
        label={intl.formatMessage(commonMessages.realmsCore)}
        items={realms && realms.filter(r => r.type === 'core')}
        itemClick={id => navRealm(id)}
        locale={locale}
        type="core"
      />
      <NavGridRealms
        label={intl.formatMessage(commonMessages.realmsTrans)}
        items={realms && realms.filter(r => r.type === 'trans')}
        itemClick={id => navRealm(id)}
        locale={locale}
        type="trans"
      />
    </SectionInner>
  );
}

SectionExplore.propTypes = {
  navRealm: PropTypes.func,
  intl: intlShape.isRequired,
  locale: PropTypes.string,
  title: PropTypes.string,
  teaser: PropTypes.string,
  realms: PropTypes.array,
};

export default injectIntl(SectionExplore);
