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

import { GROUP_LAYER_PROPERTIES } from 'config';

import {
  selectGroupsByAreaFiltered,
  selectGroupsQueryReadyAll,
  selectGroupsByAreaArgs,
  selectActiveGroup,
} from 'containers/App/selectors';
import {
  resetGroupsQuery,
  updateGroupsQuery,
  queryGroups,
  resetGroupsQueryNav,
  setActiveGroupQuery,
} from 'containers/App/actions';

import AsideNavTypologyList from 'components/AsideNavTypologyList';
import AsideNavLabel from 'components/AsideNavLabel';
import LoadingIndicator from 'components/LoadingIndicator';
import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';
import ButtonPrimary from 'components/ButtonPrimary';

import commonMessages from 'messages';
import messages from './messages';

import { testArea, getRealmOptions, getBiomeOptions } from './utils';

import TypologyFilter from './TypologyFilter';
import StepTitle from './StepTitle';
import FieldWrap from './FieldWrap';
import FieldLabel from './FieldLabel';
import AreaInput from './AreaInput';
import OccurrenceInput from './OccurrenceInput';

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

const SubmitButton = styled(p => <ButtonPrimary {...p} />)``;

export function Results({
  groups,
  queriesReady,
  onResetQuery,
  queryArgs,
  intl,
  updateQuery,
  onQueryGroups,
  realms,
  biomes,
  onSetActiveGroup,
  activeGroup,
}) {
  const [areaUpdate, setAreaUpdate] = useState(false);
  const [filterUpdate, setFilterUpdate] = useState(false);
  const { locale } = intl;
  const { area, realm, biome, occurrence } = queryArgs;
  const realmObject = realms && realms.find(r => r.id === realm);
  const biomeObject = biomes && biomes.find(b => b.id === biome);
  // figure out options from any other filters set
  const realmOptions = getRealmOptions(realms, biomeObject);
  const biomeOptions = getBiomeOptions(realms, biomes, realmObject);

  const hasFilters = realm || biome || occurrence;
  const hasArea = area && area.trim() !== '' && testArea(area);
  const KeyColor = styled.span`
    display: inline-block;
    width: 14px;
    height: 14px;
    margin: 2px 0;
    background: ${({ color }) => color};
    opacity: ${({ opacity }) => opacity};
  `;

  return (
    <Box pad={{ bottom: 'large' }} flex={false} background="white">
      {(areaUpdate || filterUpdate) && (
        <Box pad={{ horizontal: 'small' }} flex={false}>
          {areaUpdate && (
            <AsideNavSection margin={{ vertical: 'ms' }}>
              <StepTitle>
                <FormattedMessage {...messages.areaChange} />
              </StepTitle>
              <Hint>
                <FormattedMessage {...messages.defineAreaInstructions} />
              </Hint>
              <FieldWrap margin={{ top: 'medium' }}>
                <FieldLabel>
                  <FormattedMessage {...messages.defineAreaFieldLabel} />
                </FieldLabel>
                <AreaInput
                  area={area}
                  onSubmit={value =>
                    updateQuery({
                      ...queryArgs,
                      area: value,
                    })
                  }
                />
              </FieldWrap>
            </AsideNavSection>
          )}
          {filterUpdate && (
            <AsideNavSection margin={{ vertical: 'ms' }}>
              <StepTitle>
                <FormattedMessage {...messages.filtersChange} />
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
          )}
          {(filterUpdate || (areaUpdate && hasArea)) && (
            <Box direction="row" gap="small" margin={{ top: 'small' }}>
              <SubmitButton
                disabled={!hasArea}
                label={intl.formatMessage(messages.updateQueryLabel)}
                onClick={() => {
                  setAreaUpdate(false);
                  setFilterUpdate(false);
                  onQueryGroups({
                    area: area.trim(),
                    realm: realm && realm.trim() !== '' ? realm : null,
                    biome: biome && biome.trim() !== '' ? biome : null,
                    occurrence:
                      occurrence && occurrence.trim() !== ''
                        ? occurrence
                        : null,
                  });
                }}
              />
              <UpdateButton
                onClick={() => {
                  setAreaUpdate(false);
                  setFilterUpdate(false);
                }}
                label={<FormattedMessage {...messages.cancel} />}
              />
            </Box>
          )}
        </Box>
      )}
      {!areaUpdate && !filterUpdate && (
        <>
          <Box pad={{ horizontal: 'small' }} flex={false}>
            <AsideNavSection margin={{ top: 'ms' }}>
              <StepTitleWrap>
                <StyledStepTitle>
                  <FormattedMessage {...messages.area} />
                </StyledStepTitle>
                <UpdateButton
                  onClick={() => setAreaUpdate(true)}
                  label={<FormattedMessage {...messages.areaChange} />}
                />
              </StepTitleWrap>
              <FieldWrap>
                <Text truncate>{area}</Text>
              </FieldWrap>
            </AsideNavSection>
            <AsideNavSection margin={{ top: 'ms' }}>
              <StepTitleWrap>
                <StyledStepTitle>
                  <FormattedMessage {...messages.filters} />
                </StyledStepTitle>
                <UpdateButton
                  onClick={() => setFilterUpdate(true)}
                  label={
                    <FormattedMessage
                      {...messages[hasFilters ? 'filtersChange' : 'filtersAdd']}
                    />
                  }
                />
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
                <UpdateButton
                  onClick={() => onResetQuery()}
                  label={<FormattedMessage {...messages.resetQueryLabel} />}
                />
              </StepTitleWrap>
              {queriesReady && groups.length === 0 && (
                <Hint>
                  <FormattedMessage {...messages.noResults} />
                </Hint>
              )}
            </Box>
            {!queriesReady && <LoadingIndicator />}
            {queriesReady && groups && groups.length > 0 && (
              <>
                <AsideNavLabel
                  label={`${groups.length} ${intl.formatMessage(
                    commonMessages.groups,
                  )}`}
                />
                <AsideNavTypologyList
                  items={groups}
                  level={2}
                  locale={locale}
                  navItem={id => onSetActiveGroup(activeGroup === id ? '' : id)}
                  activeId={activeGroup}
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
  queriesReady: PropTypes.bool,
  // queryArgsFromQuery: PropTypes.object,
  queryArgs: PropTypes.object,
  onResetQuery: PropTypes.func,
  onSetActiveGroup: PropTypes.func,
  intl: intlShape.isRequired,
  updateQuery: PropTypes.func,
  onQueryGroups: PropTypes.func,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  activeGroup: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  queriesReady: state => selectGroupsQueryReadyAll(state),
  queryArgsFromQuery: state => selectGroupsByAreaArgs(state),
  activeGroup: state => selectActiveGroup(state),
  groups: (state, { queryArgs }) =>
    selectGroupsByAreaFiltered(state, queryArgs),
});

function mapDispatchToProps(dispatch) {
  return {
    onResetQuery: () => {
      dispatch(resetGroupsQuery());
      dispatch(resetGroupsQueryNav());
    },
    updateQuery: args => dispatch(updateGroupsQuery(args)),
    onSetActiveGroup: id => dispatch(setActiveGroupQuery(id)),
    onQueryGroups: args => dispatch(queryGroups(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(Results));
