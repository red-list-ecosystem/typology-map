/**
 *
 * TypologyImage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Box } from 'grommet';
import styled from 'styled-components';

import ImageInfo from 'components/ImageInfo';
import { PATHS } from 'config';

const ImageWrap = styled(props => (
  <Box margin={props.inText ? { vertical: 'medium' } : {}} {...props} />
))`
  position: relative;
  max-height: ${({ inText }) => (inText ? 400 : 'auto')}px;
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

function TypologyImage({ typology, inText, locale }) {
  const { image } = typology;
  const [imageExists, setImageExists] = useState(true);
  return !imageExists ? null : (
    <ImageWrap inText={inText}>
      <Image
        fill
        fit="cover"
        src={`${PATHS.IMAGES}/${image ? image.name : typology.path}.jpg`}
        onError={() => setImageExists(false)}
        alignSelf={
          image && image.verticalAlign
            ? mapVerticalAlignment(typology.image.verticalAlign)
            : 'center'
        }
      />
      {image && (image.credit || image.caption) && (
        <ImageInfo
          caption={image.caption && image.caption[locale]}
          credit={image.credit && image.credit[locale]}
        />
      )}
    </ImageWrap>
  );
}

TypologyImage.propTypes = {
  typology: PropTypes.object,
  locale: PropTypes.string,
  inText: PropTypes.bool,
};

export default TypologyImage;
