import React, { useEffect, useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Box, Text } from 'grommet';

import commonMessages from 'messages';
import messages from './messages';

import NavOptionGroup from './NavOptionGroup';

export function SearchResults({
  groups,
  realms,
  biomes,
  onSelect,
  onClose,
  activeResult,
  setActiveResult,
  maxResult,
  search,
  intl,
}) {
  const [focus, setFocus] = useState(false);
  const onKey = useCallback(
    event => {
      // UP
      if (event.keyCode === 38) {
        setActiveResult(Math.max(0, activeResult - 1));
        setFocus(true);
        event.preventDefault();
      }
      // DOWN
      if (event.keyCode === 40) {
        setActiveResult(Math.min(activeResult + 1, maxResult - 1));
        setFocus(true);
        event.preventDefault();
      }
    },
    [activeResult, maxResult],
  );
  useEffect(() => {
    document.addEventListener('keydown', onKey, false);

    return () => {
      document.removeEventListener('keydown', onKey, false);
    };
  }, [activeResult, maxResult]);
  const total = realms.length + biomes.length + groups.length;
  return (
    <Box overflow="auto" elevation="small" background="white">
      {total === 0 && search.length > 2 && (
        <Text margin="small">
          <FormattedMessage {...messages.noResults} />
        </Text>
      )}
      {realms.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(commonMessages.realms)}
          options={realms}
          activeResult={activeResult}
          onClick={key => {
            onClose();
            onSelect('realms', key);
          }}
          focus={focus}
          onFocus={index => setActiveResult(index)}
        />
      )}
      {biomes.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(commonMessages.biomes)}
          options={biomes}
          activeResult={activeResult - realms.length}
          onClick={key => {
            onClose();
            onSelect('biomes', key);
          }}
          focus={focus}
          onFocus={index => setActiveResult(index + realms.length)}
        />
      )}
      {groups.length > 0 && (
        <NavOptionGroup
          label={intl.formatMessage(commonMessages.groups)}
          options={groups}
          activeResult={activeResult - realms.length - biomes.length}
          onClick={key => {
            onClose();
            onSelect('groups', key);
          }}
          focus={focus}
          onFocus={index =>
            setActiveResult(index + realms.length + biomes.length)
          }
        />
      )}
    </Box>
  );
}

SearchResults.propTypes = {
  setActiveResult: PropTypes.func,
  groups: PropTypes.array,
  realms: PropTypes.array,
  biomes: PropTypes.array,
  onClose: PropTypes.func,
  onSelect: PropTypes.func,
  search: PropTypes.string,
  activeResult: PropTypes.number,
  maxResult: PropTypes.number,
  intl: intlShape.isRequired,
};

export default injectIntl(SearchResults);
