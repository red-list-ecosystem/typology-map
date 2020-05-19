/**
 *
 * AsideNavLabel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Box, Text } from 'grommet';

function AsideNavLabel({ label }) {
  return (
    <Box pad={{ left: 'small', vertical: 'xsmall' }}>
      <Text size="small">{label}</Text>
    </Box>
  );
}

AsideNavLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
};

export default AsideNavLabel;
