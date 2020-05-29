/**
 *
 * Disclaimer
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Paragraph, Layer, Box, ResponsiveContext } from 'grommet';
import { FormattedMessage } from 'react-intl';

import H2 from 'components/H2';
import ButtonPrimary from 'components/ButtonPrimary';
import ButtonText from 'components/ButtonText';

import { isMinSize } from 'utils/responsive';

import messages from './messages';

function Disclaimer({ onDismiss, onMore }) {
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Layer
          full={isMinSize(size, 'medium') ? false : 'horizontal'}
          animate={false}
          onEsc={() => onDismiss()}
          onClickOutside={() => onDismiss()}
          responsive={false}
        >
          <Box
            background="white"
            width={isMinSize(size, 'medium') ? '500px' : '100%'}
            pad={{
              horizontal: 'medium',
              top: 'xxsmall',
              bottom: 'medium',
            }}
            align="center"
          >
            <H2>
              <FormattedMessage {...messages.title} />
            </H2>
            <Paragraph>
              <FormattedMessage {...messages.disclaimer} />
              <ButtonText
                onClick={() => {
                  onDismiss();
                  onMore();
                }}
                label={<FormattedMessage {...messages.more} />}
              />
            </Paragraph>
            <ButtonPrimary
              onClick={() => onDismiss()}
              alignSelf="center"
              label={<FormattedMessage {...messages.dismiss} />}
            />
          </Box>
        </Layer>
      )}
    </ResponsiveContext.Consumer>
  );
}

Disclaimer.propTypes = {
  onDismiss: PropTypes.func,
  onMore: PropTypes.func,
};

export default Disclaimer;
