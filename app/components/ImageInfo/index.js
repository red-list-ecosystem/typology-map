/**
 *
 * ImageInfo
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import commonMessages from 'messages';

const Styled = styled(Box)`
  position: absolute;
  right: 0;
  bottom: 0;
`;

const Caption = styled.div`
  background: rgba(0, 0, 0, 0.6);
  color: white;
  padding: 0px 5px;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
`;

const Credit = styled(Caption)`
  text-transform: none;
  padding: 0px 4px;
`;

function ImageInfo({ caption, credit }) {
  return (
    <Styled align="end">
      {caption && <Caption>{caption}</Caption>}
      {credit && (
        <Credit>
          <FormattedMessage {...commonMessages.imageCreditBy} />
          {credit}
        </Credit>
      )}
    </Styled>
  );
}

ImageInfo.propTypes = {
  credit: PropTypes.string,
  caption: PropTypes.string,
};

export default ImageInfo;
