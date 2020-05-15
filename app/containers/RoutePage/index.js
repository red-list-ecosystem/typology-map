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
// import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';

import { selectContentByKey } from 'containers/App/selectors';
import { loadContent } from 'containers/App/actions';

import HTMLWrapper from 'components/HTMLWrapper';

// import messages from './messages';

export function RoutePage({ match, onLoadContent, content }) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(match.params.id);
  }, [match.params.id]);

  return (
    <div>
      <Helmet>
        <title>RoutePage</title>
        <meta name="description" content="Description of RoutePage" />
      </Helmet>
      <div>{content && <HTMLWrapper innerhtml={content} />}</div>
    </div>
  );
}

RoutePage.propTypes = {
  onLoadContent: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  match: PropTypes.object,
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

export default compose(withConnect)(RoutePage);
