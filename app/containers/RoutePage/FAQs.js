/**
 *
 * FAQs
 *
 */

import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Accordion, AccordionPanel, Box, Button, Text } from 'grommet';
import { Add as ClosedIcon, FormSubtract as OpenIcon } from 'grommet-icons';

const AccordionGroupHeader = styled(p => <Text size="small" {...p} />)`
  font-weight: bold;
  text-transform: uppercase;
`;
const AccordionPanelHeader = styled(p => <Text size="small" {...p} />)`
  font-weight: bold;
`;
const CloseButton = styled(p => <Button plain {...p} />)`
  font-weight: bold;
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
              <Box>
                <AccordionGroupHeader>{title[locale]}</AccordionGroupHeader>
              </Box>
              <Accordion
                activeIndex={activeIndices[id] || []}
                onActive={newActive => handleAccordionChange(id, newActive)}
              >
                {faqs &&
                  faqs.map((faq, index) => {
                    const { question, answer } = faq;
                    return (
                      <AccordionPanel
                        header={
                          <Box
                            direction="row"
                            justify="between"
                            pad={{ vertical: 'small' }}
                          >
                            <AccordionPanelHeader>
                              {question[locale]}
                            </AccordionPanelHeader>
                            {activeIndices[id] &&
                            Array.isArray(activeIndices[id]) &&
                            activeIndices[id].includes(index) ? (
                              <OpenIcon size="small" />
                            ) : (
                              <ClosedIcon size="small" />
                            )}
                          </Box>
                        }
                        key={`${id}-${index}`}
                      >
                        <Box
                          direction="column"
                          gap="small"
                          pad={{ vertical: 'small' }}
                        >
                          <Text>{answer[locale]}</Text>
                          <CloseButton
                            onClick={() => handleAccordionChange(id)}
                          >
                            Close
                          </CloseButton>
                        </Box>
                      </AccordionPanel>
                    );
                  })}
              </Accordion>
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
