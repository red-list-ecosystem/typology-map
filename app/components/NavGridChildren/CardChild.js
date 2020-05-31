/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Button, Text, ResponsiveContext, Image } from 'grommet';
import styled from 'styled-components';

import { isMinSize } from 'utils/responsive';
import { PATHS } from 'config';
import commonMessages from 'messages';

const StyledButton = styled(Button)`
  background: #f5f6f5;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
  }
`;

const ContentWrap = styled(Box)``;

const ImageWrap = styled(Box)`
  height: 140px;
  overflow: hidden;
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    height: 100px;
  }
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

export function CardChild({ onCardClick, label, typology, type, ...rest }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          basis={isMinSize(size, 'large') ? '1/3' : 'auto'}
          fill={isMinSize(size, 'large') ? false : 'horizontal'}
          responsive={false}
          align="start"
          style={{ position: 'relative' }}
          pad="small"
          {...rest}
        >
          <StyledButton onClick={onCardClick} fill plain>
            {type === 'biomes' && (
              <ImageWrap>
                <Image
                  fit="cover"
                  fill
                  src={`${PATHS.IMAGES}/${typology.image.name ||
                    typology.path}.jpg`}
                  alignSelf={
                    typology.image.verticalAlign
                      ? mapVerticalAlignment(typology.image.verticalAlign)
                      : 'center'
                  }
                />
              </ImageWrap>
            )}
            <ContentWrap
              margin={{
                top: 'xsmall',
                bottom: 'small',
              }}
              pad={{
                horizontal: 'small',
              }}
            >
              <h4>
                <Text margin={{ right: 'xsmall' }}>{typology.id}</Text>
                <Text>{label}</Text>
              </h4>
              {type === 'biomes' && (
                <Box direction="row" gap="xsmall">
                  <Text>{typology.groupNo}</Text>
                  <FormattedMessage
                    {...commonMessages[
                      typology.groupNo === 1 ? 'group' : 'groups'
                    ]}
                  />
                </Box>
              )}
            </ContentWrap>
          </StyledButton>
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardChild.propTypes = {
  onCardClick: PropTypes.func,
  label: PropTypes.string,
  type: PropTypes.string,
  typology: PropTypes.object,
};

export default CardChild;
