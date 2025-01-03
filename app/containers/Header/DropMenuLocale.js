import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { Box, Text } from 'grommet';

import LocaleToggle from 'containers/LocaleToggle';

import DropMenu from './DropMenu';

const DropMenuWrapper = styled(p => (
  <Box flex={{ shrink: 0 }} width="small" responsive={false} {...p} />
))`
  max-width: none;
`;

const SecondaryLabel = styled(p => <Text {...p} size="medium" />)`
  color: ${({ theme }) => theme.global.colors.white};
`;
const LocaleTitle = styled(p => <SecondaryLabel {...p} />)`
  text-transform: uppercase;
`;
const UpArrowIcon = styled.span`
  color: white;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 5px solid white;
`;
const DownArrowIcon = styled(UpArrowIcon)`
  transform: rotate(180deg);
`;

const DropMenuLocale = ({ locale }) => (
  <DropMenu
    dropContent={() => (
      <DropMenuWrapper>
        <LocaleToggle />
      </DropMenuWrapper>
    )}
    label={({ drop }) => (
      <Box direction="row" align="center" gap="small">
        <LocaleTitle>{locale}</LocaleTitle>
        {drop ? <DownArrowIcon /> : <UpArrowIcon />}
      </Box>
    )}
  />
);

DropMenu.propTypes = {
  locale: PropTypes.string,
};

export default DropMenuLocale;
