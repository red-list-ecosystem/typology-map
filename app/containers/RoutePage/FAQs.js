/**
 *
 * FAQs
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import styled from 'styled-components';
import { Accordion, AccordionPanel, Box, Text } from 'grommet';
import { Add, FormSubtract } from 'grommet-icons';

import commonMessages from 'messages';

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
const StyledAccordion = styled(p => <Accordion {...p} />)``;
const ExpandIcon = styled(Add)`
  stroke-width: 3 !important;
`;
const CollapseIcon = styled(FormSubtract)`
  stroke-width: 3 !important;
`;
export function FAQs({ data, locale }) {
  const [activeIndices, setActiveIndices] = useState({});
  const handleAccordionChange = (id, newActive) => {
    setActiveIndices(prev => ({
      ...prev,
      [id]: newActive || [],
    }));
  };

  return (
    <Box direction="column">
      {data &&
        data.map(section => {
          const { title, faqs, id } = section;
          return (
            <Box key={id} margin={{ bottom: 'medium' }}>
              <StyledBox pad={{ vertical: 'small' }}>
                <AccordionGroupHeader>{title[locale]}</AccordionGroupHeader>
              </StyledBox>
              <StyledAccordion
                a11yTitle="Frequently Asked Questions section, expand or collapse topics"
                activeIndex={activeIndices[id] || []}
                onActive={newActive => handleAccordionChange(id, newActive)}
              >
                {faqs && faqs.map((faq, index) => {
                  const { question, answer } = faq;
                  const open =
                    activeIndices[id] &&
                    Array.isArray(activeIndices[id]) &&
                    activeIndices[id].includes(index);
                  return (
                    <AccordionPanel
                      header={
                        <StyledBox
                          direction="row"
                          justify="between"
                          active={open}
                          pad={{ vertical: 'small', right: 'small' }}
                        >
                          <AccordionPanelHeader>
                            {question[locale]}
                          </AccordionPanelHeader>
                          {open ? (
                            <CollapseIcon size="small" color="black" />
                          ) : (
                            <ExpandIcon size="small" color="black" />
                          )}
                        </StyledBox>
                      }
                      key={`${id}-${index}`}
                    >
                      <Box
                        direction="column"
                        gap="small"
                        pad={{ vertical: 'small' }}
                        margin={{ bottom: 'medium' }}
                      >
                        <Text>{answer[locale]}</Text>
                      </Box>
                    </AccordionPanel>
                  );
                })}
              </StyledAccordion>
            </Box>
          );
        })}
    </Box>
  );
}

FAQs.propTypes = {
  data: PropTypes.array,
  locale: PropTypes.string,
};

export default FAQs;
