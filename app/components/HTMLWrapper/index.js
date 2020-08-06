import React from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import { connect } from 'react-redux';
import { compose } from 'redux';
import LoadingIndicator from 'components/LoadingIndicator';

import { navigate } from 'containers/App/actions';

/**
 * Wrap HTML text:
 * - sets global class to allow specifically targeting html markup
 *
 * @return {Component} HTMLWrapper
 */

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
}) => (
  <div className={`rle-html ${classNames.join(' ')}`}>
    {!innerhtml && <LoadingIndicator />}
    {innerhtml &&
      ReactHtmlParser(innerhtml, {
        transform: (node, index) => {
          if (node.name === 'a' && node.attribs && node.attribs.href) {
            if (node.attribs.href.indexOf('/explore') === 0) {
              return (
                <a
                  key={index}
                  href={node.attribs.href}
                  onClick={e => {
                    e.preventDefault();
                    onNavigate(
                      node.attribs.href.replace('/explore', 'explore'),
                    );
                  }}
                >
                  {node.children[0].data}
                </a>
              );
            }
            return (
              <a key={index} href={node.attribs.href} target="_blank">
                {node.children[0].data}
              </a>
            );
          }
          if (
            inject &&
            inject.length > 0 &&
            node.name === 'p' &&
            node.children &&
            node.children.length === 1 &&
            node.children[0]
          ) {
            const inj = inject.find(({ tag }) => tag === node.children[0].data);
            return inj ? <span key={index}>{inj.el}</span> : undefined;
          }
          if (
            needsConsentClass &&
            consentPlaceholder &&
            node.attribs &&
            node.attribs.class &&
            node.attribs.class.split(' ').indexOf(needsConsentClass) > -1
          ) {
            return consentPlaceholder;
          }
          return undefined;
        },
      })}
  </div>
);

HTMLWrapper.propTypes = {
  /* the inner HTML text */
  innerhtml: PropTypes.string,
  onNavigate: PropTypes.func,
  classNames: PropTypes.array,
  inject: PropTypes.array,
  needsConsentClass: PropTypes.string,
  consentPlaceholder: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

function mapDispatchToProps(dispatch) {
  return {
    onNavigate: location => dispatch(navigate(location)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(HTMLWrapper);
