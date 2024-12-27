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
const NavGroupTitleWrapper = styled(p => <Box {...p} />)`
  color: ${({ theme }) => theme.global.colors['dark-grey']};
  padding:
    ${({ theme }) => theme.global.edgeSize.small}
    ${({ theme }) => theme.global.edgeSize.medium};
  padding-bottom: 0;
`;
// prettier-ignore
const NavGroup = styled(p => <Box {...p} />)`
  border-bottom: 1px solid
    ${({ theme, last }) =>
    last ? 'transparent' : theme.global.colors['grey']};
`;
// prettier-ignore
const Secondary = styled(props => <Button {...props} plain />)`
  padding:
    ${({ theme }) => theme.global.edgeSize.small}
    ${({ theme }) => theme.global.edgeSize.medium};
  color: ${({ theme }) => theme.global.colors['brand-2']};
  background: transparent;
  &:hover {
    background: ${({ theme }) => theme.global.colors['hover-grey']};
  }
`;
const IconImgWrap = styled.div``;

const DropMenuMobile = ({ navItems, onSelectItem }) => {
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
              <NavGroupTitleWrapper>
                <Text size="xsmall">
                  <FormattedMessage {...commonMessages[`navGroup_${group}`]} />
                </Text>
              </NavGroupTitleWrapper>
              {pages &&
                pages.map(p => (
                  <Box>
                    <Secondary
                      key={p.key}
                      onClick={() => onSelectItem(p.key)}
                      label={
                        <Box direction="row" justify="between" align="center">
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
                  </Box>
                ))}
            </NavGroup>
          ))}
      </Box>
    </Layer>
  );
};

DropMenuMobile.propTypes = {
  navItems: PropTypes.object,
  onSelectItem: PropTypes.func,
};

export default DropMenuMobile;
