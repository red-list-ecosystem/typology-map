import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropButton } from 'grommet';
import styled from 'styled-components';

const Styled = styled.span``;
// prettier-ignore
const MenuButton = styled(props => <DropButton plain {...props} fill="vertical" />)`
  padding:
    ${({ theme }) => theme.global.edgeSize.xxsmall}
    ${({ theme }) => theme.global.edgeSize.small};
  color: ${({ theme }) => theme.global.colors.white};
  background: ${({ active, theme }) => (active ? theme.global.colors.brand : 'transparent')};
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.small};
  }
`;

const DropMenu = ({
  label,
  children,
  dropContent,
  dropProps = { top: 'bottom', left: 'left' },
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Styled>
      <MenuButton
        active={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        dropProps={{ align: { ...dropProps } }}
        dropContent={dropContent}
      >
        {children ? children(open) : label}
      </MenuButton>
    </Styled>
  );
};

DropMenu.propTypes = {
  label: PropTypes.node,
  dropContent: PropTypes.node,
  children: PropTypes.func,
  dropProps: PropTypes.object,
};

export default DropMenu;
