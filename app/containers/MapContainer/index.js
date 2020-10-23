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
  group,
  locale,
  groupId,
  expandWithAside,
  mode,
  drawActive,
}) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);
  const [drawMode, setDrawMode] = useState('rectangle');

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
            group={group}
            fullscreen={expandWithAside || isMapExpanded}
            locale={locale}
            size={size}
            mode={mode}
            drawMode={drawMode}
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
          {drawActive && (
            <MapControls position="right">
              <MapControl
                active={drawMode === 'rectangle'}
                icon={
                  <Contract
                    color={drawMode === 'rectangle' ? 'white' : 'black'}
                  />
                }
                onClick={() => setDrawMode('rectangle')}
              />
              <MapControl
                active={drawMode === 'polygon'}
                icon={
                  <Expand color={drawMode === 'polygon' ? 'white' : 'black'} />
                }
                onClick={() => setDrawMode('polygon')}
              />
            </MapControls>
          )}
        </Styled>
      )}
    </ResponsiveContext.Consumer>
  );
}

MapContainer.propTypes = {
  group: PropTypes.object,
  locale: PropTypes.string,
  groupId: PropTypes.string,
  expandWithAside: PropTypes.bool,
  drawActive: PropTypes.bool,
  mode: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  locale: state => selectLocale(state),
  group: (state, { groupId }) => groupId && selectGroup(state, groupId),
  drawActive: state => selectDrawActive(state),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(MapContainer);
