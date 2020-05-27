/**
 *
 * NavGridRealms
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';

import IconRealm from 'components/IconRealm';

import CardRealm from './CardRealm';

function NavGridRealms({ label, items, itemClick, locale, type }) {
  /* eslint-disable react/no-array-index-key */
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
              icon={<IconRealm realmId={r.id} type={type} />}
            />
          ))}
      </Box>
    </div>
  );
  /* eslint-enable react/no-array-index-key */
}

NavGridRealms.propTypes = {
  label: PropTypes.string,
  items: PropTypes.array,
  itemClick: PropTypes.func,
  locale: PropTypes.string,
  type: PropTypes.string,
};

export default memo(NavGridRealms);
