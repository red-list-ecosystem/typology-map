import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button, Drop, Box, Text } from 'grommet';
import styled from 'styled-components';

import { Close, Down, Up } from 'components/Icons';

import { showQueryRegions } from 'containers/App/actions';
import { setRegionHighlight } from 'containers/Map/actions';
import { selectLayerByKey } from 'containers/Map/selectors';
import { getRegionFeatureTitle } from 'containers/Map/utils';

import { QUERY_REGIONS_LAYER } from 'config';

import quasiEquals from 'utils/quasi-equals';

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
    .map(feature => ({
      id: feature.properties[QUERY_REGIONS_LAYER.featureId],
      title: getRegionFeatureTitle(feature),
    }))
    .sort((a, b) => (a.title > b.title ? 1 : -1));
};
export function RegionInput({
  regionId,
  onSubmit,
  onShowQueryRegions,
  layer,
  // intl,
}) {
  const [open, setOpen] = useState(false);
  const dropButtonRef = useRef(null);

  useEffect(() => {
    onShowQueryRegions(true);
    return () => onShowQueryRegions(false);
  }, []);

  const options = prepFeatures(layer);
  // console.log(options)

  const activeRegion =
    regionId &&
    layer &&
    options.find(option => quasiEquals(option.id, regionId));
  // onSelect={id => onSubmit(id)}
  // placeholder={intl.formatMessage(messages.selectRegionFieldPlaceholder)}
  return (
    <>
      {activeRegion && (
        <Active>
          <LabelWrap align="center">
            <Title>{activeRegion.title}</Title>
          </LabelWrap>
          <CloseButton
            onClick={() => {
              onSubmit('');
              setOpen(false);
            }}
            icon={<Close size="medium" color="black" />}
          />
        </Active>
      )}
      {!activeRegion && (
        <DropButton
          ref={dropButtonRef}
          label={
            <Select pad={{ right: '3px' }}>
              <Text color="dark-4">
                <FormattedMessage {...messages.selectRegionFieldPlaceholder} />
              </Text>
              {open ? <Up color="black" /> : <Down color="black" />}
            </Select>
          }
          onClick={() => setOpen(!open)}
        />
      )}
      {!activeRegion && open && dropButtonRef && dropButtonRef.current && (
        <Drop
          stretch
          target={dropButtonRef.current}
          align={{ top: 'bottom', right: 'right' }}
          style={{ maxWidth: dropButtonRef.current.offsetWidth }}
        >
          <RegionInputOptions
            dropWidth={dropButtonRef.current.offsetWidth}
            onSubmit={id => {
              onSubmit(id);
              setOpen(false);
            }}
            options={options}
          />
        </Drop>
      )}
    </>
  );
}

RegionInput.propTypes = {
  onSubmit: PropTypes.func,
  onOptionHover: PropTypes.func,
  onShowQueryRegions: PropTypes.func,
  onSetRegionHighlight: PropTypes.func,
  regionId: PropTypes.string,
  layer: PropTypes.object,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  layer: state => selectLayerByKey(state, QUERY_REGIONS_LAYER.key),
});

export function mapDispatchToProps(dispatch) {
  return {
    onShowQueryRegions: isActive => dispatch(showQueryRegions(isActive)),
    onSetRegionHighlight: regionId => dispatch(setRegionHighlight(regionId)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(RegionInput));
// export default RegionInput;
