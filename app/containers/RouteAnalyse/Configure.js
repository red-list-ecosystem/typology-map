/**
 *
 * RouteExplore
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { Button, Box, TextInput, Text } from 'grommet';
import styled from 'styled-components';

import { GROUP_LAYER_PROPERTIES } from 'config';

import { queryGroups, updateGroupsQuery } from 'containers/App/actions';
import { selectGroupsQueryArgs } from 'containers/App/selectors';

import ButtonPrimary from 'components/ButtonPrimary';
import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';
import SectionTitle from 'components/styled/SectionTitle';

import commonMessages from 'messages';
import TypologyFilter from './TypologyFilter';
import messages from './messages';

const Label = styled(p => <Text {...p} size="xsmall" />)`
  margin-bottom: 5px;
`;
const StepTitle = styled(p => <Text {...p} weight="bold" />)`
  margin-bottom: 10px;
`;

const FieldWrap = styled(p => <Box margin={{ bottom: 'medium' }} {...p} />)``;

const SubmitButton = styled(p => <ButtonPrimary {...p} />)``;
const KeyColor = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  margin: 2px 0;
  background: ${({ color }) => color};
  opacity: ${({ opacity }) => opacity};
`;

const TextLabel = styled(props => <Text size="small" {...props} />)``;

// prettier-ignore
const ToggleButton = styled(p => <Button plain {...p} />)`
  padding: 8px 14px;
  border-radius: 3px;
  background: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2' : 'light-grey']};
  color: ${({ theme, active }) =>
    theme.global.colors[active ? 'white' : 'black']};
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
  &:hover {
    background: ${({ theme, active }) =>
    theme.global.colors[active ? 'brand-2-dark' : 'light-4']};
    color: ${({ theme, active }) =>
    theme.global.colors[active ? 'white' : 'black']};
  }
`;

const AreaTextInput = styled(p => <TextInput {...p} />)`
  min-height: 35px;
  border: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 3px 6px;
  border-radius: 3px;
`;

export function Configure({
  onQueryGroups,
  queryArgs,
  updateQuery,
  intl,
  realms,
  biomes,
}) {
  const { area, realm, biome, occurrence } = queryArgs;
  const hasArea = area && area.trim() !== '';
  // figure out objects from any set filter
  const realmObject = realms && realms.find(r => r.id === realm);
  const biomeObject = biomes && biomes.find(b => b.id === biome);
  // figure out options from any other filters set
  const realmOptions =
    realms && realms.filter(r => !biomeObject || biomeObject.realm === r.id);
  const biomeOptions =
    realms &&
    biomes &&
    biomes
      .filter(b => !realmObject || b.realm === realmObject.id)
      .sort((a, b) => {
        const aRealmIndex = realms.findIndex(r => a.realm === r.id);
        const bRealmIndex = realms.findIndex(r => b.realm === r.id);
        if (aRealmIndex === bRealmIndex) {
          return a.id > b.id ? 1 : -1;
        }
        return aRealmIndex < bRealmIndex ? -1 : 1;
      });

  return (
    <Box
      pad={{ horizontal: 'small', top: 'small', bottom: 'large' }}
      flex={false}
      background="white"
    >
      <SectionTitle aside>
        <FormattedMessage {...messages.title} />
      </SectionTitle>
      <AsideNavSection margin={{ top: 'ms' }}>
        <StepTitle>
          <FormattedMessage {...messages.defineArea} />
        </StepTitle>
        <Hint>
          <FormattedMessage {...messages.defineAreaInstructions} />
        </Hint>
        <FieldWrap margin={{ top: 'medium' }}>
          <Label>
            <FormattedMessage {...messages.defineAreaFieldLabel} />
          </Label>
          <AreaTextInput
            value={area}
            placeholder={intl.formatMessage(
              messages.defineAreaFieldPlaceholder,
            )}
            onChange={e =>
              updateQuery({
                ...queryArgs,
                area: e.target.value,
              })
            }
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
        <FieldWrap margin={{ bottom: 0 }}>
          <Label>
            <FormattedMessage {...messages.addFiltersByOccurrenceLabel} />
          </Label>
          <Box direction="row" gap="small" margin={{ top: 'xxsmall' }}>
            {Object.keys(GROUP_LAYER_PROPERTIES.OCCURRENCE).map(key => (
              <ToggleButton
                plain
                key={key}
                active={
                  occurrence === GROUP_LAYER_PROPERTIES.OCCURRENCE[key].id
                }
                onClick={() => {
                  const item = GROUP_LAYER_PROPERTIES.OCCURRENCE[key];
                  const active = occurrence === item.id;
                  updateQuery({
                    ...queryArgs,
                    occurrence: active ? '' : item.id,
                  });
                }}
                label={
                  <Box direction="row" align="center" gap="xsmall">
                    <KeyColor
                      color={GROUP_LAYER_PROPERTIES.OCCURRENCE[key].color}
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
                }
              />
            ))}
          </Box>
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
