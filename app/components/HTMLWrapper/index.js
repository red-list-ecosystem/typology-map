import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'html-react-parser';
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
  return (
    <div className={`rle-html ${classNames.join(' ')}`}>
      {!innerhtml && <LoadingIndicator />}
      {innerhtml &&
        ReactHtmlParser(innerhtml, {
          transform: (node, index) => {
            if (
              truncate &&
              !show &&
              node.parent &&
              !node.parent.parent &&
              index > 0
            ) {
              return null;
            }
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
              const inj = inject.find(
                ({ tag }) => tag === node.children[0].data,
              );
              return inj ? <span key={index}>{inj.el}</span> : undefined;
            }
            if (
              needsConsentClass &&
              consentPlaceholder &&
              node.attribs &&
              node.attribs.class &&
              node.attribs.class.split(' ').indexOf(needsConsentClass) > -1
            ) {
              return <div key={index}>{consentPlaceholder}</div>;
            }
            return undefined;
          },
        })}
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
