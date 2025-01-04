/**
 *
 * TabWrapper
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { filter } from 'lodash';

import styled from 'styled-components';
import { Box, Tabs, Tab, Text } from 'grommet';

import { PAGES } from 'config';
import { SECONDARY } from 'containers/App/constants';

import commonMessages from 'messages';

const StyledTabs = styled(p => <Tabs {...p} />)`
  button {
    font-weight: bold;
  }
  [role='tablist'] button:focus-visible > div,
  [role='tablist'] button:focus-visible > div > div,
  [role='tablist'] button:hover > div,
  [role='tablist'] button:hover > div > div {
    background: ${({ theme }) => theme.global.colors.hover};
  }
`;
const StyledTabWrapper = styled(p => <Box {...p} />)`
  background: ${({ theme }) => theme.global.colors.white};
`;
const StyledTab = styled(p => <Tab {...p} />)`
  transform: translateY(-100%);
  div {
    background: ${({ theme, isActive }) =>
      isActive ? theme.global.colors.brand : theme.global.colors['brand-2']};
    color: white;
    border: none;
    margin: 0;
  }
`;
const pagesArray = Object.keys(PAGES).map(key => ({
  key,
  ...PAGES[key],
}));

const TabWrapper = ({ children, shouldWrap, pageId, tabChange }) => {
  if (!shouldWrap) {
    return children;
  }
  const pagesSecondary = filter(pagesArray, p => p.nav === SECONDARY);
  const tabs = pagesSecondary.filter(p => p.group === 'about');
  const activeTabIndex = tabs.findIndex(t => t.key === pageId);

  return (
    <StyledTabs
      justify="start"
      activeIndex={activeTabIndex}
      onActive={newActive => {
        const newTabSelected = tabs.find((tab, i) => i === newActive);
        newTabSelected && tabChange(newTabSelected.key);
      }}
    >
      {tabs &&
        tabs.map(
          (tab, index) =>
            tab && (
              <StyledTab
                title={
                  <StyledTabWrapper pad="small">
                    <Text>
                      <FormattedMessage
                        {...commonMessages[`page_${tab.key}`]}
                      />
                    </Text>
                  </StyledTabWrapper>
                }
                key={tab.key}
                isActive={activeTabIndex === index}
              >
                {activeTabIndex === index ? children : null}
              </StyledTab>
            ),
        )}
    </StyledTabs>
  );
};

TabWrapper.propTypes = {
  children: PropTypes.node,
  shouldWrap: PropTypes.bool,
  pageId: PropTypes.string,
  tabChange: PropTypes.func,
};

export default TabWrapper;
