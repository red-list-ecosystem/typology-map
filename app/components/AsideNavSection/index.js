/**
 *
 * AsideNavSection
 *
 */

import React from 'react';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { Box } from 'grommet';

function AsideNavSection({ ...props }) {
  return <Box margin={{ top: 'large' }} flex={{ shrink: 0 }} {...props} />;
}

export default AsideNavSection;
