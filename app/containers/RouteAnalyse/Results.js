/**
 *
 * RouteExplore
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Box, Text, Button } from 'grommet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { GROUP_LAYER_PROPERTIES, QUERY_REGIONS_LAYER, PATHS } from 'config';

import {
  selectGroupsByAreaAll,
  selectGroupsForRegionsAll,
  selectGroupsQueryReadyAll,
  selectGroupsByAreaArgs,
  selectActiveGroup,
  selectQueryType,
} from 'containers/App/selectors';
import {
  resetGroupsQuery,
  updateGroupsQuery,
  queryGroups,
  resetGroupsQueryNav,
  setActiveGroupQuery,
  setInfoGroupQuery,
} from 'containers/App/actions';
import { selectLayerByKey } from 'containers/Map/selectors';
import { getRegionFeatureTitle } from 'containers/Map/utils';

import A from 'components/A';
import AsideNavTypologyList from 'components/AsideNavTypologyList';
import AsideNavLabel from 'components/AsideNavLabel';
import LoadingIndicator from 'components/LoadingIndicator';
import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';

import quasiEquals from 'utils/quasi-equals';

import commonMessages from 'messages';
import messages from './messages';

import { getOpenArea } from './utils';

import StepTitle from './StepTitle';
import FieldWrap from './FieldWrap';
import FieldLabel from './FieldLabel';
import ConfigureArea from './ConfigureArea';
import ConfigureFilters from './ConfigureFilters';

const Active = styled(p => (
  <Box justify="between" direction="row" align="center" {...p} />
))``;
const LabelWrap = styled(p => (
  <Box direction="row" align="start" fill="horizontal" gap="small" {...p} />
))``;
const Id = styled(p => <Box flex={{ shrink: 0 }} {...p} />)`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
`;
const Title = styled(Box)``;

const Hints = styled.div`
  margin-bottom: ${({ theme }) => theme.global.edgeSize.medium};
`;

const StyledStepTitle = styled(StepTitle)`
  margin-bottom: 0;
`;

const StepTitleWrap = styled(p => (
  <Box direction="row" align="center" justify="between" {...p} />
))`
  margin-bottom: 10px;
`;

const UpdateButton = styled(p => <Button plain {...p} />)`
  color: ${({ theme }) => theme.global.colors.brand};
  &:hover {
    text-decoration: underline;
  }
`;

const KeyColor = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 2px 0;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;

const TextLabel = styled(props => <Text size="xsmall" {...props} />)``;
const SettingTitle = styled(props => <Text size="xsmall" {...props} />)`
  font-weight: 600;
`;

export function Results({
  groups,
  queriesReady,
  onResetQuery,
  onCancelQuery,
  queryArgs,
  queryArgsFromQuery,
  intl,
  realms,
  biomes,
  onSetActiveGroup,
  activeGroup,
  onSetInfoGroup,
  updateQuery,
  onQueryGroups,
  queryType,
  regionLayer,
  groupsForRegions,
}) {
  const [areaUpdate, setAreaUpdate] = useState(false);
  const [filterUpdate, setFilterUpdate] = useState(false);
  const { locale } = intl;
  let { area, realm, biome, occurrence, regionId } = queryArgs;

  if (queriesReady && queryArgsFromQuery) {
    /* eslint-disable prefer-destructuring */
    area = queryArgsFromQuery.area;
    regionId = queryArgsFromQuery.regionId;
    realm = queryArgsFromQuery.realm;
    biome = queryArgsFromQuery.biome;
    occurrence = queryArgsFromQuery.occurrence;
  }

  const realmObject = realms && realms.find(r => r.id === realm);
  const biomeObject = biomes && biomes.find(b => b.id === biome);

  const hasFilters = realm || biome || occurrence;
  const updating = areaUpdate || filterUpdate;

  const activeRegion =
    queryType === 'region' &&
    regionId &&
    regionLayer &&
    regionLayer.data.features.find(feature =>
      quasiEquals(feature.properties[QUERY_REGIONS_LAYER.featureId], regionId),
    );

  const resultGroups = queryType === 'region' ? groupsForRegions : groups;
  // prettier-ignore
  return (
    <Box pad={{ bottom: 'large' }} flex={false} background="white">
      {updating && (
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
      )}
      {!updating && (
        <>
          <Box pad={{ horizontal: 'small' }} flex={false}>
            <AsideNavSection margin={{ top: 'ms' }}>
              <StepTitleWrap>
                <StyledStepTitle>
                  <FormattedMessage {...messages.area} />
                </StyledStepTitle>
                {queriesReady && (
                  <UpdateButton
                    onClick={() => setAreaUpdate(true)}
                    label={<FormattedMessage {...messages.areaChange} />}
                  />
                )}
              </StepTitleWrap>
              <FieldWrap>
                <FieldLabel>
                  {queryType === 'area' && (
                    <FormattedMessage {...messages.customArea} />
                  )}
                  {queryType === 'region' && (
                    <FormattedMessage {...messages.predefinedRegion} />
                  )}
                </FieldLabel>
                {queryType === 'area' && (
                  <Text truncate>{getOpenArea(area)}</Text>
                )}
                {queryType === 'region' && (
                  <Text>{getRegionFeatureTitle(activeRegion)}</Text>
                )}
              </FieldWrap>
            </AsideNavSection>
            <AsideNavSection margin={{ top: 'ms' }}>
              <StepTitleWrap>
                <StyledStepTitle>
                  <FormattedMessage {...messages.filters} />
                </StyledStepTitle>
                {queriesReady && (
                  <UpdateButton
                    onClick={() => setFilterUpdate(true)}
                    label={
                      <FormattedMessage
                        {...messages[
                          hasFilters ? 'filtersChange' : 'filtersAdd'
                        ]}
                      />
                    }
                  />
                )}
              </StepTitleWrap>
              {!hasFilters && (
                <Hint>
                  <FormattedMessage {...messages.noFilters} />
                </Hint>
              )}
              {realm && (
                <FieldWrap>
                  <FieldLabel>
                    <FormattedMessage {...commonMessages.realm} />
                  </FieldLabel>
                  <Active>
                    <LabelWrap align="center">
                      <Id>{realmObject.id}</Id>
                      <Title>{realmObject.title[locale]}</Title>
                    </LabelWrap>
                  </Active>
                </FieldWrap>
              )}
              {biome && (
                <FieldWrap>
                  <FieldLabel>
                    <FormattedMessage {...commonMessages.biome} />
                  </FieldLabel>
                  <Active>
                    <LabelWrap align="center">
                      <Id>{biomeObject.id}</Id>
                      <Title>{biomeObject.title[locale]}</Title>
                    </LabelWrap>
                  </Active>
                </FieldWrap>
              )}
              {occurrence && (
                <FieldWrap>
                  <FieldLabel>
                    <FormattedMessage {...commonMessages.occurrence} />
                  </FieldLabel>
                  <Active>
                    <LabelWrap align="center">
                      <KeyColor
                        color={
                          GROUP_LAYER_PROPERTIES.OCCURRENCE[occurrence].color
                        }
                      />
                      <FormattedMessage
                        {...commonMessages[
                          `occurrence_${
                            GROUP_LAYER_PROPERTIES.OCCURRENCE[occurrence].id
                          }`
                        ]}
                      />
                    </LabelWrap>
                  </Active>
                </FieldWrap>
              )}
            </AsideNavSection>
          </Box>
          <AsideNavSection>
            <Box pad={{ horizontal: 'small' }} flex={false}>
              <StepTitleWrap>
                <StyledStepTitle size="large">
                  <FormattedMessage {...messages.queryResults} />
                </StyledStepTitle>
                {queriesReady && (
                  <UpdateButton
                    onClick={() => onResetQuery()}
                    label={<FormattedMessage {...messages.resetQueryLabel} />}
                  />
                )}
                {!queriesReady && (
                  <UpdateButton
                    onClick={() => onCancelQuery()}
                    label={<FormattedMessage {...messages.cancelQueryLabel} />}
                  />
                )}
              </StepTitleWrap>
              <Hints>
                {queryType === 'region' &&
                  queriesReady &&
                  resultGroups.length > 0 && (
                  <Hint>
                    <FormattedMessage {...messages.hintResultsRegion} />
                    <FormattedMessage
                      {...messages.download}
                      values={{
                        link: (
                          <A href={PATHS.DATA_DOWNLOAD} target="_blank">
                            {intl.formatMessage(messages.downloadAnchor)}
                          </A>
                        ),
                      }}
                    />
                  </Hint>
                )}
                {queryType === 'area' &&
                  queriesReady &&
                  resultGroups.length > 0 && (
                  <Hint>
                    <FormattedMessage {...messages.hintResultsArea} />
                    <FormattedMessage
                      {...messages.download}
                      values={{
                        link: (
                          <A href={PATHS.DATA_DOWNLOAD} target="_blank">
                            {intl.formatMessage(messages.downloadAnchor)}
                          </A>
                        ),
                      }}
                    />
                  </Hint>
                )}
                {queriesReady && resultGroups.length === 0 && (
                  <Hint>
                    <FormattedMessage {...messages.noResults} />
                  </Hint>
                )}
                {!queriesReady && (
                  <Hint>
                    <FormattedMessage {...messages.awaitResults} />
                  </Hint>
                )}
              </Hints>
            </Box>
            {!queriesReady && <LoadingIndicator />}
            {queriesReady && resultGroups && resultGroups.length > 0 && (
              <>
                <AsideNavLabel
                  top={queryType === 'region'}
                  label={(
                    <strong>
                      {`${resultGroups.length} ${intl.formatMessage(
                        commonMessages.groups,
                      )}`}
                    </strong>
                  )}
                />
                {queryType === 'region' && (
                  <AsideNavLabel
                    top
                    label={(
                      <Hint>
                        <FormattedMessage {...messages.hintResultsGraph} />
                      </Hint>
                    )}
                  />
                )}
                {queryType === 'region' && (
                  <AsideNavLabel
                    label={(
                      <Box direction="row" gap="small">
                        <SettingTitle>
                          <FormattedMessage {...commonMessages.occurrence} />
                          {`: `}
                        </SettingTitle>
                        {Object.keys(GROUP_LAYER_PROPERTIES.OCCURRENCE).map(
                          key => (
                            <Box
                              direction="row"
                              align="center"
                              gap="xsmall"
                              key={key}
                            >
                              <KeyColor
                                color={
                                  GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color
                                }
                                opacity={1}
                              />
                              <TextLabel>
                                <FormattedMessage
                                  {...commonMessages[
                                    `occurrence_${
                                      GROUP_LAYER_PROPERTIES.OCCURRENCE[key].id
                                    }`
                                  ]}
                                />
                              </TextLabel>
                            </Box>
                          ),
                        )}
                      </Box>
                    )}
                  />
                )}
                <AsideNavTypologyList
                  items={resultGroups}
                  level={2}
                  locale={locale}
                  selectItem={id =>
                    onSetActiveGroup(activeGroup === id ? '' : id)
                  }
                  activeId={activeGroup}
                  infoItem={id => onSetInfoGroup(id)}
                  showAreas
                />
              </>
            )}
          </AsideNavSection>
        </>
      )}
    </Box>
  );
}

