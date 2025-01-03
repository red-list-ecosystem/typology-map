import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router';

import { Button } from 'grommet';
import { Close } from 'grommet-icons';

const StyledButton = styled(p => <Button {...p} />)`
  text-align: center;
  border-radius: 9999px;
  color: black;
  background: white;
  position: absolute;
  z-index: 1000;
  height: 50px;
  width: 50px;
`;

const BackButton = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return <StyledButton icon={<Close color="black" />} onClick={handleGoBack} />;
};

export default BackButton;
