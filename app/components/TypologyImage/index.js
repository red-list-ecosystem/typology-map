/**
 *
 * TypologyImage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'grommet';

import TopGraphic from 'components/TopGraphic';
import ImageInfo from 'components/ImageInfo';
import { PATHS } from 'config';

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
            <ImageInfo
              caption={typology.image.caption && typology.image.caption[locale]}
              credit={typology.image.credit && typology.image.credit[locale]}
            />
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
