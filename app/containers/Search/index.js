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

// import { withTheme } from 'styled-components';
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
import { prepTaxonomies } from './search';

export function Search({
  stretch,
  expand,
  size = 'medium',
  onToggle,
  drop = true,
  onSearch,
  focus,
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
    <Box style={{ minWidth: !onToggle || expand ? '500px' : 0 }}>
      {onToggle && !expand && (
        <Button
          plain
          onClick={() => {
            onToggle();
            setActiveResult(0);
          }}
          reverse
          icon={<SearchIcon size="xlarge" color="white" />}
          style={{ textAlign: 'center' }}
          gap="xsmall"
        />
      )}
      {((onToggle && expand) || !onToggle) && (
        <Box
          direction="row"
          align="center"
          round="xxsmall"
          ref={searchRef}
          style={stretch ? null : { maxWidth: '500px' }}
          pad={{ horizontal: 'xsmall', vertical: 'xxsmall' }}
          margin={{ left: onToggle ? 'ms' : '0' }}
          background="white"
        >
          <TextInput
            plain
            value={search}
            onChange={evt => {
              if (evt && evt.target) {
                setSearch(evt.target.value);
                if (onSearch) onSearch(evt.target.value);
                setActiveResult(0);
              }
            }}
            placeholder={
              placeholder || intl.formatMessage(messages.placeholder)
            }
            ref={textInputRef}
          />
          {!onToggle && search.length === 0 && (
            <Box pad={{ right: 'xsmall' }}>
              <SearchIcon size={size} color="dark" />
            </Box>
          )}
          {(onToggle || search.length > 0) && (
            <Button
              plain
              fill="vertical"
              onClick={() => {
                setSearch('');
                if (onSearch) onSearch('');
                if (onToggle) onToggle();
                setActiveResult(0);
              }}
              icon={<Close size={size} color="dark" />}
              style={{
                textAlign: 'center',
              }}
            />
          )}
        </Box>
      )}
      {drop && search.length > 0 && (
        <Drop
          align={{ top: 'bottom', right: 'right' }}
          pad={{ top: 'xxsmall' }}
          target={searchRef.current}
          onClickOutside={() => {
            setSearch('');
            if (onSearch) onSearch('');
            setActiveResult(0);
          }}
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
              if (onToggle) onToggle();
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
    </Box>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func,
  onToggle: PropTypes.func,
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
