import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import { Button, Drop, Box, Text, ResponsiveContext, Layer } from 'grommet';
import styled from 'styled-components';

import { groupBy } from 'lodash/collection';

import { Close, Down, Up } from 'components/Icons';

// import { setRegionHighlight } from 'containers/Map/actions';
import { selectLayerByKey } from 'containers/Map/selectors';
import { getRegionFeatureTitle } from 'containers/Map/utils';

import { QUERY_REGIONS_LAYER } from 'config';

import quasiEquals from 'utils/quasi-equals';
import { isMinSize, isMaxSize } from 'utils/responsive';

import RegionInputOptions from './RegionInputOptions';
import messages from './messages';

const DropButton = styled(
  React.forwardRef((p, ref) => (
    <Button plain alignSelf="stretch" {...p} ref={ref} />
  )),
)`
  min-height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 3px 6px;
`;

const CloseButton = styled(p => <Button plain {...p} />)`
  border-radius: 9999px;
  padding: 6px;
  &:hover {
    background: ${({ theme }) => theme.global.colors.grey} !important;
  }
`;

const LabelWrap = styled(p => <Box {...p} />)``;
const Title = styled(Box)``;
const Active = styled(p => (
  <Box justify="between" direction="row" align="center" {...p} />
))`
  min-height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 3px 6px;
`;
const Select = styled(p => (
  <Box justify="between" direction="row" align="center" {...p} />
))``;

const prepFeatures = layer => {
  if (!layer) return [];
  return layer.data.features
    .filter(
      feature =>
        !quasiEquals(
          1,
          feature.properties[QUERY_REGIONS_LAYER.featureIgnoreField],
        ),
    )
    .map(feature => ({
      id: feature.properties[QUERY_REGIONS_LAYER.featureId],
      title: getRegionFeatureTitle(feature),
      type: feature.properties[QUERY_REGIONS_LAYER.featureTypeField],
    }))
    .sort((a, b) => (a.title > b.title ? 1 : -1));
};
export function RegionInput({
  regionId,
  onSubmit,
  layer,
  // intl,
}) {
  const [open, setOpen] = useState(null);
  const dropButtonRefADM = useRef(null);
  const dropButtonRefLME = useRef(null);

  const options = prepFeatures(layer);
  const optionsGrouped = groupBy(options, option => option.type);
  // console.log(optionsGrouped)

  const activeRegion =
    regionId &&
    layer &&
    options.find(option => quasiEquals(option.id, regionId));
  // onSelect={id => onSubmit(id)}
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <Box direction="row" gap="small">
          {Object.keys(optionsGrouped).filter(key => !!key).map(regionType => {
            const groupOptions = optionsGrouped[regionType];
            const isActive = activeRegion && activeRegion.type === regionType;
            const isOpen = open === regionType;
            const dropButtonRef = regionType === 'ADM' ? dropButtonRefADM : dropButtonRefLME;
            return (
              <Box basis="1/2" key={regionType}>
                {isActive && (
                  <Active>
                    <LabelWrap align="center">
                      <Title>{activeRegion.title}</Title>
                    </LabelWrap>
                    <CloseButton
                      onClick={() => {
                        onSubmit('');
                        setOpen('');
                      }}
                      icon={<Close size="medium" color="black" />}
                    />
                  </Active>
                )}
                {!isActive && (
                  <DropButton
                    ref={dropButtonRef}
                    label={
                      <Select pad={{ right: '3px' }}>
                        <Text color="dark-4">
                          {messages[`selectRegionFieldPlaceholder${regionType}`] && (
                            <FormattedMessage
                              {...messages[`selectRegionFieldPlaceholder${regionType}`]}
                            />
                          )}
                        </Text>
                        {isOpen ? <Up color="black" /> : <Down color="black" />}
                      </Select>
                    }
                    onClick={() => setOpen(isOpen ? null : regionType)}
                  />
                )}
                {isMinSize(size, 'medium') &&
                  !isActive &&
                  isOpen &&
                  dropButtonRef &&
                  dropButtonRef.current && (
                  <Drop
                    stretch
                    target={dropButtonRef.current}
                    align={{ top: 'bottom', right: 'right' }}
                    style={{ maxWidth: dropButtonRef.current.offsetWidth }}
                  >
                    <RegionInputOptions
                      dropWidth={`${dropButtonRef.current.offsetWidth}px`}
                      onSubmit={id => {
                        onSubmit(id);
                        setOpen(null);
                      }}
                      options={groupOptions}
                    />
                  </Drop>
                )}
                {isMaxSize(size, 'small') &&
                  !isActive &&
                  isOpen && (
                  <Layer
                    full
                    plain
                    onEsc={() => setOpen(null)}
                  >
                    <RegionInputOptions
                      dropWidth="100%"
                      onSubmit={id => {
                        onSubmit(id);
                        setOpen(null);
                      }}
                      options={groupOptions}
                      inLayer
                      onClose={() => setOpen(null)}
                    />
                  </Layer>
                )}
              </Box>
            );
          })}
        </Box>
      )}
    </ResponsiveContext.Consumer>
  );
}

RegionInput.propTypes = {
  onSubmit: PropTypes.func,
  // onOptionHover: PropTypes.func,
  // onSetRegionHighlight: PropTypes.func,
  regionId: PropTypes.string,
  layer: PropTypes.object,
  // intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  layer: state => selectLayerByKey(state, QUERY_REGIONS_LAYER.key),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

// export default RouteExplore;
export default compose(withConnect)(RegionInput);
// export default RegionInput;
