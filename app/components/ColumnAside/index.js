import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext } from 'grommet';
import styled from 'styled-components';
import { getAsideWidth } from 'utils/responsive';

// prettier-ignore
const Styled = styled(Box)``;

function ColumnAside({ children, ...other }) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          width={`${getAsideWidth(size)}px`}
          direction="column"
          flex={{ shrink: 0 }}
          elevation="medium"
          {...other}
        >
          {children}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

ColumnAside.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default ColumnAside;
