import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box, Button, Text, Layer, ResponsiveContext } from 'grommet';

import { getHeaderHeight } from 'utils/responsive';

import Img from 'components/Img';

import commonMessages from 'messages';

const IconImg = styled(Img)`
  vertical-align: middle;
  max-height: 100%;
  filter: invert(100%);
  height: 22px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    height: 30px;
  }
`;
// prettier-ignore
const NavGroupTitle = styled(p => <Text {...p} size="xsmall" />)`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  padding:
    ${({ theme }) => theme.global.edgeSize.xsmall}
    ${({ theme }) => theme.global.edgeSize.medium};
`;
// prettier-ignore
const NavGroup = styled(p => <Box {...p} />)`
  border-bottom: 1px solid
    ${({ theme, last }) =>
    last ? 'transparent' : theme.global.colors['dark-grey']};
`;
// prettier-ignore
const Secondary = styled(props => <Button {...props} plain />)`
  padding:
    ${({ theme }) => theme.global.edgeSize.small}
    ${({ theme }) => theme.global.edgeSize.medium};
  color: black;
  background: transparent;
  &:hover {
    background: ${({ theme }) => theme.global.colors.grey};
  }
`;
const IconImgWrap = styled.div``;

const MobileMenu = ({ navItems, onSelectItem }) => {
  const size = React.useContext(ResponsiveContext);
  return (
    <Layer
      full="horizontal"
      responsive={false}
      margin={{ top: `${getHeaderHeight(size)}px` }}
      modal={false}
      animate={false}
      position="top"
      style={{ zIndex: 1300 }}
    >
      <Box
        elevation="medium"
        style={{ borderTop: '1px solid white' }}
        pad={{ bottom: 'medium' }}
      >
        {navItems &&
          Object.entries(navItems).map(([group, pages], index) => (
            <NavGroup
              direction="column"
              key={group}
              last={index === Object.keys(navItems).length - 1}
            >
              <NavGroupTitle>
                <FormattedMessage {...commonMessages[`navGroup_${group}`]} />
              </NavGroupTitle>
              {pages &&
                pages.map(p => (
                  <Secondary
                    key={p.key}
                    onClick={() => onSelectItem(p.key)}
                    label={
                      <Box direction="row" justify="between">
                        <Text size="small">
                          <FormattedMessage
                            {...commonMessages[`page_${p.key}`]}
                          />
                        </Text>
                        {p.icon && (
                          <IconImgWrap>
                            <IconImg src={p.icon} alt="" />
                          </IconImgWrap>
                        )}
                      </Box>
                    }
                    active={false}
                  />
                ))}
            </NavGroup>
          ))}
      </Box>
    </Layer>
  );
};

MobileMenu.propTypes = {
  navItems: PropTypes.array,
  onSelectItem: PropTypes.func,
};

export default MobileMenu;
