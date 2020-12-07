/**
 *
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import Hint from 'components/Hint';
import commonMessages from 'messages';

const HintWrap = styled(({ wrap, ...p }) => (
  <Box pad={{ top: 'ms', horizontal: wrap ? 'small' : '0' }} {...p} />
))``;

export function RelatedHint({ typology, realms, wrap = true }) {
  return (
    <>
      {typology.type === 'core' && realms && (
        <HintWrap wrap={wrap}>
          <Hint>
            <FormattedMessage
              {...commonMessages.relatedHintTrans}
              values={{
                count: realms && realms.filter(r => r.type === 'trans').length,
              }}
            />
          </Hint>
        </HintWrap>
      )}
      {typology.type === 'trans' && realms && (
        <HintWrap wrap={wrap}>
          <Hint>
            <FormattedMessage
              {...commonMessages.relatedHintCore}
              values={{
                count: realms && realms.filter(r => r.type === 'core').length,
              }}
            />
          </Hint>
        </HintWrap>
      )}
    </>
  );
}

RelatedHint.propTypes = {
  typology: PropTypes.object.isRequired,
  realms: PropTypes.array,
  wrap: PropTypes.bool,
};

export default RelatedHint;
