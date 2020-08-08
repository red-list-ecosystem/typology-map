/**
 *
 * MapWrapper
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import styled, { css } from 'styled-components';

import { selectLocale, selectGroup } from 'containers/App/selectors';

import Map from 'containers/Map';

import { Expand, Contract } from 'components/Icons';
import MapControls from 'components/MapControls';
import MapControl from 'components/MapControl';
import TopGraphic from 'components/TopGraphic';

const Styled = styled(TopGraphic)`
  z-index: ${({ isFS }) => (isFS ? 1000 : 1)};
  pointer-events: ${({ active }) => (active ? 'all' : 'none')};
  visibility: ${({ active }) => (active ? 'visible' : 'hidden')};
  ${({ isFS }) =>
    isFS &&
    css`
      bottom: 0 !important;
      right: 0 !important;
      height: auto !important;
    `}
`;

export function MapWrapper({ typology, locale, groupId, expand }) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  return (
    <Styled
      isFS={expand || (groupId && isMapExpanded)}
      active={expand || !!groupId}
    >
      <Map
        group={typology}
        fullscreen={expand || isMapExpanded}
        locale={locale}
      />
      {!expand && (
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
  );
}

MapWrapper.propTypes = {
  typology: PropTypes.object,
  locale: PropTypes.string,
  groupId: PropTypes.string,
  expand: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  locale: state => selectLocale(state),
  typology: (state, { groupId }) => groupId && selectGroup(state, groupId),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(withConnect)(MapWrapper);
