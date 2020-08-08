/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Box, TextInput, Text } from 'grommet';
import { queryGroups, updateGroupsQuery } from 'containers/App/actions';
import { selectGroupsQueryArgs } from 'containers/App/selectors';

export function Configure({ onQueryGroups, queryArgs, updateQuery }) {
  const { area, realm, biome, occurrence } = queryArgs;
  return (
    <Box padding="large" gap="small">
      <Text>Area</Text>
      <TextInput
        value={area}
        onChange={e =>
          updateQuery({
            ...queryArgs,
            area: e.target.value,
          })
        }
      />
      <Text>Realm</Text>
      <TextInput
        value={realm}
        onChange={e =>
          updateQuery({
            ...queryArgs,
            realm: e.target.value,
          })
        }
      />
      <Text>Biome</Text>
      <TextInput
        value={biome}
        onChange={e =>
          updateQuery({
            ...queryArgs,
            biome: e.target.value,
          })
        }
      />
      <Text>Occurrence</Text>
      <TextInput
        value={occurrence}
        onChange={e =>
          updateQuery({
            ...queryArgs,
            occurrence: e.target.value,
          })
        }
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
  );
}

Configure.propTypes = {
  onQueryGroups: PropTypes.func,
  updateQuery: PropTypes.func,
  queryArgs: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  queryArgs: state => selectGroupsQueryArgs(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onQueryGroups: args => dispatch(queryGroups(args)),
    updateQuery: args => dispatch(updateGroupsQuery(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(Configure);
