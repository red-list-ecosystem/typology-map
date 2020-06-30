/**
 *
 * Search
 *
 */

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl, intlShape } from 'react-intl';

import styled from 'styled-components';
import { Box, Button, Drop } from 'grommet';
import { Close, Search as SearchIcon } from 'grommet-icons';

import {
  selectGroups,
  selectBiomes,
  selectRealms,
} from 'containers/App/selectors';
import { navigateTypology } from 'containers/App/actions';
// import { isMinSize, isMaxSize } from 'utils/responsive';

import messages from './messages';
import SearchResults from './SearchResults';
import TextInput from './TextInput';
import { prepTaxonomies, sanitise } from './search';

const Styled = styled(Box)``;

export function Search({
  stretch,
  expand,
  size = 'medium',
  onClose,
  drop = true,
  onSearch,
  focus = true,
  groups,
  biomes,
  realms,
  onNavigateTypology,
  intl,
  placeholder,
}) {
  const [search, setSearch] = useState('');
  const [activeResult, setActiveResult] = useState(0);
  const searchRef = useRef(null);
  const textInputRef = useRef(null);

  useEffect(() => {
    if ((focus || expand) && textInputRef) {
      textInputRef.current.focus();
    }
  }, [focus, expand]);

  const filteredGroups = prepTaxonomies(groups, search);
  const filteredRealms = prepTaxonomies(realms, search);
  const filteredBiomes = prepTaxonomies(biomes, search);
  return (
    <Styled fill="horizontal">
      <Box
        direction="row"
        align="center"
        round="xxsmall"
        ref={searchRef}
        style={stretch ? null : { maxWidth: '500px' }}
        pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
        margin={{ right: onClose ? 'ms' : '0', left: '0' }}
        background="white"
      >
        <TextInput
          plain
          value={search}
          onChange={evt => {
            if (evt && evt.target) {
              setSearch(sanitise(evt.target.value));
              if (onSearch) onSearch(sanitise(evt.target.value));
              setActiveResult(0);
            }
          }}
          placeholder={placeholder || intl.formatMessage(messages.placeholder)}
          ref={textInputRef}
        />
        {!onClose && search.length === 0 && (
          <Box pad={{ right: 'xsmall' }}>
            <SearchIcon size={size} color="dark" />
          </Box>
        )}
        {(onClose || search.length > 0) && (
          <Button
            plain
            fill="vertical"
            onClick={() => {
              setSearch('');
              if (onSearch) onSearch('');
              if (onClose) onClose();
              setActiveResult(0);
            }}
            icon={<Close size={size} color="dark" />}
            style={{
              textAlign: 'center',
            }}
          />
        )}
      </Box>
      {drop && search.trim().length > 0 && (
        <Drop
          align={{ top: 'bottom', right: 'right' }}
          pad={{ top: 'xxsmall' }}
          target={searchRef.current}
          plain
        >
          <SearchResults
            onClose={() => {
              setSearch('');
              if (onSearch) onSearch('');
              setActiveResult(0);
            }}
            search={search}
            onSelect={(level, id) => {
              if (onClose) onClose();
              onNavigateTypology(level, id);
            }}
            activeResult={activeResult}
            setActiveResult={setActiveResult}
            groups={filteredGroups}
            realms={filteredRealms}
            biomes={filteredBiomes}
            maxResult={
              filteredGroups.length +
              filteredBiomes.length +
              filteredRealms.length
            }
          />
        </Drop>
      )}
    </Styled>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
  onClose: PropTypes.func,
  onNavigateTypology: PropTypes.func,
  stretch: PropTypes.bool,
  expand: PropTypes.bool,
  focus: PropTypes.bool,
  drop: PropTypes.bool,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  groups: PropTypes.array,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  intl: intlShape.isRequired,
};

const mapDispatchToProps = dispatch => ({
  // navigate to location
  onNavigateTypology: (level, id) => {
    dispatch(navigateTypology(level, id));
  },
});
const mapStateToProps = state => ({
  groups: selectGroups(state),
  biomes: selectBiomes(state),
  realms: selectRealms(state),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(injectIntl(Search));
