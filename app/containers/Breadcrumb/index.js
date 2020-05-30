import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { Box, Button, Text } from 'grommet';
import { FormNext } from 'grommet-icons';

import { navigate } from 'containers/App/actions';

import commonMessages from 'messages';
import messages from './messages';
// prettier-ignore
const Styled = styled(Box)``;

const StyledButton = styled(props => <Button {...props} plain />)`
  &:hover {
    text-decoration: underline;
  }
`;

const TextAncestor = styled(Text)``;
const TextActive = styled(Text)``;
const TextInactive = styled(props => <Text color="light-4" {...props} />)``;

function Breadcrumb({ targets, level, navExplore }) {
  return (
    <Styled direction="row" wrap align="center">
      <StyledButton
        onClick={() => navExplore()}
        label={
          <TextAncestor>
            <FormattedMessage {...messages.explore} />
          </TextAncestor>
        }
      />
      <FormNext />
      {level === 0 && (
        <TextActive>
          <FormattedMessage {...commonMessages.realm} />
        </TextActive>
      )}
      {level > 0 && targets && targets.length > 0 && (
        <StyledButton
          onClick={() => targets[0]()}
          label={
            <TextAncestor>
              <FormattedMessage {...commonMessages.realm} />
            </TextAncestor>
          }
        />
      )}
      <FormNext />
      {level < 1 && (
        <TextInactive>
          <FormattedMessage {...commonMessages.biome} />
        </TextInactive>
      )}
      {level === 1 && (
        <TextActive>
          <FormattedMessage {...commonMessages.biome} />
        </TextActive>
      )}
      {level > 1 && targets && targets.length > 1 && (
        <StyledButton
          onClick={() => targets[1]()}
          label={
            <TextAncestor>
              <FormattedMessage {...commonMessages.biome} />
            </TextAncestor>
          }
        />
      )}
      <FormNext />
      {level < 2 && (
        <TextInactive>
          <FormattedMessage {...commonMessages.group} />
        </TextInactive>
      )}
      {level === 2 && (
        <TextActive>
          <FormattedMessage {...commonMessages.group} />
        </TextActive>
      )}
    </Styled>
  );
}

Breadcrumb.propTypes = {
  level: PropTypes.number,
  targets: PropTypes.array,
  navExplore: PropTypes.func,
};

function mapDispatchToProps(dispatch) {
  return {
    navExplore: () => dispatch(navigate('explore')),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(Breadcrumb);
