import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DropButton } from 'grommet';
import styled from 'styled-components';
// prettier-ignore
const MenuButton = styled(props => <DropButton plain {...props} fill="vertical" />)`
  padding:
    ${({ theme }) => theme.global.edgeSize.small}
    ${({ theme }) => theme.global.edgeSize.medium};
  color: ${({ theme }) => theme.global.colors.white};
  background: ${({ active, theme }) => (active ? theme.global.colors.brand : 'transparent')};
  @media (min-width: ${({ theme }) => theme.sizes.large.minpx}) {
    padding: 0 ${({ theme }) => theme.global.edgeSize.medium};
  }
`;

const DropMenu = ({
  label,
  dropContent,
  dropProps = { top: 'bottom', left: 'left' },
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  return (
    <MenuButton
      active={open}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={handleClose}
      dropProps={{ align: { ...dropProps } }}
      dropContent={dropContent(handleClose)}
    >
      {label ? label({ drop: open }) : null}
    </MenuButton>
  );
};

DropMenu.propTypes = {
  label: PropTypes.func.isRequired,
  dropContent: PropTypes.func.isRequired,
  dropProps: PropTypes.object,
};

export default DropMenu;
