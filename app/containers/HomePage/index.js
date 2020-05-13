/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo } from 'react';
// import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';

// import { useInjectReducer } from 'utils/injectReducer';
// import { useInjectSaga } from 'utils/injectSaga';

import H2 from 'components/H2';
import CenteredSection from './CenteredSection';
import Section from './Section';
// import commonMessages from 'messages';
// import reducer from './reducer';
// import saga from './saga';

// const key = 'home';

export function HomePage() {
  // useInjectReducer({ key, reducer });
  // useInjectSaga({ key, saga });

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta name="description" content="home" />
      </Helmet>
      <div>
        <CenteredSection>
          <H2>WELCOME</H2>
        </CenteredSection>
        <Section />
      </div>
    </article>
  );
}

HomePage.propTypes = {};

// const mapStateToProps = createStructuredSelector({
//   loading: makeSelectLoading(),
//   error: makeSelectError(),
// });
//
// export function mapDispatchToProps(dispatch) {
//   return {
//   };
// }

const withConnect = connect(
  null,
  null,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
