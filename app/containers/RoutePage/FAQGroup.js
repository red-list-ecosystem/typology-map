/**
 *
 * FAQs
 *
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';

import styled, { keyframes } from 'styled-components';
import { Button, Box, Text } from 'grommet';
import { Add, FormSubtract } from 'grommet-icons';
import { DEFAULT_LOCALE } from 'i18n';

import messages from './messages';

const AccordionGroupHeader = styled(p => <Text size="small" {...p} />)`
  font-weight: bold;
  text-transform: uppercase;
`;
const PanelTitle = styled(p => <Text size="small" {...p} />)`
  font-weight: bold;
`;
const AccordionPanelHeader = styled(p => <Button {...p} />)`
  &:focus-visible {
    background: ${({ theme }) => theme.global.colors['hover-grey']};
  }
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
const closed = keyframes`
  0% {
    display: block;
    opacity: 1;
  }
  1% {
    display: none;
    opacity: 0;
  }
`;

const opened = keyframes`
  0% {
    display: none;
    bottom: -1rem;
    opacity: 0;
  }
  1% {
    display: block;
    bottom: -1rem;
    opacity: 0;
  }
  100% {
    bottom: -1rem;
    opacity: 1;
  }
`;
const AccordionPanel = styled(Box)`
  display: ${({ open }) => (open ? 'block' : 'none')};
  animation: ${({ open }) => (open ? opened : closed)} 0.5s ease forwards;
`;

export function FAQGroup({ group, intl }) {
  const { locale } = intl;
  const [activeIndex, setActiveIndex] = useState(null);
  const { id, title, faqs } = group;
  return (
    <Box margin={{ bottom: 'medium' }}>
      <StyledBox pad={{ vertical: 'small' }}>
        <AccordionGroupHeader>
          {title[locale] || title[DEFAULT_LOCALE]}
        </AccordionGroupHeader>
      </StyledBox>
      {faqs &&
        faqs.map((faq, index) => {
          const { question, answer } = faq;
          const open = activeIndex === index;
          const a11yTitle = intl.formatMessage(
            messages[open ? 'collapseA11yTitle' : 'expandA11yTitle'],
          );
          return (
            <Box fill key={`${id}-${index}`}>
              <AccordionPanelHeader
                onClick={() =>
                  open ? setActiveIndex(null) : setActiveIndex(index)
                }
                aria-expanded={open}
                aria-controls={`accordion-panel-${id}`}
                id={`accordion-header-${id}`}
              >
                <StyledBox
                  direction="row"
                  justify="between"
                  align="center"
                  active={open}
                  pad={{ vertical: 'small', right: 'small' }}
                  title={`${a11yTitle}: ${question[locale] || question[DEFAULT_LOCALE]}`}
                >
                  <PanelTitle>
                    {question[locale] || question[DEFAULT_LOCALE]}
                  </PanelTitle>
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
              </AccordionPanelHeader>
              <AccordionPanel
                pad={{ top: 'small', bottom: 'large' }}
                open={open}
                id={`accordion-panel-${id}`}
                aria-labelledby={`accordion-header-${id}`}
                role="region"
              >
                <Text>{answer[locale] || answer[DEFAULT_LOCALE]}</Text>
              </AccordionPanel>
            </Box>
          );
        })}
    </Box>
  );
}

FAQGroup.propTypes = {
  group: PropTypes.object,
  intl: PropTypes.object,
};

export default injectIntl(FAQGroup);
