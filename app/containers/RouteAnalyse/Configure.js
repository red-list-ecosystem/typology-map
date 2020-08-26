/**
 *
 * RouteExplore
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { DropButton, Box, TextInput, Text } from 'grommet';
import styled from 'styled-components';

import { Down, Up } from 'components/Icons';

import { queryGroups, updateGroupsQuery } from 'containers/App/actions';
import { selectGroupsQueryArgs } from 'containers/App/selectors';

import ButtonPrimary from 'components/ButtonPrimary';
import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';
import SectionTitle from 'components/styled/SectionTitle';

import messages from './messages';

const Label = styled(p => <Text {...p} size="small" />)``;
const StepTitle = styled(p => <Text {...p} weight="bold" />)`
  margin-bottom: 10px;
`;

const FieldWrap = styled(p => <Box margin={{ top: 'medium' }} {...p} />)``;

const SubmitButton = styled(p => <ButtonPrimary {...p} />)``;

const DropDown = styled(p => (
  <DropButton plain reverse gap="xxsmall" alignSelf="stretch" {...p} />
))``;

export function Configure({ onQueryGroups, queryArgs, updateQuery, intl }) {
  const [openRealms, setOpenRealms] = useState(false);
  // const [openBiomes, setOpenBiomes] = useState(false);

  const { area, realm, biome, occurrence } = queryArgs;

  const hasArea = area && area.trim() !== '';
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
        <FieldWrap>
          <Label>
            <FormattedMessage {...messages.defineAreaFieldLabel} />
          </Label>
          <TextInput
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
        <FieldWrap>
          <Label>
            <FormattedMessage {...messages.addFiltersByRealmLabel} />
          </Label>
          <DropDown
            label={
              realm || intl.formatMessage(messages.addFiltersByRealmPlaceholder)
            }
            onClose={() => setOpenRealms(false)}
            onOpen={() => setOpenRealms(true)}
            dropProps={{
              align: { top: 'bottom', left: 'left' },
              plain: true,
            }}
            icon={openRealms ? <Up color="black" /> : <Down color="black" />}
            dropContent={<Box>Hello World</Box>}
          />
        </FieldWrap>
        <FieldWrap>
          <Label>
            <FormattedMessage {...messages.addFiltersByBiomeLabel} />
          </Label>
          <TextInput
            value={biome}
            onChange={e =>
              updateQuery({
                ...queryArgs,
                biome: e.target.value,
              })
            }
          />
        </FieldWrap>
        <FieldWrap>
          <Label>
            <FormattedMessage {...messages.addFiltersByOccurrenceLabel} />
          </Label>
          <TextInput
            value={occurrence}
            onChange={e =>
              updateQuery({
                ...queryArgs,
                occurrence: e.target.value,
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
  updateQuery: PropTypes.func,
  queryArgs: PropTypes.object,
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
