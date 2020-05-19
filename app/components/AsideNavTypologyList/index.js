/**
 *
 * AsideNavTypologyList
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import AsideNavTypologyButton from 'components/AsideNavTypologyButton';

function AsideNavTypologyList({
  items,
  locale,
  level,
  navItem,
  activeId,
  navParent,
}) {
  return (
    <Box>
      {items &&
        items.map(item => (
          <AsideNavTypologyButton
            key={item.id}
            onClick={() =>
              item.id === activeId && navParent ? navParent() : navItem(item.id)
            }
            id={item.id}
            name={item.title[locale]}
            level={level}
            active={item.id === activeId}
          />
        ))}
    </Box>
  );
}

AsideNavTypologyList.propTypes = {
  items: PropTypes.array,
  level: PropTypes.number,
  locale: PropTypes.string,
  activeId: PropTypes.string,
  navItem: PropTypes.func,
  navParent: PropTypes.func,
};

export default AsideNavTypologyList;
