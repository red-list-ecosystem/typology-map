/**
 *
 * FAQs
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';

import styled from 'styled-components';
import { Accordion, AccordionPanel, Box, Text } from 'grommet';
import { Add, FormSubtract } from 'grommet-icons';

import commonMessages from 'messages';
import messages from './messages';

const AccordionGroupHeader = styled(p => <Text size="small" {...p} />)`
  font-weight: bold;
  text-transform: uppercase;
`;
const AccordionPanelHeader = styled(p => <Text size="small" {...p} />)`
  font-weight: bold;
`;

const StyledBox = styled(p => <Box {...p} />)`
  border-bottom: 1px solid ${({ active }) => (active ? 'transparent' : 'black')};
`;
const ExpandIcon = styled(Add)`
  stroke-width: 3 !important;
`;
const CollapseIcon = styled(FormSubtract)`
  stroke-width: 3 !important;
`;
export function FAQGroup({ group, intl }) {
  const { locale } = intl;
  const [activeIndex, setActiveIndex] = useState(null);
  const { id, title, faqs } = group;
  return (
    <Box margin={{ bottom: 'medium' }}>
      <StyledBox pad={{ vertical: 'small' }}>
        <AccordionGroupHeader>{title[locale]}</AccordionGroupHeader>
      </StyledBox>
      <Accordion
        a11yTitle={intl.formatMessage(messages.accordionA11yTitle, { title: title[locale] })}
        activeIndex={activeIndex}
        onActive={newActive => setActiveIndex(newActive[0])}
      >
        {faqs && faqs.map((faq, index) => {
          const { question, answer } = faq;
          const open = activeIndex === index;
          const a11yTitle = intl.formatMessage(messages[open ? 'collapseA11yTitle' : 'expandA11yTitle']);
          return (
            <AccordionPanel
              key={`${id}-${index}`}
              header={
                <StyledBox
                  direction="row"
                  justify="between"
                  align="center"
                  active={open}
                  pad={{ vertical: 'small', right: 'small' }}
                  title={`${a11yTitle}: ${question[locale]}`}
                >
                  <AccordionPanelHeader>
                    {question[locale]}
                  </AccordionPanelHeader>
                  {open ? (
                    <CollapseIcon
                      size="medium"
                      color="black"
                      a11yTitle={a11yTitle}
                    />
                  ) : (
                    <ExpandIcon
                      size="medium"
                      color="black"
                      a11yTitle={a11yTitle}
                    />
                  )}
                </StyledBox>
              }
            >
              <Box pad={{ top: 'small', bottom: 'large' }}>
                <Text>{answer[locale]}</Text>
              </Box>
            </AccordionPanel>
          );
        })}
      </Accordion>
    </Box>
  );
}

FAQGroup.propTypes = {
  group: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(FAQGroup);
