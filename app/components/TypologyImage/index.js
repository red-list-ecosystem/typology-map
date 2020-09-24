/**
 *
 * TypologyImage
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Box } from 'grommet';
import styled from 'styled-components';

import LoadingIndicator from 'components/LoadingIndicator';
import ImageInfo from 'components/ImageInfo';
import { PATHS } from 'config';

const ImageWrap = styled(props => (
  <Box margin={props.inText ? { vertical: 'medium' } : {}} {...props} />
))`
  position: relative;
  max-height: ${({ inText }) => (inText ? '400px' : 'none')};
  width: 100%;
`;

const LoadingWrap = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
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
  const [loaded, setLoaded] = useState(false);
  const src = `${PATHS.IMAGES}/${
    image && image.name ? image.name : typology.path
  }`;
  return !imageExists ? null : (
    <ImageWrap inText={inText}>
      {!loaded && (
        <LoadingWrap>
          <LoadingIndicator />
        </LoadingWrap>
      )}
      <Box as="figure">
        <Image
          fill
          fit="cover"
          src={`${src}.jpg`}
          onError={() => setImageExists(false)}
          onLoad={() => setLoaded(true)}
          alignSelf={
            image && image.verticalAlign
              ? mapVerticalAlignment(typology.image.verticalAlign)
              : 'center'
          }
        />
        {image && (image.credit || image.caption) && (
          <ImageInfo
            caption={
              image.caption &&
              image.caption[locale] &&
              image.caption[locale].trim() !== '' &&
              image.caption[locale]
            }
            credit={
              image.credit &&
              image.credit[locale] &&
              image.credit[locale].trim() !== '' &&
              image.credit[locale]
            }
          />
        )}
      </Box>
    </ImageWrap>
  );
}

TypologyImage.propTypes = {
  typology: PropTypes.object,
  locale: PropTypes.string,
  inText: PropTypes.bool,
};

export default TypologyImage;
