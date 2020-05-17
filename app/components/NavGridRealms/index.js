/**
 *
 * NavGridRealms
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import CardRealm from './CardRealm';

function NavGridRealms({ label, items, itemClick, locale }) {
  return (
    <div>
      <h4>{label}</h4>
      <Box direction="row" wrap>
        {items &&
          items.map(r => (
            <CardRealm
              key={r.id}
              onCardClick={() => itemClick(r.id)}
              label={r.title[locale]}
              realm={r}
            />
          ))}
      </Box>
    </div>
  );
}

NavGridRealms.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  itemClick: PropTypes.func,
  locale: PropTypes.string,
};

export default memo(NavGridRealms);
