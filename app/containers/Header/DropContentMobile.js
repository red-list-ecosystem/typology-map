import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Text, Layer, ResponsiveContext } from 'grommet';

import { getHeaderHeight } from 'utils/responsive';

import Img from 'components/Img';

import commonMessages from 'messages';

const IconImg = styled(Img)`
  max-height: 100%;
  filter: invert(100%);
  height: 22px;
  top: 12px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    top: 8px;
    height: 30px;
  }
  position: absolute;
  right: ${({ theme }) => theme.global.edgeSize.medium};
`;
// prettier-ignore
const NavGroupTitleWrapper = styled(p => (
  <Box
    responsive={false}
    pad={{
      horizontal: 'medium',
      top: 'small',
      bottom: 'xxsmall',
    }}
    {...p}
  />
))`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
`;
// prettier-ignore
const NavGroup = styled(p => <Box {...p} />)`
  border-bottom: 1px solid
    ${({ theme, last }) =>
    last ? 'transparent' : theme.global.colors['grey']};
`;
// prettier-ignore
const StyledButton = styled(props => <Button {...props} plain />)`
  position: relative;
  padding:
    ${({ theme }) => theme.global.edgeSize.small}
    ${({ theme }) => theme.global.edgeSize.medium};
  color: ${({ theme }) => theme.global.colors['brand-2']};
  background: ${({ active, theme }) => active ? theme.global.colors['light-grey'] : 'transparent'} ;
  &:hover, &:focus {
    background: ${({ theme }) => theme.global.colors['hover-grey']};
  }
`;
const DropContentMobile = ({ navGroups, onSelectItem, activePageId }) => {
  const size = React.useContext(ResponsiveContext);
  if (!navGroups) return null;
  console.log(activePageId)
  return (
    <Layer
      full="horizontal"
      responsive={false}
      margin={{ top: `${getHeaderHeight(size)}px` }}
      modal={false}
      animate={false}
      position="top"
      style={{ zIndex: 1300, overflowX: 'auto', paddingBottom: '30px' }}
      plain
    >
      <Box
        elevation="medium"
        style={{ borderTop: '1px solid white' }}
        pad={{ bottom: 'medium' }}
        flex={false}
        background="white"
      >
        {Object.entries(navGroups).map(([group, pages], index) => {
          if (!group) return null;
          return (
            <NavGroup
              direction="column"
              key={group}
              last={index === Object.keys(navGroups).length - 1}
            >
              <NavGroupTitleWrapper>
                <Text size="xsmall">
                  <FormattedMessage {...commonMessages[`navGroup_${group}`]} />
                </Text>
              </NavGroupTitleWrapper>
              {pages &&
                pages.map(p => (
                  <Box key={p.key}>
                    <StyledButton
                      onClick={() => onSelectItem(p.key)}
                      active={activePageId === p.key}
                    >
                      <Text size="small">
                        <FormattedMessage
                          {...commonMessages[`page_${p.key}`]}
                        />
                      </Text>
                      {p.icon && (
                        <IconImg src={p.icon} alt="" />
                      )}
                    </StyledButton>
                  </Box>
                ))}
            </NavGroup>
          );
        })}
      </Box>
    </Layer>
  );
};

DropContentMobile.propTypes = {
  navGroups: PropTypes.object,
  onSelectItem: PropTypes.func,
};

export default DropContentMobile;
