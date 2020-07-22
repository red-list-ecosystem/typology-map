/**
 *
 * Overview
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Text, ResponsiveContext } from 'grommet';

import { isMinSize } from 'utils/responsive';

import commonMessages from 'messages';

import ButtonCard from 'components/ButtonCard';

export function CardRealm({ onCardClick, label, realm, icon, ...rest }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box
          basis={isMinSize(size, 'large') ? '1/4' : 'auto'}
          fill={isMinSize(size, 'large') ? false : 'horizontal'}
          responsive={false}
          pad="small"
          align="start"
          style={{ position: 'relative' }}
          {...rest}
        >
          <ButtonCard onClick={onCardClick}>
            <Box
              fill
              margin={{
                top: 'xsmall',
                bottom: 'small',
              }}
              pad={{
                horizontal: 'small',
              }}
              direction={isMinSize(size, 'large') ? 'column' : 'row'}
              gap={isMinSize(size, 'large') ? 'hair' : 'small'}
              align={isMinSize(size, 'large') ? 'start' : 'center'}
            >
              <Box
                align="center"
                fill={isMinSize(size, 'large') ? 'horizontal' : false}
              >
                {icon}
              </Box>
              <Box>
                <h4>{label}</h4>
                <Box direction="row" gap="xsmall">
                  <Text>{realm.biomeNo}</Text>
                  <FormattedMessage
                    {...commonMessages[
                      realm.biomeNo === 1 ? 'biome' : 'biomes'
                    ]}
                  />
                </Box>
                <Box direction="row" gap="xsmall">
                  <Text>{realm.groupNo}</Text>
                  <FormattedMessage
                    {...commonMessages[
                      realm.groupNo === 1 ? 'group' : 'groups'
                    ]}
                  />
                </Box>
              </Box>
            </Box>
          </ButtonCard>
        </Box>
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
