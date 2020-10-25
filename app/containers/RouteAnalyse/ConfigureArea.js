/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Button, Text } from 'grommet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import {
  selectGroupsByAreaArgs,
  selectQueryType,
} from 'containers/App/selectors';

import { setQueryType } from 'containers/App/actions';

import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';
import ButtonPrimary from 'components/ButtonPrimary';

import messages from './messages';

import { testArea, getOpenArea } from './utils';

import StepTitle from './StepTitle';
import FieldWrap from './FieldWrap';
import FieldLabel from './FieldLabel';
import AreaInput from './AreaInput';
import RegionInput from './RegionInput';

const UpdateButton = styled(p => <Button plain {...p} />)`
  color: ${({ theme }) => theme.global.colors.brand};
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled(p => <ButtonPrimary {...p} />)``;

// prettier-ignore
const ToggleButton = styled(p => <Button plain {...p} />)`
  padding: 5px 12px 3px;
  border-radius: 5px 5px 0 0;
  background-color: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2' : 'light-grey']};
  color: ${({ theme, active }) =>
    theme.global.colors[active ? 'white' : 'black']};
  border-bottom: 1px solid;
  border-bottom-color: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2' : 'light-grey']};
  opacity: 1;
  &:hover {
    background: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2-dark' : 'light-4']};
    border-bottom-color: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2-dark' : 'light-4']};
    color: ${({ theme, active }) =>
    theme.global.colors[active ? 'white' : 'black']};
  }
`;

const TextLabel = styled(props => <Text size="small" {...props} />)``;

export function ConfigureArea({
  queryArgs,
  queryArgsFromQuery,
  intl,
  updateQuery,
  onQueryGroups,
  onSubmit,
  onCancel,
  queryType,
  onSetQueryType,
}) {
  const { area, realm, biome, occurrence, regionId } = queryArgs;
  const areaQ = queryArgsFromQuery && queryArgsFromQuery.area;
  const regionQ = queryArgsFromQuery && queryArgsFromQuery.regionId;

  const hasArea = area && area.trim() !== '' && testArea(area);
  const hasRegion = regionId && regionId.trim() !== '';

  // only activate queryUpdate when area has actually changed
  let areaChanged = false;
  if (queryArgsFromQuery) {
    areaChanged = area !== areaQ;
  }
  let regionChanged = false;
  if (queryArgsFromQuery) {
    regionChanged = regionId !== regionQ;
  }

  return (
    <>
      <AsideNavSection margin={{ vertical: 'ms' }}>
        <StepTitle>
          <FormattedMessage {...messages.areaChange} />
        </StepTitle>
        <Box
          direction="row"
          gap="none"
          border="bottom"
          margin={{ top: 'xxsmall', bottom: 'medium' }}
        >
          <ToggleButton
            plain
            disabled={queryType === 'region'}
            active={queryType === 'region'}
            onClick={() => {
              onSetQueryType('region');
            }}
            label={
              <TextLabel>
                <FormattedMessage {...messages.predefinedRegion} />
              </TextLabel>
            }
          />
          <ToggleButton
            plain
            disabled={queryType === 'area'}
            active={queryType === 'area'}
            onClick={() => {
              onSetQueryType('area');
            }}
            left
            label={
              <TextLabel>
                <FormattedMessage {...messages.customArea} />
              </TextLabel>
            }
          />
        </Box>
        <Hint>
          {queryType === 'area' && (
            <FormattedMessage {...messages.defineAreaInstructions} />
          )}
          {queryType === 'region' && (
            <FormattedMessage {...messages.selectRegionInstructions} />
          )}
        </Hint>
        <FieldWrap margin={{ top: 'medium' }}>
          <FieldLabel>
            {queryType === 'area' && (
              <FormattedMessage {...messages.defineAreaFieldLabel} />
            )}
            {queryType === 'region' && (
              <FormattedMessage {...messages.selectRegionFieldLabel} />
            )}
          </FieldLabel>
          {queryType === 'area' && (
            <AreaInput
              area={getOpenArea(area)}
              onSubmit={value => {
                const points = value.split(',');
                if (points[0] === points[points.length - 1]) {
                  updateQuery({
                    ...queryArgs,
                    area: value,
                  });
                } else {
                  updateQuery({
                    ...queryArgs,
                    area: `${value}, ${points[0]}`,
                  });
                }
              }}
            />
          )}
          {queryType === 'region' && (
            <RegionInput
              regionId={regionId}
              onSubmit={value => {
                updateQuery({
                  ...queryArgs,
                  regionId: value,
                });
              }}
            />
          )}
        </FieldWrap>
      </AsideNavSection>
      <Box direction="row" gap="small" margin={{ top: 'small' }}>
        <SubmitButton
          disabled={
            (queryType === 'area' && (!hasArea || !areaChanged)) ||
            (queryType === 'region' && (!hasRegion || !regionChanged))
          }
          label={intl.formatMessage(messages.updateQueryLabel)}
          onClick={() => {
            onSubmit();
            onQueryGroups({
              area: queryType === 'area' ? area.trim() : null,
              regionId: queryType === 'region' ? regionId.trim() : null,
              realm: realm && realm.trim() !== '' ? realm : null,
              biome: biome && biome.trim() !== '' ? biome : null,
              occurrence:
                occurrence && occurrence.trim() !== '' ? occurrence : null,
            });
            if (queryType === 'area') {
              updateQuery({
                ...queryArgs,
                regionId: '',
              });
            }
            if (queryType === 'region') {
              updateQuery({
                ...queryArgs,
                area: '',
              });
            }
          }}
        />
        <UpdateButton
          onClick={() => {
            onCancel();
            updateQuery(queryArgsFromQuery);
          }}
          label={<FormattedMessage {...messages.cancel} />}
        />
      </Box>
    </>
  );
}

ConfigureArea.propTypes = {
  queryArgsFromQuery: PropTypes.object,
  queryArgs: PropTypes.object,
  intl: intlShape.isRequired,
  updateQuery: PropTypes.func,
  onQueryGroups: PropTypes.func,
  onSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onSetQueryType: PropTypes.func,
  queryType: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  queryArgsFromQuery: state => selectGroupsByAreaArgs(state),
  queryType: state => selectQueryType(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onSetQueryType: type => dispatch(setQueryType(type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(ConfigureArea));
