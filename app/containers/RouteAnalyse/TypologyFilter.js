import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button, DropButton, Box, Text } from 'grommet';
import styled from 'styled-components';

import { Close, Down, Up } from 'components/Icons';
import FieldLabel from './FieldLabel';
import messages from './messages';

const FieldWrap = styled(p => <Box margin={{ bottom: 'medium' }} {...p} />)``;

const DropDown = styled(p => (
  <DropButton plain reverse gap="xxsmall" alignSelf="stretch" {...p} />
))`
  min-height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 3px 6px;
`;

const CloseButton = styled(p => <Button plain {...p} />)`
  border-radius: 9999px;
  padding: 6px;
  &:hover {
    background: ${({ theme }) => theme.global.colors.grey} !important;
  }
`;

const LabelWrap = styled(p => (
  <Box direction="row" align="start" fill="horizontal" gap="small" {...p} />
))``;
const Id = styled(p => <Box flex={{ shrink: 0 }} {...p} />)`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  min-width: 45px;
`;
const IdActive = styled(Id)`
  min-width: 30px;
`;
const Title = styled(Box)``;
const Active = styled(p => (
  <Box justify="between" direction="row" align="center" {...p} />
))`
  min-height: 40px;
  border-bottom: 1px solid ${({ theme }) => theme.global.colors['light-4']};
  padding: 3px 6px;
`;
const OptionButton = styled(p => <Button {...p} />)`
  min-height: 30px;
  &:hover {
    background: ${({ theme }) => theme.global.colors['light-grey']};
  }
`;
const Select = styled(p => (
  <Box justify="between" direction="row" align="center" {...p} />
))``;
export function TypologyFilter({
  type,
  options,
  active,
  onDismiss,
  onSelect,
  intl,
}) {
  const [open, setOpen] = useState(false);
  const { locale } = intl;
  return (
    <FieldWrap>
      <FieldLabel>
        {type === 'realms' && (
          <FormattedMessage {...messages.addFiltersByRealmLabel} />
        )}
        {type === 'biomes' && (
          <FormattedMessage {...messages.addFiltersByBiomeLabel} />
        )}
      </FieldLabel>
      {active && (
        <Active>
          <LabelWrap align="center">
            <IdActive>{active.id}</IdActive>
            <Title>{active.title[locale]}</Title>
          </LabelWrap>
          <CloseButton
            onClick={() => onDismiss()}
            icon={<Close size="medium" color="black" />}
          />
        </Active>
      )}
      {!active && (
        <DropDown
          open={open}
          label={
            <Select pad={{ right: '3px' }}>
              <Text color="dark-4">
                {type === 'realms' &&
                  intl.formatMessage(messages.addFiltersByRealmPlaceholder)}
                {type === 'biomes' &&
                  intl.formatMessage(messages.addFiltersByBiomePlaceholder)}
              </Text>
              {open ? <Up color="black" /> : <Down color="black" />}
            </Select>
          }
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          dropProps={{
            align: { top: 'bottom', left: 'left', right: 'right' },
          }}
          dropContent={
            <Box background="white" flex={false}>
              {options &&
                options.map(option => (
                  <OptionButton
                    key={option.id}
                    plain
                    label={
                      <LabelWrap pad="xsmall">
                        <Id>{option.id}</Id>
                        <Title>{option.title[locale]}</Title>
                      </LabelWrap>
                    }
                    onClick={() => {
                      setOpen(false);
                      onSelect(option.id);
                    }}
                  />
                ))}
            </Box>
          }
        />
      )}
    </FieldWrap>
  );
}

TypologyFilter.propTypes = {
  type: PropTypes.string,
  options: PropTypes.array,
  active: PropTypes.object,
  onDismiss: PropTypes.func,
  onSelect: PropTypes.func,
  intl: intlShape.isRequired,
};

export default injectIntl(TypologyFilter);
