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
import { Box, Button } from 'grommet';
import { FormattedMessage, intlShape, injectIntl } from 'react-intl';

import { selectGroupsByAreaArgs } from 'containers/App/selectors';
import { updateGroupsQuery, queryGroups } from 'containers/App/actions';

import AsideNavSection from 'components/AsideNavSection';
import Hint from 'components/Hint';
import ButtonPrimary from 'components/ButtonPrimary';

import messages from './messages';

import { testArea, getOpenArea } from './utils';

import StepTitle from './StepTitle';
import FieldWrap from './FieldWrap';
import FieldLabel from './FieldLabel';
import AreaInput from './AreaInput';

const UpdateButton = styled(p => <Button plain {...p} />)`
  color: ${({ theme }) => theme.global.colors.brand};
  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled(p => <ButtonPrimary {...p} />)``;

export function ConfigureArea({
  queryArgs,
  queryArgsFromQuery,
  intl,
  updateQuery,
  onQueryGroups,
  onSubmit,
  onCancel,
}) {
  const { area, realm, biome, occurrence } = queryArgs;
  const areaQ = queryArgsFromQuery && queryArgsFromQuery.area;

  const hasArea = area && area.trim() !== '' && testArea(area);

  // only activate queryUpdate when area has actually changed
  let areaChanged = false;
  if (queryArgsFromQuery) {
    areaChanged = area !== areaQ;
  }

  return (
    <>
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
        </FieldWrap>
      </AsideNavSection>
      <Box direction="row" gap="small" margin={{ top: 'small' }}>
        <SubmitButton
          disabled={!hasArea || !areaChanged}
          label={intl.formatMessage(messages.updateQueryLabel)}
          onClick={() => {
            onSubmit();
            onQueryGroups({
              area: area.trim(),
              realm: realm && realm.trim() !== '' ? realm : null,
              biome: biome && biome.trim() !== '' ? biome : null,
              occurrence:
                occurrence && occurrence.trim() !== '' ? occurrence : null,
            });
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
};

const mapStateToProps = createStructuredSelector({
  queryArgsFromQuery: state => selectGroupsByAreaArgs(state),
});

function mapDispatchToProps(dispatch) {
  return {
    updateQuery: args => dispatch(updateGroupsQuery(args)),
    onQueryGroups: args => dispatch(queryGroups(args)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(injectIntl(ConfigureArea));
