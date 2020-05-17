import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Box } from 'grommet';

// prettier-ignore
const Styled = styled(Box)`
  position: relative;
  min-height: 100vh;
`;

function ColumnMain(props) {
  return <Styled direction="column" {...props} flex />;
}

ColumnMain.propTypes = {
  hasAside: PropTypes.bool,
};

export default ColumnMain;
