import React from 'react';
import PropTypes from 'prop-types';
import { Box, ResponsiveContext, Button } from 'grommet';
import styled from 'styled-components';
import { getAsideWidth, getHeaderHeight } from 'utils/responsive';
import { Next, Previous } from 'components/Icons';

// prettier-ignore
const Styled = styled(Box)`
  pointer-events: all;
  position: fixed;
  overflow-y: auto;
  z-index: ${({ theme }) => theme.dimensions.aside.zIndex};
  right: ${({ collapsed }) => (collapsed ? 'auto' : 0)};
  bottom: 0;
  left: ${({ collapsible, collapsed }) => {
    if (collapsible) {
      return collapsed ? '100%' : '50px';
    }
    return 'auto';
  }};
  width: ${({ collapsed }) => (collapsed ? '100%' : 'auto')};
  top: ${getHeaderHeight('small')}px;
  @media (min-width: ${({ theme }) => theme.sizes.medium.minpx}) {
    position: ${({ absolute }) => (absolute ? 'absolute' : 'fixed')};
    overflow-y: ${({ absolute }) => (absolute ? 'unset' : 'auto')};
    left: auto;
    width: ${getAsideWidth('medium')}px;
    top: ${getHeaderHeight('medium')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    top: ${getHeaderHeight('large')}px;
    width: ${getAsideWidth('large')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xlarge.minpx}) {
    top: ${getHeaderHeight('xlarge')}px;
    width: ${getAsideWidth('xlarge')}px;
  }
  @media (min-width: ${({ theme }) => theme.sizes.xxlarge.minpx}) {
    top: ${getHeaderHeight('xxlarge')}px;
    width: ${getAsideWidth('xxlarge')}px;
  }
`;

const ToggleWrap = styled(p => <Box align="start" {...p} />)`
  position: fixed;
  z-index: ${({ theme }) => theme.dimensions.aside.zIndex};
  right: ${({ collapsed }) => (collapsed ? 0 : 'auto')};
  left: ${({ collapsed }) => (collapsed ? 'auto' : 0)};
  top: ${getHeaderHeight('small')}px;
  bottom: ${({ collapsed }) => (collapsed ? 'auto' : 0)};
  pointer-events: all;
  width: 50px;
`;

const ToggleButton = styled(p => <Button plain {...p} />)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: block;
  width: 100%;
`;
const ToggleInner = styled(p => <Box elevation="medium" {...p} />)`
  background: ${({ theme }) => theme.global.colors.brand};
  width: 40px;
  height: 40px;
  display: block;
  text-align: center;
  top: 10px;
  position: absolute;
  left: 10px;
  right: 0;
  padding: 4px;
`;

function ColumnAside({ children, collapsed, onCollapse, ...other }) {
  // prettier-ignore
  return (
    <ResponsiveContext.Consumer>
      {size => (
        <>
          <Styled
            collapsible={!!onCollapse}
            collapsed={collapsed}
            direction="column"
            flex={{ shrink: 0 }}
            elevation="medium"
            background="white"
            {...other}
          >
            {children}
          </Styled>
          {size === 'small' && !!onCollapse && (
            <ToggleWrap collapsed={collapsed}>
              <ToggleButton onClick={() => onCollapse(!collapsed)}>
                <ToggleInner>
                  {collapsed && <Previous color="white" size="xxlarge" />}
                  {!collapsed && <Next color="white" size="xxlarge" />}
                </ToggleInner>
              </ToggleButton>
            </ToggleWrap>
          )}
        </>
      )}
    </ResponsiveContext.Consumer>
  );
}

ColumnAside.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  collapsed: PropTypes.bool,
  onCollapse: PropTypes.func,
};

export default ColumnAside;
