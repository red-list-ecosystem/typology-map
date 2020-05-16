/**
 *
 * NavGridRealms
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Button, Box } from 'grommet';

const CardButton = styled(props => <Button {...props} />)``;

function NavGridRealms({ label, items, itemClick, locale }) {
  return (
    <div>
      <h4>{label}</h4>
      <Box direction="row">
        {items &&
          items.map(r => (
            <CardButton
              key={r.id}
              onClick={() => itemClick(r.id)}
              label={`${r.id} ${r.title[locale]}`}
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
