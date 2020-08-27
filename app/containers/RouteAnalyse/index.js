/**
 *
 * RouteExplore
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ResponsiveContext } from 'grommet';
import { queryGroups, updateGroupsQuery } from 'containers/App/actions';
import {
  selectGroupsQueryArgs,
  selectGroupsQueriedAny,
  selectRealmsWithStats,
  selectBiomes,
} from 'containers/App/selectors';
import ColumnAside from 'components/ColumnAside';
import { isMinSize } from 'utils/responsive';
// import messages from './messages';
import Results from './Results';
import Configure from './Configure';

const Styled = styled.div`
  pointer-events: none;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export function RouteAnalyse({ queryArgs, queried, realms, biomes }) {
  // const [show, setShow] = useState(true);
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled size={size}>
          <Helmet>
            <title>Analyse</title>
          </Helmet>
          {isMinSize(size, 'large') && (
            <ColumnAside absolute>
              {!queried && realms && biomes && (
                <Configure realms={realms} biomes={biomes} />
              )}
              {queried && <Results queryArgs={queryArgs} />}
            </ColumnAside>
          )}
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
};

const mapStateToProps = createStructuredSelector({
  queryArgs: state => selectGroupsQueryArgs(state),
  queried: state => selectGroupsQueriedAny(state),
  realms: state => selectRealmsWithStats(state),
  biomes: state => selectBiomes(state),
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
export default compose(withConnect)(RouteAnalyse);
