/**
 *
 *
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button, TextInput } from 'grommet';
import styled from 'styled-components';

import { Close } from 'components/Icons';

import messages from './messages';

const AreaTextInput = styled(p => <TextInput {...p} />)`
  min-height: 35px;
  border: 0;
`;
const TextInputWrap = styled.div`
  position: relative;
  border: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 0 40px 0 6px;
  border-radius: 3px;
`;

const CloseButton = styled(p => <Button plain {...p} />)`
  position: absolute;
  top: 3px;
  right: 3px;
  border-radius: 9999px;
  padding: 6px;
  background: ${({ theme }) => theme.global.colors.white} !important;
  &:hover {
    background: ${({ theme }) => theme.global.colors.grey} !important;
  }
`;

export function AreaInput({ area, onSubmit, intl }) {
  return (
    <TextInputWrap>
      <AreaTextInput
        value={area}
        placeholder={intl.formatMessage(messages.defineAreaFieldPlaceholder)}
        onChange={e => onSubmit(e.target.value)}
      />
      {area && (
        <CloseButton
          onClick={() => onSubmit('')}
          icon={<Close size="medium" color="black" />}
        />
      )}
    </TextInputWrap>
  );
}

AreaInput.propTypes = {
  onSubmit: PropTypes.func,
  area: PropTypes.string,
  intl: intlShape.isRequired,
};

export default injectIntl(AreaInput);
