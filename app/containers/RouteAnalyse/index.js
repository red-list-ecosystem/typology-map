/**
 *
 * RouteExplore
 *
 */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { intlShape, injectIntl, FormattedMessage } from 'react-intl';
import { ResponsiveContext, Box } from 'grommet';

import { isMinSize } from 'utils/responsive';

import { queryGroups, updateGroupsQuery } from 'containers/App/actions';
import {
  selectGroupsQueryArgs,
  selectGroupsQueriedAny,
  selectRealmsWithStats,
  selectBiomes,
  selectInfoGroup,
} from 'containers/App/selectors';
import ColumnAside from 'components/ColumnAside';
import SectionTitle from 'components/styled/SectionTitle';

import messages from './messages';
import Results from './Results';
import Configure from './Configure';
import ConfigureArea from './ConfigureArea';
import ConfigureFilters from './ConfigureFilters';
import GroupInfo from './GroupInfo';

const Styled = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export function RouteAnalyse({
  queryArgs,
  queried,
  realms,
  biomes,
  intl,
  infoGroup,
  updateQuery,
  onQueryGroups,
}) {
  // const [show, setShow] = useState(true);
  const [areaUpdate, setAreaUpdate] = useState(false);
  const [filterUpdate, setFilterUpdate] = useState(false);
  const updating = areaUpdate || filterUpdate;
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled size={size}>
          <Helmet>
            <title>{intl.formatMessage(messages.title)}</title>
          </Helmet>
          {isMinSize(size, 'large') && (
            <ColumnAside absolute>
              {!queried && realms && biomes && (
                <Configure realms={realms} biomes={biomes} />
              )}
              {queried && !updating && (
                <Results
                  queryArgs={queryArgs}
                  realms={realms}
                  biomes={biomes}
                  setAreaUpdate={setAreaUpdate}
                  setFilterUpdate={setFilterUpdate}
                />
              )}
              {queried && updating && (
                <>
                  <Box
                    pad={{ horizontal: 'small', top: 'small' }}
                    flex={false}
                    background="white"
                    direction="row"
                    fill="horizontal"
                    justify="between"
                    align="center"
                  >
                    <SectionTitle aside>
                      <FormattedMessage {...messages.changeQueryLabel} />
                    </SectionTitle>
                  </Box>
                  <Box pad={{ horizontal: 'small' }} flex={false}>
                    {areaUpdate && (
                      <ConfigureArea
                        queryArgs={queryArgs}
                        onSubmit={() => setAreaUpdate(false)}
                        onCancel={() => setAreaUpdate(false)}
                        updateQuery={updateQuery}
                        onQueryGroups={onQueryGroups}
                      />
                    )}
                    {filterUpdate && (
                      <ConfigureFilters
                        queryArgs={queryArgs}
                        realms={realms}
                        biomes={biomes}
                        onSubmit={() => setFilterUpdate(false)}
                        onCancel={() => setFilterUpdate(false)}
                        updateQuery={updateQuery}
                        onQueryGroups={onQueryGroups}
                      />
                    )}
                  </Box>
                </>
              )}
            </ColumnAside>
          )}
          {infoGroup && <GroupInfo group={infoGroup} />}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

RouteAnalyse.propTypes = {
  queried: PropTypes.bool,
  queryArgs: PropTypes.object,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  infoGroup: PropTypes.object,
  onQueryGroups: PropTypes.func,
  updateQuery: PropTypes.func,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  queryArgs: state => selectGroupsQueryArgs(state),
  queried: state => selectGroupsQueriedAny(state),
  realms: state => selectRealmsWithStats(state),
  biomes: state => selectBiomes(state),
  infoGroup: state => selectInfoGroup(state),
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
export default compose(withConnect)(injectIntl(RouteAnalyse));
