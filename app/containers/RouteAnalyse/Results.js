/**
 *
 * RouteExplore
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Text, Button, TextInput } from 'grommet';
import { intlShape, injectIntl } from 'react-intl';

import {
  selectGroupsByAreaFiltered,
  selectGroupsQueryReadyAll,
  selectGroupsByAreaArgs,
} from 'containers/App/selectors';
import {
  resetGroupsQuery,
  updateGroupsQuery,
  queryGroups,
  resetGroupsQueryNav,
} from 'containers/App/actions';
// import messages from './messages';

import AsideNavTypologyList from 'components/AsideNavTypologyList';
import LoadingIndicator from 'components/LoadingIndicator';

export function Results({
  groups,
  queriesReady,
  onResetQuery,
  queryArgs,
  intl,
  updateQuery,
  onQueryGroups,
  // queryArgsFromQuery,
}) {
  const [areaUpdate, setAreaUpdate] = useState(false);
  const [filterUpdate, setFilterUpdate] = useState(false);
  const { locale } = intl;
  const { area, realm, biome, occurrence } = queryArgs;
  return (
    <Box>
      {(areaUpdate || filterUpdate) && (
        <Box>
          {areaUpdate && (
            <>
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
            </>
          )}
          {filterUpdate && (
            <>
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
            </>
          )}
          {(!areaUpdate || (area && area.trim() !== '')) && (
            <Button
              label="Submit"
              onClick={() => {
                setAreaUpdate(false);
                setFilterUpdate(false);
                onQueryGroups({
                  area: area.trim(),
                  realm: realm && realm.trim() !== '' ? realm : null,
                  biome: biome && biome.trim() !== '' ? biome : null,
                  occurrence:
                    occurrence && occurrence.trim() !== '' ? occurrence : null,
                });
              }}
            />
          )}
        </Box>
      )}
      {!areaUpdate && !filterUpdate && (
        <>
          <div>
            <Text>Area</Text>
            <Text>{area}</Text>
            <Button onClick={() => setAreaUpdate(true)} label="Update area" />
          </div>
          <div>
            <Text>Filters</Text>
            {(realm || biome || occurrence) && (
              <>
                {realm && <Text>{`Realm: ${realm}`}</Text>}
                {biome && <Text>{`Biome: ${realm}`}</Text>}
                {occurrence && <Text>{`Occurrence: ${occurrence}`}</Text>}
              </>
            )}
            <Button
              onClick={() => setFilterUpdate(true)}
              label="Update filters"
            />
          </div>
          <div>
            <Button onClick={() => onResetQuery()} label="Reset query" />
          </div>
          <div>
            {queriesReady && (
              <Text>{`${groups.length} Functional Groups`}</Text>
            )}
          </div>
          <div>
            {!queriesReady && <Text>Functional Groups</Text>}
            {queriesReady && groups && (
              <AsideNavTypologyList
                items={groups}
                level={2}
                locale={locale}
                navItem={id => console.log(id)}
                activeId={null}
              />
            )}
            {!queriesReady && <LoadingIndicator />}
          </div>
        </>
      )}
    </Box>
  );
}

Results.propTypes = {
  groups: PropTypes.array,
  queriesReady: PropTypes.bool,
  // queryArgsFromQuery: PropTypes.object,
  queryArgs: PropTypes.object,
  onResetQuery: PropTypes.func,
  intl: intlShape.isRequired,
  updateQuery: PropTypes.func,
  onQueryGroups: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  queriesReady: state => selectGroupsQueryReadyAll(state),
  queryArgsFromQuery: state => selectGroupsByAreaArgs(state),
  groups: (state, { queryArgs }) =>
    selectGroupsByAreaFiltered(state, queryArgs),
});

function mapDispatchToProps(dispatch) {
  return {
    onResetQuery: () => {
      dispatch(resetGroupsQuery());
      dispatch(resetGroupsQueryNav());
    },
    updateQuery: args => dispatch(updateGroupsQuery(args)),
    onQueryGroups: args => dispatch(queryGroups(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(Results));
