/**
 *
 * TypologyImage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Image } from 'grommet';

import TopGraphic from 'components/TopGraphic';
import { PATHS } from 'config';

import commonMessages from 'messages';

const Info = styled(Box)`
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

const mapVerticalAlignment = align => {
  switch (align) {
    case 'start':
    case 'top':
      return 'start';
    case 'end':
    case 'bottom':
      return 'end';
    default:
      return 'center';
  }
};

function TypologyImage({ typology, locale }) {
  return (
    <TopGraphic direction="row">
      {typology.image && (
        <>
          <Image
            fill="horizontal"
            fit="cover"
            src={`${PATHS.IMAGES}/${typology.image.name || typology.path}.jpg`}
            alignSelf={
              typology.image.verticalAlign
                ? mapVerticalAlignment(typology.image.verticalAlign)
                : 'center'
            }
          />
          {(typology.image.credit || typology.image.caption) && (
            <Info align="end">
              {typology.image.caption && (
                <Caption>{typology.image.caption[locale]}</Caption>
              )}
              {typology.image.caption && (
                <Credit>
                  <FormattedMessage {...commonMessages.imageCreditBy} />
                  {typology.image.credit[locale]}
                </Credit>
              )}
            </Info>
          )}
        </>
      )}
    </TopGraphic>
  );
}

TypologyImage.propTypes = {
  typology: PropTypes.object,
  locale: PropTypes.string,
};

export default TypologyImage;
