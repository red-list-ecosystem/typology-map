/**
 *
 * FAQs
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { Box } from 'grommet';
import FAQGroup from './FAQGroup';

export function FAQs({ faqGroups }) {
  return (
    <Box direction="column">
      {faqGroups && faqGroups.map(group => (
        <FAQGroup key={group.id} group={group} />
      ))}
    </Box>
  );
}

FAQs.propTypes = {
  faqGroups: PropTypes.array,
};

export default FAQs;
