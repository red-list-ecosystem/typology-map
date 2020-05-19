/**
 *
 * NavGridChildren
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Box, Paragraph } from 'grommet';

import CardChild from './CardChild';

import messages from './messages';

function NavGridChildren({ type, items, itemClick, locale, parent }) {
  return (
    <div>
      <h4>
        <FormattedMessage
          {...messages[`${type}Title`]}
          values={{
            no: items.length,
            parent: parent.title[locale],
          }}
        />
      </h4>
      <Paragraph>
        <FormattedMessage {...messages[`${type}Info`]} />
      </Paragraph>
      <h5>
        <FormattedMessage {...messages[`${type}Select`]} />
      </h5>
      <Box direction="row" wrap>
        {items &&
          items.map(i => (
            <CardChild
              key={i.id}
              onCardClick={() => itemClick(i.id)}
              type={type}
              label={i.title[locale]}
              typology={i}
            />
          ))}
      </Box>
    </div>
  );
}

NavGridChildren.propTypes = {
  type: PropTypes.string,
  items: PropTypes.array,
  itemClick: PropTypes.func,
  locale: PropTypes.string,
  parent: PropTypes.object,
};

export default memo(NavGridChildren);
