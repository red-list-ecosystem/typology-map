/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Text } from 'grommet';

import { selectGroupsByAreaFiltered } from 'containers/App/selectors';
// import messages from './messages';

const Styled = styled.div`
  pointer-events: none;
  position: relative;
  z-index: 2;
`;

export function Results({ groups }) {
  // console.log(groups)
  return (
    <Styled>
      <Box>
        {groups &&
          groups.map(g => (
            <Box key={g.id}>
              <Text>{g.id}</Text>
            </Box>
          ))}
      </Box>
    </Styled>
  );
}

Results.propTypes = {
  groups: PropTypes.array,
  // args: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  groups: (state, { args }) => selectGroupsByAreaFiltered(state, args),
});

const withConnect = connect(mapStateToProps);

// export default RouteExplore;
export default compose(withConnect)(Results);
