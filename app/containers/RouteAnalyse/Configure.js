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
import { Box } from 'grommet';
import styled from 'styled-components';

import { queryGroups, updateGroupsQuery } from 'containers/App/actions';
import { selectGroupsQueryArgs } from 'containers/App/selectors';

import ButtonPrimary from 'components/ButtonPrimary';
import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';

import messages from './messages';

import { testArea, getRealmOptions, getBiomeOptions } from './utils';

import TypologyFilter from './TypologyFilter';
import StepTitle from './StepTitle';
import FieldWrap from './FieldWrap';
import FieldLabel from './FieldLabel';
import AreaInput from './AreaInput';
import OccurrenceInput from './OccurrenceInput';

const SubmitButton = styled(p => <ButtonPrimary {...p} />)``;

export function Configure({
  onQueryGroups,
  queryArgs,
  updateQuery,
  intl,
  realms,
  biomes,
}) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { area, realm, biome, occurrence } = queryArgs;
  // must be a closed area (first point === last point)
  const hasArea = area && area.trim() !== '' && testArea(area);
  // but we want an open area in the text area
  // prettier-ignore
  const areaOpen = hasArea
    ? area
      .trim()
      .split(',')
      .slice(0, -1)
      .join(',')
    : '';
  // figure out objects from any set filter
  const realmObject = realms && realms.find(r => r.id === realm);
  const biomeObject = biomes && biomes.find(b => b.id === biome);
  // figure out options from any other filters set
  const realmOptions = getRealmOptions(realms, biomeObject);
  const biomeOptions = getBiomeOptions(realms, biomes, realmObject);

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
        <Hint>
          <FormattedMessage {...messages.defineAreaInstructions} />
        </Hint>
        <FieldWrap margin={{ top: 'medium' }}>
          <FieldLabel>
            <FormattedMessage {...messages.defineAreaFieldLabel} />
          </FieldLabel>
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
            disabled={!hasArea}
            label={intl.formatMessage(messages.submitQueryLabel)}
            onClick={() =>
              onQueryGroups({
                area: area.trim(),
                realm: realm && realm.trim() !== '' ? realm : null,
                biome: biome && biome.trim() !== '' ? biome : null,
                occurrence:
                  occurrence && occurrence.trim() !== '' ? occurrence : null,
              })
            }
          />
          {!hasArea && (
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
  updateQuery: PropTypes.func,
  queryArgs: PropTypes.object,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  intl: intlShape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  queryArgs: state => selectGroupsQueryArgs(state),
});

export function mapDispatchToProps(dispatch) {
  return {
    onQueryGroups: args => dispatch(queryGroups(args)),
    updateQuery: args => dispatch(updateGroupsQuery(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(Configure));
