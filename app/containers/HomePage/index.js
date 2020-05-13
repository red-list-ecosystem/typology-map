/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { loadTypologyConfig } from 'containers/App/actions';
import {
  selectTypology,
  // selectTypologyByKey,
} from 'containers/App/selectors';

import H2 from 'components/H2';
import CenteredSection from './CenteredSection';
import Section from './Section';
// import commonMessages from 'messages';

export function HomePage({ onLoadTypology, typologies }) {
  useEffect(() => {
    onLoadTypology();
  }, []);

  console.log(typologies);
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

HomePage.propTypes = {
  onLoadTypology: PropTypes.func,
  typologies: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  typologies: state => selectTypology(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onLoadTypology: () => {
      dispatch(loadTypologyConfig('realms'));
      dispatch(loadTypologyConfig('biomes'));
      dispatch(loadTypologyConfig('groups'));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(HomePage);
