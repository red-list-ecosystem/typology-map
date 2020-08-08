/**
 *
 * RouteExplore
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { createStructuredSelector } from 'reselect';
import { Button, Box, TextInput, Text } from 'grommet';
import { queryGroups } from 'containers/App/actions';
// import { navigateTypology } from 'containers/App/actions';
// import messages from './messages';
import Results from './Results';

const Styled = styled.div`
  position: relative;
  z-index: 2;
`;

export function RouteAnalyse({ onQueryGroups }) {
  const [area, setArea] = useState('');
  const [realm, setRealm] = useState('');
  const [biome, setBiome] = useState('');
  const [occurrence, setOccurrence] = useState('');

  // useEffect(() => {
  //   onQueryGroups({
  //     area: '80.75 10.46, 79.34 9.84, 78.86 4.57, 84.57 7.07, 80.75 10.46',
  //     realm: 'M',
  //   });
  // }, []);
  return (
    <Styled>
      <Box padding="large" gap="small">
        <Text>Polygon</Text>
        <TextInput value={area} onChange={e => setArea(e.target.value)} />
        <Text>Realm</Text>
        <TextInput value={realm} onChange={e => setRealm(e.target.value)} />
        <Text>Biome</Text>
        <TextInput value={biome} onChange={e => setBiome(e.target.value)} />
        <Text>Occurrence</Text>
        <TextInput
          value={occurrence}
          onChange={e => setOccurrence(e.target.value)}
        />
        {area && area.trim() !== '' && (
          <Button
            label="Submit"
            onClick={() =>
              onQueryGroups({
                area: area.trim(),
                realm: realm && realm.trim() !== '' ? realm : null,
                biome: biome && biome.trim() !== '' ? biome : null,
                occurrence:
                  occurrence && occurrence.trim() !== '' ? occurrence : null,
              })
            }
          />
        )}
      </Box>
      <Results args={{ realm, biome }} />
    </Styled>
  );
}

RouteAnalyse.propTypes = {
  onQueryGroups: PropTypes.func,
};

// const mapStateToProps = createStructuredSelector({
//   groups: state => selectGroupsByAreaAll(state),
// });

export function mapDispatchToProps(dispatch) {
  return {
    onQueryGroups: args => dispatch(queryGroups(args)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(RouteAnalyse);
