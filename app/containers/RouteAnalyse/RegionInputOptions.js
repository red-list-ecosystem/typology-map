import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Button, Box, Text } from 'grommet';
import styled from 'styled-components';

import { setRegionHighlight } from 'containers/Map/actions';

import TextInput from 'containers/Search/TextInput';
import {
  sanitise,
  cleanupSearchTarget,
  regExMultipleWords,
} from 'containers/Search/search';

// import messages from './messages';

const LabelWrap = styled(p => <Box {...p} />)``;

const OptionButton = styled(p => <Button {...p} />)`
  min-height: 30px;
  &:hover {
    background: ${({ theme }) => theme.global.colors['light-grey']};
  }
`;

const DropContent = styled(Box)``;
const SearchWrap = styled.div`
  height: 40px;
  display: block;
  background: ${({ theme }) => theme.global.colors['light-grey']};
  padding: ${({ theme }) => theme.global.edgeSize.xsmall};
`;
const TextInputWrap = styled.div`
  display: block;
  background: white;
  padding: ${({ theme }) => theme.global.edgeSize.hair}
    ${({ theme }) => theme.global.edgeSize.xxsmall};
  width: 100%;
`;

export function RegionInputOptions({
  onSubmit,
  dropWidth,
  onSetRegionHighlight,
  options,
  // intl,
}) {
  const [search, setSearch] = useState('');
  const textInputRef = useRef(null);

  useEffect(() => {
    if (textInputRef && textInputRef.current) {
      textInputRef.current.focus();
    }
    setSearch('');
  }, []);

  const filteredOptions = options.filter(option => {
    if (!search || search.trim().length === 0) return true;
    if (search.trim().length > 0) {
      try {
        const regex = new RegExp(regExMultipleWords(search), 'i');
        return regex.test(cleanupSearchTarget(option.title));
      } catch (e) {
        return true;
      }
    }
    return false;
  });

  // onSelect={id => onSubmit(id)}
  // placeholder={intl.formatMessage(messages.selectRegionFieldPlaceholder)}
  return (
    <DropContent style={{ maxWidth: dropWidth }}>
      <SearchWrap>
        <TextInputWrap>
          <TextInput
            plain
            value={search}
            onChange={evt => {
              if (evt && evt.target) {
                setSearch(sanitise(evt.target.value));
              }
            }}
            placeholder="Filter list"
            ref={textInputRef}
          />
        </TextInputWrap>
      </SearchWrap>
      {(!filteredOptions || filteredOptions.length === 0) && (
        <Box pad="small">Sorry no regions matched your search</Box>
      )}
      {filteredOptions &&
        filteredOptions.map(option => (
          <OptionButton
            key={option.id}
            plain
            label={
              <LabelWrap pad={{ vertical: 'hair', horizontal: 'xsmall' }}>
                <Text size="small" truncate>
                  {option.title}
                </Text>
              </LabelWrap>
            }
            onFocus={() => onSetRegionHighlight(parseInt(option.id, 10))}
            onMouseOver={() => onSetRegionHighlight(parseInt(option.id, 10))}
            onMouseOut={() => onSetRegionHighlight()}
            onBlur={() => onSetRegionHighlight()}
            onClick={() => {
              setSearch('');
              onSubmit(option.id);
            }}
          />
        ))}
    </DropContent>
  );
}

RegionInputOptions.propTypes = {
  onSubmit: PropTypes.func,
  onSetRegionHighlight: PropTypes.func,
  options: PropTypes.array,
  dropWidth: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    onSetRegionHighlight: regionId => dispatch(setRegionHighlight(regionId)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

// export default RouteExplore;
export default compose(withConnect)(RegionInputOptions);
// export default RegionInputOptions;
