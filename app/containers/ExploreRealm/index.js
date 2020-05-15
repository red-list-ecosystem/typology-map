/**
 *
 * ExploreRealm
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
// import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { selectContentByKey } from 'containers/App/selectors';
import { loadContent } from 'containers/App/actions';

import HTMLWrapper from 'components/HTMLWrapper';

export function ExploreRealm({ id, onLoadContent, content }) {
  useEffect(() => {
    // kick off loading of page content
    onLoadContent(id);
  }, [id]);
  return (
    <div>
      <Helmet>
        <title>ExploreRealm</title>
        <meta name="description" content="Description of ExploreRealm" />
      </Helmet>
      <div>{content && <HTMLWrapper innerhtml={content} />}</div>
    </div>
  );
}

ExploreRealm.propTypes = {
  id: PropTypes.string.isRequired,
  onLoadContent: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  content: (state, props) =>
    selectContentByKey(state, {
      contentType: 'pages',
      key: props.id,
    }),
});

function mapDispatchToProps(dispatch) {
  return {
    onLoadContent: id => {
      dispatch(loadContent('realms', id));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(ExploreRealm);
