import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Drop } from 'grommet';
import styled from 'styled-components';

import Secondary from './Secondary';
// prettier-ignore
const MenuButton = styled(
  React.forwardRef((props, ref) => (
    <Secondary plain ref={ref} {...props} fill="vertical" />
  ))
)``;

const DropMenu = ({
  active,
  label,
  dropContent,
  dropProps = { top: 'bottom', left: 'left' },
}) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const targetRef = useRef();

  return (
    <>
      <MenuButton
        active={open || active}
        open={open}
        onClick={() => setOpen(!open)}
        ref={targetRef}
      >
        {label ? label({ drop: open }) : null}
      </MenuButton>
      {open && targetRef.current && (
        <Drop
          target={targetRef.current}
          align={dropProps}
          onClickOutside={handleClose}
          onEsc={handleClose}
        >
          {dropContent(handleClose)}
        </Drop>
      )}
    </>
  );
};

DropMenu.propTypes = {
  label: PropTypes.func.isRequired,
  dropContent: PropTypes.func.isRequired,
  dropProps: PropTypes.object,
};

export default DropMenu;
