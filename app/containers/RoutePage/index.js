/**
 *
 * RoutePage
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import styled from 'styled-components';

import { PATHS, PAGES } from 'config';

import { selectContentByKey } from 'containers/App/selectors';
import { loadContent } from 'containers/App/actions';

import HTMLWrapper from 'components/HTMLWrapper';
import PageBackground from 'components/PageBackground';
import Footer from 'components/Footer';
import Partners from 'components/Partners';

import { getHeaderHeight, getContentMaxWidth } from 'utils/responsive';

// import messages from './messages';
import commonMessages from 'messages';

const Styled = styled.div`
  position: relative;
  z-index: 2;
`;

// prettier-ignore
const ContentWrap = styled.div`
  position: relative;
  margin-bottom: 150px;
  min-height: 100vh;
  background: ${({ theme }) => theme.global.colors['light-2']};
  margin-top: ${250 - getHeaderHeight('small')}px;
  margin-right: auto;
  margin-left: auto;
  padding: ${({ theme }) => theme.global.edgeSize.small};
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

export function RoutePage({ match, onLoadContent, content, intl }) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.id);
  }, [match.params.id]);
  const config = PAGES[match.params.id];
  const partners = config.partners && config.partners === 'true';
  const title = commonMessages[`page_${match.params.id}`]
    ? intl.formatMessage(commonMessages[`page_${match.params.id}`])
    : '';
  return (
    <Styled>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <PageBackground
        image={{
          src: `${PATHS.IMAGES}/${config.backgroundImage}.jpg`,
          credit:
            commonMessages[`imageCredit_${match.params.id}`] &&
            intl.formatMessage(
              commonMessages[`imageCredit_${match.params.id}`],
            ),
        }}
      />
      <ContentWrap hasPad={partners}>
        <HTMLWrapper innerhtml={content} classNames={['rle-html-page']} />
        {partners && <Partners />}
      </ContentWrap>
      <Footer />
    </Styled>
  );
}

RoutePage.propTypes = {
  onLoadContent: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  match: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  content: (state, props) =>
    selectContentByKey(state, {
      contentType: 'pages',
      key: props.match.params.id,
    }),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: id => {
      dispatch(loadContent('pages', id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(RoutePage));
