/**
 *
 * AsideNavLabel
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Box, Text } from 'grommet';

function AsideNavLabel({ label, top }) {
  return (
    <Box pad={{ left: 'small', top: 'xsmall', bottom: top ? '0' : 'xsmall' }}>
      <Text size="small">{label}</Text>
    </Box>
  );
}

AsideNavLabel.propTypes = {
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  top: PropTypes.bool,
};

export default AsideNavLabel;