Results.propTypes = {
  groups: PropTypes.array,
  groupsForRegions: PropTypes.array,
  queriesReady: PropTypes.bool,
  queryArgsFromQuery: PropTypes.object,
  queryArgs: PropTypes.object,
  onResetQuery: PropTypes.func,
  onCancelQuery: PropTypes.func,
  onSetActiveGroup: PropTypes.func,
  onSetInfoGroup: PropTypes.func,
  intl: intlShape.isRequired,
  updateQuery: PropTypes.func,
  onQueryGroups: PropTypes.func,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  activeGroup: PropTypes.string,
  queryType: PropTypes.string,
  regionLayer: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  queriesReady: state => selectGroupsQueryReadyAll(state),
  queryArgsFromQuery: state => selectGroupsByAreaArgs(state),
  activeGroup: state => selectActiveGroup(state),
  groups: state => selectGroupsByAreaAll(state),
  groupsForRegions: state => selectGroupsForRegionsAll(state),
  queryType: state => selectQueryType(state),
  regionLayer: state => selectLayerByKey(state, QUERY_REGIONS_LAYER.key),
});

function mapDispatchToProps(dispatch) {
  return {
    onResetQuery: () => {
      dispatch(resetGroupsQuery());
      dispatch(resetGroupsQueryNav());
      dispatch(setActiveGroupQuery(''));
    },
    onCancelQuery: () => {
      dispatch(resetGroupsQuery());
      dispatch(setActiveGroupQuery(''));
    },
    updateQuery: args => dispatch(updateGroupsQuery(args)),
    onSetActiveGroup: id => dispatch(setActiveGroupQuery(id)),
    onSetInfoGroup: id => dispatch(setInfoGroupQuery(id)),
    onQueryGroups: args => {
      dispatch(setActiveGroupQuery(''));
      dispatch(queryGroups(args));
    },
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(Results));
