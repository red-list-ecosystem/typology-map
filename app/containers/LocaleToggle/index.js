/*
 *
 * LanguageToggle
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { appLocales } from 'i18n';

import styled, { useTheme } from 'styled-components';
import { Language as LanguageIcon } from 'grommet-icons';
import { Box, Text, Button } from 'grommet';

import { setLocale } from 'containers/App/actions';
import { selectLocale } from 'containers/App/selectors';

import messages from './messages';

// prettier-ignore
const Wrapper = styled(p => <Box {...p} />)`
  padding:
    ${({ theme }) => theme.global.edgeSize.medium}
    ${({ theme }) => theme.global.edgeSize.small};
`;

// prettier-ignore
const Title = styled(p => <Text {...p} size="xsmall" />)`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  padding:
    ${({ theme }) => theme.global.edgeSize.xsmall} 0;
`;
// prettier-ignore
const Pill = styled(props => <Button {...props} plain />)`
  padding: ${({ theme }) => theme.global.edgeSize.small}
  ${({ theme }) => theme.global.edgeSize.xsmall};
  color: ${({ theme, active }) =>
    active ? theme.global.colors['brand-2'] : theme.global.colors['grey']};
  background: ${({ theme, active }) =>
    active ? theme.global.colors['light-grey'] : 'transparent'};
  border-radius: 999px;
  &:hover {
    background: ${({ theme }) => theme.global.colors['hover-grey']};
  }
`;

export function LocaleToggle({ onLocaleToggle, locale }) {
  const theme = useTheme();
  if (appLocales.length > 1) {
    return (
      <Wrapper direction="column" pad="medium" gap="small">
        <Title>
          <FormattedMessage {...messages.languageTitle} />
        </Title>
        {appLocales.map(lang => (
          <Box key={lang}>
            <Pill active={locale === lang} onClick={() => onLocaleToggle(lang)}>
              <Box
                direction="row"
                justify="between"
                align="center"
                pad={{ horizontal: 'small' }}
              >
                <Text>
                  <FormattedMessage {...messages[`${lang}Long`]} />
                </Text>
                <LanguageIcon
                  color={
                    locale === lang
                      ? theme.global.colors['brand-2']
                      : theme.global.colors['grey']
                  }
                />
              </Box>
            </Pill>
          </Box>
        ))}
      </Wrapper>
    );
  }
  return null;
}

LocaleToggle.propTypes = {
  onLocaleToggle: PropTypes.func,
  locale: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => selectLocale(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLocaleToggle: language => dispatch(setLocale(language)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
