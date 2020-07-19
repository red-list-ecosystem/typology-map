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
import { Button } from 'grommet';
import { Expand, Contract } from 'grommet-icons';

import { selectLocale, selectGroup } from 'containers/App/selectors';

import Map from 'containers/Map';

import TopGraphic from 'components/TopGraphic';

const FSButtonWrapper = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.global.edgeSize.small};
  top: ${({ theme }) => theme.global.edgeSize.small};
  z-index: 401;
`;
const FSButton = styled(props => <Button plain {...props} />)`
  border-radius: 9999px;
  padding: ${({ theme }) => theme.global.edgeSize.small};
  background: ${({ theme }) => theme.global.colors.white};
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
`;

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

export function MapWrapper({ typology, locale, groupId }) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  return (
    <Styled isFS={groupId && isMapExpanded} active={!!groupId}>
      <Map group={typology} fullscreen={isMapExpanded} locale={locale} />
      <FSButtonWrapper>
        <FSButton
          icon={isMapExpanded ? <Contract /> : <Expand />}
          onClick={() => setIsMapExpanded(!isMapExpanded)}
        />
      </FSButtonWrapper>
    </Styled>
  );
}

MapWrapper.propTypes = {
  typology: PropTypes.object,
  locale: PropTypes.string,
  groupId: PropTypes.string,
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
