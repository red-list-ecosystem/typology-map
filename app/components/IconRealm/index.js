/**
 *
 * IconsRealm
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';
import styled from 'styled-components';

import Img from 'components/Img';

import { ICONS } from 'config';

const StyledBox = styled(props => (
  <Box direction="row" gap="xxsmall" align="center" {...props} wrap />
))`
  height: ${({ theme }) => theme.dimensions.realmIcons.single + 20}px;
`;

const IconImg = styled(Img)`
  width: ${({ theme, multiple }) =>
    theme.dimensions.realmIcons[multiple ? 'multi' : 'single']}px;
  height: ${({ theme, multiple }) =>
    theme.dimensions.realmIcons[multiple ? 'multi' : 'single']}px;
`;

function IconRealm({ realmId, type }) {
  if (!ICONS[realmId]) return null;
  /* eslint-disable react/no-array-index-key */
  return (
    <StyledBox>
      {Object.values(ICONS[realmId]).map((icon, index) => (
        <IconImg src={icon} key={index} multiple={type === 'trans'} alt="" />
      ))}
    </StyledBox>
  );
  /* eslint-enable react/no-array-index-key */
}

IconRealm.propTypes = {
  realmId: PropTypes.string,
  type: PropTypes.string,
};

export default memo(IconRealm);
