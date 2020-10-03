/**
 *
 * RouteExplore
 *
 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Box, Button, Text } from 'grommet';
import styled from 'styled-components';

import {
  queryGroups,
  updateGroupsQuery,
  setQueryType,
} from 'containers/App/actions';
import {
  selectGroupsQueryArgs,
  selectQueryType,
} from 'containers/App/selectors';

import ButtonPrimary from 'components/ButtonPrimary';
import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';

import messages from './messages';

import {
  testArea,
  getOpenArea,
  getRealmOptions,
  getBiomeOptions,
} from './utils';

import TypologyFilter from './TypologyFilter';
import StepTitle from './StepTitle';
import FieldWrap from './FieldWrap';
import FieldLabel from './FieldLabel';
import AreaInput from './AreaInput';
import RegionInput from './RegionInput';
import OccurrenceInput from './OccurrenceInput';

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

export function Configure({
  onQueryGroups,
  queryArgs,
  queryType,
  onSetQueryType,
  updateQuery,
  intl,
  realms,
  biomes,
}) {
  const { area, realm, biome, occurrence, regionId } = queryArgs;
  const hasArea = area && area.trim() !== '' && testArea(area);
  const hasRegion = regionId && regionId.trim() !== '';
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    onSetQueryType(!hasArea && hasRegion ? 'region' : 'area');
  }, []);

  // must be a closed area (first point === last point)
  // but we want an open area in the text area
  // prettier-ignore
  const areaOpen = getOpenArea(area);
  // figure out objects from any set filter
  const realmObject = realms && realms.find(r => r.id === realm);
  const biomeObject = biomes && biomes.find(b => b.id === biome);
  // figure out options from any other filters set
  const realmOptions = getRealmOptions(realms, biomeObject);
  const biomeOptions = getBiomeOptions(realms, biomes, realmObject);
  // console.log(hasRegion)
  // console.log(hasArea)
  // console.log(!hasArea || !hasRegion)
  // console.log(!hasArea && !hasRegion)
  // console.log(!(hasArea || hasRegion))
  return (
    <Box
      pad={{ horizontal: 'small', bottom: 'large' }}
      flex={false}
      background="white"
    >
      <AsideNavSection margin={{ top: 'ms' }}>
        <StepTitle>
          <FormattedMessage {...messages.defineArea} />
        </StepTitle>
        <Box
          direction="row"
          gap="none"
          border="bottom"
          margin={{ top: 'xxsmall', bottom: 'medium' }}
        >
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
              area={areaOpen}
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
      <AsideNavSection>
        <StepTitle>
          <FormattedMessage {...messages.addFilters} />
        </StepTitle>
        <TypologyFilter
          type="realms"
          options={realmOptions}
          active={realmObject}
          onSelect={id => {
            updateQuery({
              ...queryArgs,
              realm: id,
            });
          }}
          onDismiss={() => {
            updateQuery({
              ...queryArgs,
              realm: '',
            });
          }}
        />
        <TypologyFilter
          type="biomes"
          options={biomeOptions}
          active={biomeObject}
          onSelect={id => {
            updateQuery({
              ...queryArgs,
              biome: id,
            });
          }}
          onDismiss={() => {
            updateQuery({
              ...queryArgs,
              biome: '',
            });
          }}
        />
        <FieldWrap margin={{ bottom: '0' }}>
          <FieldLabel>
            <FormattedMessage {...messages.addFiltersByOccurrenceLabel} />
          </FieldLabel>
          <OccurrenceInput
            occurrence={occurrence}
            onSubmit={value =>
              updateQuery({
                ...queryArgs,
                occurrence: value,
              })
            }
          />
        </FieldWrap>
      </AsideNavSection>
      <AsideNavSection>
        <StepTitle>
          <FormattedMessage {...messages.submitQuery} />
        </StepTitle>
        <Box direction="row" gap="xsmall" align="center">
          <SubmitButton
            disabled={!(hasArea || hasRegion)}
            label={intl.formatMessage(messages.submitQueryLabel)}
            onClick={() => {
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
          {!(hasArea || hasRegion) && (
            <Hint>
              <FormattedMessage {...messages.submitQueryAreaHint} />
            </Hint>
          )}
        </Box>
      </AsideNavSection>
    </Box>
  );
}

Configure.propTypes = {
  onQueryGroups: PropTypes.func,
  onToggleDraw: PropTypes.func,
  onSetQueryType: PropTypes.func,
  updateQuery: PropTypes.func,
  queryArgs: PropTypes.object,
  queryType: PropTypes.string,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  queryArgs: state => selectGroupsQueryArgs(state),
  queryType: state => selectQueryType(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onQueryGroups: args => dispatch(queryGroups(args)),
    updateQuery: args => dispatch(updateGroupsQuery(args)),
    onSetQueryType: type => dispatch(setQueryType(type)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(Configure));
