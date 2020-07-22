/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

import ButtonCard from 'components/ButtonCard';

const Styled = styled(p => <Box responsive={false} align="start" {...p} />)`
  position: relative;
  padding: ${({ theme }) => theme.global.edgeSize.xsmall};
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    padding: ${({ theme }) => theme.global.edgeSize.xsmall};
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    padding: ${({ theme }) => theme.global.edgeSize.ms};
  }
`;

const Label = styled(Text)`
  font-weight: 600;
`;

const IconWrap = styled(p => <Box align="center" flex={false} {...p} />)`
  min-width: 100px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    width: 100%;
    padding: ${({ theme }) => theme.global.edgeSize.ms} 0;
  }
`;

const ChildLabel = styled(p => <Text size="small" {...p} />)``;

const ChildLabelNo = styled(ChildLabel)``;

const getCardBasis = size => {
  if (isMinSize(size, 'large')) return '1/4';
  if (isMinSize(size, 'medium')) return '1/3';
  return 'auto';
};

export function CardRealm({ onCardClick, label, realm, icon, ...rest }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          basis={getCardBasis(size)}
          fill={isMinSize(size, 'medium') ? false : 'horizontal'}
          {...rest}
        >
          <ButtonCard onClick={onCardClick}>
            <Box
              fill
              margin={{ vertical: 'xsmall' }}
              pad={{ horizontal: 'small' }}
              direction={isMinSize(size, 'medium') ? 'column' : 'row'}
              gap={isMinSize(size, 'medium') ? 'hair' : 'small'}
              align={isMinSize(size, 'medium') ? 'start' : 'center'}
              flex={{ shrink: 0 }}
            >
              <IconWrap fill={isMinSize(size, 'medium') ? 'horizontal' : false}>
                {icon}
              </IconWrap>
              <Box
                flex={isMinSize(size, 'medium')}
                pad={{
                  horizontal: 'small',
                  vertical: 'small',
                }}
                justify="between"
                fill={isMinSize(size, 'medium') ? 'horizontal' : false}
              >
                <Label>{label}</Label>
                <Box pad={{ bottom: 'small' }}>
                  <Box direction="row" gap="xsmall">
                    <ChildLabelNo>{realm.biomeNo}</ChildLabelNo>
                    <ChildLabel>
                      <FormattedMessage
                        {...commonMessages[
                          realm.biomeNo === 1 ? 'biome' : 'biomes'
                        ]}
                      />
                    </ChildLabel>
                  </Box>
                  <Box direction="row" gap="xsmall">
                    <ChildLabelNo>{realm.groupNo}</ChildLabelNo>
                    <ChildLabel>
                      <FormattedMessage
                        {...commonMessages[
                          realm.groupNo === 1 ? 'group' : 'groups'
                        ]}
                      />
                    </ChildLabel>
                  </Box>
                </Box>
              </Box>
            </Box>
          </ButtonCard>
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

CardRealm.propTypes = {
  onCardClick: PropTypes.func,
  label: PropTypes.string,
  realm: PropTypes.object,
  icon: PropTypes.node,
};

export default CardRealm;
