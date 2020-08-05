import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled from 'styled-components';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Layer, Paragraph, Heading } from 'grommet';
import {
  selectCookieConsent,
  selectCookieConsentApp,
  selectCookieConsentChecked,
  selectCookieConsentShow,
} from 'containers/App/selectors';
import {
  checkCookieConsent,
  setCookieConsent,
  navigatePage,
} from 'containers/App/actions';
import saga from 'containers/App/saga';
import { useInjectSaga } from 'utils/injectSaga';

import { PAGES } from 'config';

import ButtonPrimary from 'components/ButtonPrimary';
import ButtonText from 'components/ButtonText';

import messages from './messages';

const Styled = styled.div``;

const StyledButton = styled(ButtonPrimary)``;

const ButtonWrap = styled.div`
  text-align: center;
  margin: 0 auto;
`;

export function CookieConsent({
  init,
  cookieConsent,
  cookieConsentApp,
  onConsent,
  checked,
  navPrivacy,
  show,
}) {
  useInjectSaga({ key: 'app', saga });
  useEffect(() => {
    init();
  }, []);

  const consentUnset =
    cookieConsent !== 'true' &&
    cookieConsent !== 'false' &&
    cookieConsentApp !== 'true' &&
    cookieConsentApp !== 'false';
  // console.log('Show cookie consent dialogue: ', checked && consentUnset);
  // console.log('Cookie consent cookie status: ', cookieConsent);
  // console.log('Cookie consent app status: ', cookieConsentApp);
  // console.log('Cookie consent checked: ', checked);

  return (
    <Styled>
      {(show || (checked && consentUnset)) && (
        <Layer
          position="bottom-right"
          plain
          responsive={false}
          modal={false}
          animate={false}
          margin="small"
        >
          <Box
            pad={{ vertical: 'small', horizontal: 'medium' }}
            background="white"
            style={{ maxWidth: '100%', width: '360px' }}
            elevation="large"
          >
            <Heading level={3}>
              <FormattedMessage {...messages.title} />
            </Heading>
            <Paragraph
              margin={{ top: 'small', bottom: 'medium' }}
              size="medium"
            >
              <FormattedMessage {...messages.info} />
            </Paragraph>
            <ButtonWrap>
              <StyledButton
                onClick={() => {
                  onConsent('true');
                }}
              >
                <FormattedMessage {...messages.buttonAccept} />
              </StyledButton>
              <StyledButton
                secondary
                onClick={() => {
                  onConsent('false');
                }}
              >
                <FormattedMessage {...messages.buttonReject} />
              </StyledButton>
            </ButtonWrap>
            <ButtonText
              onClick={() => navPrivacy()}
              label={<FormattedMessage {...messages.linkPrivacyPolicy} />}
            />
          </Box>
        </Layer>
      )}
    </Styled>
  );
}

CookieConsent.propTypes = {
  init: PropTypes.func,
  onConsent: PropTypes.func,
  navPrivacy: PropTypes.func,
  cookieConsent: PropTypes.string,
  cookieConsentApp: PropTypes.string,
  checked: PropTypes.bool,
  show: PropTypes.bool,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  cookieConsent: state => selectCookieConsent(state),
  cookieConsentApp: state => selectCookieConsentApp(state),
  checked: state => selectCookieConsentChecked(state),
  show: state => selectCookieConsentShow(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    init: () => dispatch(checkCookieConsent()),
    onConsent: status => dispatch(setCookieConsent(status)),
    navPrivacy: () => dispatch(navigatePage(PAGES.privacy.path)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(CookieConsent));
