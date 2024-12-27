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

import styled from 'styled-components';
import { Language } from 'grommet-icons';
import { Box, Text, Button } from 'grommet';

import { setLocale } from 'containers/App/actions';
import { selectLocale } from 'containers/App/selectors';

import messages from './messages';

// prettier-ignore
const Wrapper = styled(p => <Box {...p} />)`
  padding:
    ${({ theme }) => theme.global.edgeSize.xsmall}
    ${({ theme }) => theme.global.edgeSize.medium};
`;

// prettier-ignore
const Title = styled(p => <Text {...p} size="xsmall" />)`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  padding:
    ${({ theme }) => theme.global.edgeSize.xsmall} 0;
`;
const Pill = styled(props => <Button {...props} plain />)`
  padding: ${({ theme }) => theme.global.edgeSize.xsmall};
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  background: ${({ theme }) => theme.global.colors['light-grey']};
  border-radius: 999px;
`;

export function LocaleToggle({ onLocaleToggle }) {
  if (appLocales.length > 1) {
    return (
      <Wrapper
        direction="column"
        pad={{ horizontal: 'medium', vertical: 'small' }}
        gap="small"
      >
        <Title>
          <FormattedMessage {...messages.languageTitle} />
        </Title>
        {appLocales.map(lang => (
          <Box key={lang}>
            <Pill onClick={() => onLocaleToggle(lang)}>
              <Box
                direction="row"
                justify="between"
                pad={{ horizontal: 'small' }}
              >
                <Text>
                  <FormattedMessage {...messages[`${lang}Long`]} />
                </Text>
                <Language />
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
    onLocaleToggle: evt => dispatch(setLocale(evt.target.value)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LocaleToggle);
