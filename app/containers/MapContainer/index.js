/**
 *
 * MapContainer
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled, { css } from 'styled-components';
import { ResponsiveContext } from 'grommet';

import {
  selectLocale,
  selectGroup,
  selectDrawActive,
  selectQueryRegionsActive,
  selectQueryType,
} from 'containers/App/selectors';

import Map from 'containers/Map';

import { Expand, Contract } from 'components/Icons';
import MapControls from 'components/MapControls';
import MapControl from 'components/MapControl';
import TopGraphic from 'components/TopGraphic';

import { getAsideWidth } from 'utils/responsive';

// prettier-ignore
const Styled = styled(TopGraphic)`
  z-index: ${({ isFS }) => (isFS ? 1000 : 1)};
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  ${({ isFS }) =>
    isFS &&
    css`
      bottom: 0 !important;
      right: ${({ aside, asideWidth }) =>
    aside ? asideWidth : 0}px !important;
      height: auto !important;
    `}
`;

export function MapContainer({
  typology,
  locale,
  groupId,
  expandWithAside,
  drawActive,
  showQuery,
  queryType,
  queryRegionsActive,
}) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Styled
          isFS={expandWithAside || (groupId && isMapExpanded)}
          active={expandWithAside || !!groupId}
          aside={expandWithAside}
          asideWidth={getAsideWidth(size)}
        >
          <Map
            group={typology}
            fullscreen={expandWithAside || isMapExpanded}
            locale={locale}
            drawActive={drawActive}
            queryRegionsActive={queryRegionsActive}
            queryType={queryType}
            showQuery={showQuery}
          />
          {!expandWithAside && (
            <MapControls position="right">
              <MapControl
                icon={
                  isMapExpanded ? (
                    <Contract color="black" />
                  ) : (
                    <Expand color="black" />
                  )
                }
                onClick={() => setIsMapExpanded(!isMapExpanded)}
              />
            </MapControls>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

MapContainer.propTypes = {
  typology: PropTypes.object,
  locale: PropTypes.string,
  groupId: PropTypes.string,
  expandWithAside: PropTypes.bool,
  drawActive: PropTypes.bool,
  queryRegionsActive: PropTypes.bool,
  showQuery: PropTypes.bool,
  queryType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => selectLocale(state),
  typology: (state, { groupId }) => groupId && selectGroup(state, groupId),
  drawActive: state => selectDrawActive(state),
  queryRegionsActive: state => selectQueryRegionsActive(state),
  queryType: state => selectQueryType(state),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(MapContainer);
