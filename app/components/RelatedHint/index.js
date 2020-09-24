/**
 *
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import Hint from 'components/Hint';
import commonMessages from 'messages';

export function RelatedHint({ typology, realms }) {
  return (
    <>
      {typology.type === 'core' && realms && (
        <Hint>
          <FormattedMessage
            {...commonMessages.relatedHintTrans}
            values={{
              count: realms && realms.filter(r => r.type === 'trans').length,
            }}
          />
        </Hint>
      )}
      {typology.type === 'trans' && realms && (
        <Hint>
          <FormattedMessage
            {...commonMessages.relatedHintCore}
            values={{
              count: realms && realms.filter(r => r.type === 'core').length,
            }}
          />
        </Hint>
      )}
    </>
  );
}

RelatedHint.propTypes = {
  typology: PropTypes.object.isRequired,
  realms: PropTypes.array,
};

export default RelatedHint;
