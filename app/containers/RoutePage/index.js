/**
 *
 * RoutePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet';
import { injectIntl, FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';
import { Box, Text } from 'grommet';
import { PATHS, PAGES } from 'config';

import { selectContentByKey, selectConfig } from 'containers/App/selectors';
import { loadContent, loadConfig } from 'containers/App/actions';
import { selectCookieConsent } from 'containers/CookieConsent/selectors';
import { showCookieConsent } from 'containers/CookieConsent/actions';

import ButtonTextBold from 'components/ButtonTextBold';
import HTMLWrapper from 'components/HTMLWrapper';
import PageBackground from 'components/PageBackground';
import Footer from 'containers/Footer';
import Partners from 'components/Partners';

import { getHeaderHeight, getContentMaxWidth } from 'utils/responsive';

// import messages from './messages';
import commonMessages from 'messages';
import { FAQs } from './FAQs';

const Styled = styled.div`
  position: relative;
  z-index: 2;
`;

const HR = styled.hr`
  margin-top: 40px;
`;

// prettier-ignore
const ContentWrap = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.2);
  position: relative;
  margin-bottom: 150px;
  min-height: 100vh;
  background: ${({ theme }) => theme.global.colors['light-2']};
  margin-top: ${250 - getHeaderHeight('small')}px;
  margin-right: auto;
  margin-left: auto;
  padding:
    ${({ theme }) => theme.global.edgeSize.ml}
    ${({ theme }) => theme.global.edgeSize.small};
  padding-bottom: ${({ theme, hasPad }) =>
    hasPad ? '0' : theme.global.edgeSize.small};
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    margin-top: ${250 - getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    margin-top: ${250 - getHeaderHeight('large')}px;
    padding: ${({ theme }) => theme.global.edgeSize.large};
    padding-bottom: ${({ theme, hasPad }) =>
    hasPad ? '0' : theme.global.edgeSize.large};
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    margin-top: ${250 - getHeaderHeight('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    margin-top: ${250 - getHeaderHeight('xxlarge')}px;
  }
  max-width: ${getContentMaxWidth('small')}px;
  /* responsive height */
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    max-width: ${getContentMaxWidth('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    max-width: ${getContentMaxWidth('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    max-width: ${getContentMaxWidth('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    max-width: ${getContentMaxWidth('xxlarge')}px;
  }
`;

export function RoutePage({
  onLoadContent,
  onLoadData,
  intl,
  onShowCookieConsent,
}) {
  const { id } = useParams();
  const consent = useSelector(state => selectCookieConsent(state));
  const content = useSelector(state =>
    selectContentByKey(state, {
      contentType: 'pages',
      key: id,
    }),
  );
  const data = useSelector(state =>
    selectConfig(state),
  );
  console.log('data', data);
  const pageConfig = PAGES[id];
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(id);
  }, [id]);


  useEffect(() => {
    // kick off loading of data
    if (pageConfig.path && pageConfig.type === 'faqs') {
      onLoadData(pageConfig.path);
    }
  }, [pageConfig]);

  const partners = pageConfig.partners && pageConfig.partners === 'true';
  const title = commonMessages[`page_${id}`]
    ? intl.formatMessage(commonMessages[`page_${id}`])
    : '';
  return (
    <Styled>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageBackground
        image={{
          src: `${PATHS.IMAGES}/${pageConfig.backgroundImage}.jpg`,
          credit:
            commonMessages[`imageCredit_${id}`] &&
            intl.formatMessage(commonMessages[`imageCredit_${id}`]),
        }}
      />
      <ContentWrap hasPad={partners}>
        {pageConfig.needsConsent === 'true' && consent !== 'true' && (
          <HTMLWrapper
            innerhtml={content}
            classNames={['rle-html-page']}
            needsConsentClass="rle-needs-consent"
            inject={[{ tag: '[FAQS]', el: <FAQs /> }]}
            consentPlaceholder={
              <Box
                background="light-3"
                pad={{ horizontal: 'medium', vertical: 'ms' }}
                margin={{ top: 'medium' }}
                border
                round="xsmall"
              >
                <Text style={{ fontStyle: 'italic' }}>
                  <FormattedMessage
                    {...commonMessages.requireConsent}
                    values={{
                      showConsentLink: (
                        <ButtonTextBold
                          onClick={() => onShowCookieConsent()}
                          label={intl.formatMessage(
                            commonMessages.showConsentLink,
                          )}
                        />
                      ),
                    }}
                  />
                </Text>
              </Box>
            }
          />
        )}
        {(
          pageConfig.needsConsent !== 'true' ||
          (consent === 'true' && content)
        ) && 
        data && (
          <HTMLWrapper
            innerhtml={content}
            classNames={['rle-html-page']}
            inject={[{
              tag: '[FAQS]',
              el: () => (
                <FAQs data={data && data[pageConfig.path]} />
              ),
            }]}
          />
        )}
        {content && partners && (
          <>
            <HR />
            <Partners />
          </>
        )}
      </ContentWrap>
      <Footer elevated />
    </Styled>
  );
}

RoutePage.propTypes = {
  onLoadContent: PropTypes.func.isRequired,
  onLoadData: PropTypes.func.isRequired,
  onShowCookieConsent: PropTypes.func,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  consent: PropTypes.string,
  data: PropTypes.object,
  match: PropTypes.object,
  intl: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: id => {
      dispatch(loadContent('pages', id));
    },
    onLoadData: key => {
      dispatch(loadConfig(key));
    },
    onShowCookieConsent: () => dispatch(showCookieConsent(true)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(injectIntl(RoutePage));
