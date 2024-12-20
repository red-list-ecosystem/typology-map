import React, { useState } from 'react';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';

import LoadingIndicator from 'components/LoadingIndicator';
import ButtonTextBold from 'components/ButtonTextBold';

import { navigate } from 'containers/App/actions';

import messages from './messages';

// <div
// className="rle-html"
// dangerouslySetInnerHTML={{ __html: setLinkTarget(innerhtml) }}
// />
const HTMLWrapper = ({
  innerhtml,
  onNavigate,
  classNames = [],
  inject,
  needsConsentClass,
  consentPlaceholder,
  truncate,
}) => {
  const [show, setShow] = useState(false);
  // console.log('HTMLWrapper', innerhtml, classNames, inject, needsConsentClass, consentPlaceholder)
  return (
    <div className={`rle-html ${classNames.join(' ')}`}>
      {!innerhtml && <LoadingIndicator />}
      {innerhtml &&
        parse(
          innerhtml,
          {
            transform(reactNode, domNode, index) {
              // console.log('reactNode', reactNode, domNode)
              if (
                truncate &&
                !show &&
                reactNode.parent &&
                !reactNode.parent.parent &&
                index > 0
              ) {
                return null;
              }
              if (reactNode.name === 'a' && reactNode.attribs && reactNode.attribs.href) {
                if (reactNode.attribs.href.indexOf('/explore') === 0) {
                  return (
                    <a
                      key={index}
                      href={reactNode.attribs.href}
                      onClick={e => {
                        e.preventDefault();
                        onNavigate(
                          reactNode.attribs.href.replace('/explore', 'explore'),
                        );
                      }}
                    >
                      {reactNode.children[0].data}
                    </a>
                  );
                }
                return (
                  <a key={index} href={reactNode.attribs.href} target="_blank">
                    {reactNode.children[0].data}
                  </a>
                );
              }
              // console.log('inject', inject)
              // console.log('reactNode', reactNode)
              // console.log('domNode', domNode)
              if (
                inject &&
                inject.length > 0 &&
                inject.find(({ tag }) => reactNode === tag)
              ) {
                const inj = inject.find(
                  ({ tag }) => tag === reactNode,
                );
                return (inj && inj.el) ? <span key={index}>{inj.el()}</span> : reactNode;
              }
              if (
                needsConsentClass &&
                consentPlaceholder &&
                reactNode.attribs &&
                reactNode.attribs.class &&
                reactNode.attribs.class.split(' ').indexOf(needsConsentClass) > -1
              ) {
                return <div key={index}>{consentPlaceholder}</div>;
              }
              return reactNode;
            },
          },
        )}
      {truncate && !show && (
        <ButtonTextBold
          onClick={() => setShow(true)}
          style={{ marginBottom: '30px' }}
        >
          <FormattedMessage {...messages.showMore} />
        </ButtonTextBold>
      )}
    </div>
  );
};

HTMLWrapper.propTypes = {
  /* the inner HTML text */
  innerhtml: PropTypes.string,
  onNavigate: PropTypes.func,
  classNames: PropTypes.array,
  inject: PropTypes.array,
  needsConsentClass: PropTypes.string,
  truncate: PropTypes.bool,
  consentPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

function mapDispatchToProps(dispatch) {
  return {
    onNavigate: location => dispatch(navigate(location)),
  };
}

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(HTMLWrapper);
